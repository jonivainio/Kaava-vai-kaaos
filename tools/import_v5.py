"""Lossless v5 player-field importer. Prose is data, never executable effects.

Run without arguments to regenerate, or --check to verify checked-in output.
The supplied index is independently checked against blocks and player sections.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/source-v5/KAAVA_VAI_KAAOS_CODEX_v5"
PLAYER_FIELDS = {
    "Kortin otsikko", "Korttiteksti", "Tapahtuman otsikko", "Tapahtumateksti",
    "Pyyhkäisyteksti", "Valinnan jälkeen näytetään",
    "Valinnan jälkeen näytetään yksi näistä",
    "Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos",
}
RULE_FIELDS = {
    "Kortti-ID", "Tapahtuma-ID", "Vaihe", "Sisältötyyppi", "Ehto / sijoitus",
    "Laukaisuehto", "Vaihtoehtoinen aiheketju", "Valinta A — vaikutus",
    "Valinta B — vaikutus", "Myöhempi tapahtuma / jatko", "Kytketyt tunnisteet",
    "Toteutuksen rajaus", "Tausta",
}
FIELD = re.compile(r"^\*\*([^*\n]+):\*\*[ \t]*(.*)$")
HEADER = re.compile(r"^### \[(.+)\][ \t]*$", re.M)


def sha(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def read_fields(section: str, player: bool) -> list[dict]:
    result: list[dict] = []
    current: dict | None = None
    choice = None
    for line in section.splitlines():
        if not line.strip():
            if current is not None:
                current["lines"].append("")
            continue
        if line in ("##### Valinta A", "##### Valinta B") and player:
            choice = line[-1]
            current = None
            continue
        match = FIELD.fullmatch(line)
        if match:
            key, value = match.groups()
            allowed = PLAYER_FIELDS if player else RULE_FIELDS
            if key not in allowed and not (player and key.startswith("Haara — ")):
                raise ValueError(f"Unknown source field: {key}")
            current = {"field": key, "choice": choice, "lines": [value]}
            result.append(current)
        elif current is not None and not line.startswith("#"):
            current["lines"].append(line)
        else:
            raise ValueError(f"Unparsed source line: {line}")
    return [{"field": item["field"], "choice": item["choice"],
             "value": "\n".join(item["lines"]).strip()} for item in result]


def parse_entry(block: str, entry: dict) -> tuple[dict, dict]:
    body = block.split("#### PELAAJALLE\n", 1)[1]
    player, rules = body.split("#### CODEX / PELILOGIIKKA\n", 1)
    if sha(player.strip()) != entry["player_section_sha256"]:
        raise ValueError(f"Player hash differs: {entry['id']}")
    fields = read_fields(player, True)
    technical = read_fields(rules, False)
    identity = [f["value"].strip("`") for f in technical if f["field"] in ("Kortti-ID", "Tapahtuma-ID")]
    if identity != [entry["id"]]:
        raise ValueError(f"Identity mismatch: {entry['id']}")
    content = {"id": entry["id"], "kind": entry["kind"], "stage": entry["stage"],
               "title": "", "body": "", "branches": [], "choices": {}}
    for item in fields:
        key, value, choice = item["field"], item["value"], item["choice"]
        if key in ("Kortin otsikko", "Tapahtuman otsikko"):
            content["title"] = value
        elif key in ("Korttiteksti", "Tapahtumateksti"):
            content["body"] = value
        elif key == "Pyyhkäisyteksti":
            if choice not in ("A", "B") or choice in content["choices"]:
                raise ValueError(f"Invalid choice in {entry['id']}")
            content["choices"][choice] = {"label": value, "result": "", "branches": []}
        elif key == "Valinnan jälkeen näytetään":
            content["choices"][choice]["result"] = value
        elif key.startswith("Haara — "):
            if not value:
                raise ValueError(f"Empty branch in {entry['id']}")
            # Stable across branch reordering. Conditions remain in the audit only.
            branch = {"id": "b-" + sha(key)[0:12], "text": value}
            target = content["branches"] if choice is None else content["choices"][choice]["branches"]
            target.append(branch)
        elif value:
            raise ValueError(f"Unexpected prose in branch marker: {entry['id']} / {key}")
    if not content["title"] or not content["body"]:
        raise ValueError(f"Missing title/body: {entry['id']}")
    if sorted(content["choices"]) != entry["choices"]:
        raise ValueError(f"Choice count differs: {entry['id']}")
    for value in content["choices"].values():
        if bool(value["result"]) == bool(value["branches"]):
            raise ValueError(f"Expected exactly one result representation: {entry['id']}")
    audit = {"id": entry["id"], "sourceBlockSha256": entry["source_block_sha256"],
             "playerSectionSha256": entry["player_section_sha256"], "playerFields": fields,
             "logicFields": technical}
    return content, audit


def import_source(source_dir: Path = SOURCE) -> tuple[dict, dict]:
    index = json.loads((source_dir / "03_SISALTOINDEKSI.json").read_text("utf-8"))
    raw = (source_dir / index["authoritative_manuscript"]).read_bytes()
    if hashlib.sha256(raw).hexdigest() != index["manuscript_sha256"]:
        raise ValueError("Manuscript changed: update the source index explicitly; do not overwrite player edits")
    text = raw.decode("utf-8").replace("\r\n", "\n")
    headings = list(HEADER.finditer(text))
    if [m[1] for m in headings] != [e["id"] for e in index["entries"]]:
        raise ValueError("Source IDs differ from the supplied index")
    contents, audits = [], []
    for i, (heading, entry) in enumerate(zip(headings, index["entries"])):
        end = headings[i + 1].start() if i + 1 < len(headings) else len(text)
        block = text[heading.start():end].split("\n---", 1)[0].rstrip()
        if sha(block) != entry["source_block_sha256"]:
            raise ValueError(f"Source block hash differs: {entry['id']}")
        content, audit = parse_entry(block, entry)
        contents.append(content)
        audits.append(audit)
    metadata = {"format": "kaava-v5-text-1", "sourceSha256": index["manuscript_sha256"]}
    return {**metadata, "entries": contents}, {**metadata, "entries": audits}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    content, audit = import_source()
    for relative, value in (("content/v5.fi.json", content), ("docs/v5/SOURCE_AUDIT.json", audit)):
        path = ROOT / relative
        rendered = json.dumps(value, ensure_ascii=False, indent=2) + "\n"
        if args.check:
            if not path.exists() or path.read_text("utf-8") != rendered:
                raise SystemExit(f"FAIL: regenerate {relative} with tools/import_v5.py")
        else:
            if path.exists() and relative.endswith("v5.fi.json"):
                previous = {item["id"]: item for item in json.loads(path.read_text("utf-8"))["entries"]}
                current = {item["id"]: item for item in value["entries"]}
                changed = sorted(key for key in previous.keys() | current.keys() if previous.get(key) != current.get(key))
                print("Changed content IDs:", ", ".join(changed) or "none")
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(rendered, encoding="utf-8", newline="\n")
    print(f"PASS: {len(content['entries'])} exact-source text entries; no runtime effects inferred")


if __name__ == "__main__":
    main()

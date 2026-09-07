#!/usr/bin/env python3
"""Check authoring data, not gameplay. Requires: python -m pip install jsonschema."""
from __future__ import annotations
import argparse
from collections import Counter
from copy import deepcopy
import json
from pathlib import Path
import sys
from typing import Any, Iterator

ROOT = Path(__file__).resolve().parents[1]


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def load_bundle(root: Path = ROOT) -> dict[str, Any]:
    return {
        "pack": read_json(root / "content/cards.pilot.fi.json"),
        "manifest": read_json(root / "content/pilot_manifest.json"),
        "names": read_json(root / "content/project_names.fi.json"),
        "editorial": read_json(root / "content/editorial.fi.json"),
        "sources": read_json(root / "content/sources.json"),
        "schemas": {
            "pack": read_json(root / "schemas/cards.schema.json"),
            "names": read_json(root / "schemas/project_names.schema.json"),
            "editorial": read_json(root / "schemas/editorial.schema.json"),
        },
    }


def effects_in(choice: dict[str, Any]) -> Iterator[dict[str, Any]]:
    yield from choice["effects"]
    for job in choice["delayed"]:
        yield from job["effects"]


def validate_bundle(bundle: dict[str, Any]) -> list[str]:
    from jsonschema import Draft202012Validator
    errors: list[str] = []
    for name, schema in bundle["schemas"].items():
        Draft202012Validator.check_schema(schema)
        for error in Draft202012Validator(schema).iter_errors(bundle[name]):
            errors.append(f"schema {name} {list(error.absolute_path)}: {error.message}")
    if errors:
        return errors  # Do not dereference a malformed object below.
    pack, manifest = bundle["pack"], bundle["manifest"]
    cards, names, editorial = pack["cards"], bundle["names"]["names"], bundle["editorial"]
    ids = [c["id"] for c in cards]
    id_set = set(ids)
    by_id = {c["id"]: c for c in cards}
    if len(id_set) != len(ids): errors.append("duplicate card ID")
    if len(cards) != manifest["expectedCardCount"]: errors.append("card count differs from manifest")
    if bundle["sources"].get("sources") != []: errors.append("fictional runtime must have an empty source register")
    for key in ("id", "name"):
        values = [n[key].casefold() for n in names]
        if len(set(values)) != len(values): errors.append(f"duplicate project {key}")
    eids = [e["cardId"] for e in editorial["cards"]]
    if len(set(eids)) != len(eids): errors.append("duplicate editorial card ID")
    if set(eids) != id_set: errors.append("editorial coverage differs from card IDs")
    if editorial["packId"] != pack["packId"]: errors.append("editorial packId differs")
    allowed_fields = (set(manifest["derivedConditionFields"]) | set(manifest["adjustableFields"])
                      | {"flags." + f for f in manifest["flags"]}
                      | {"site." + f for f in manifest["siteFields"]}
                      | {"tracks." + f for f in manifest["allowedTracks"]})
    queued: dict[str, set[str]] = {}
    for card in cards:
        cid = card["id"]
        if card["sourceIds"]: errors.append(f"{cid}: real-case source link not allowed")
        if card["speakerId"] not in manifest["roles"]: errors.append(f"{cid}: unknown speaker")
        if card["artKey"] not in manifest["artKeys"]: errors.append(f"{cid}: unknown art key")
        for condition in card["requiresAll"]:
            key, value = condition["field"], condition["value"]
            if key not in allowed_fields: errors.append(f"{cid}: unknown condition field {key}")
            if condition["operator"] not in ("eq", "neq") and (isinstance(value, bool) or not isinstance(value, (float, int))):
                errors.append(f"{cid}: non-numeric comparison")
            if key.startswith("flags.") and not isinstance(value, bool): errors.append(f"{cid}: non-boolean flag test")
            if key.startswith("tracks.") and value not in manifest["allowedTracks"].get(key[7:], []):
                errors.append(f"{cid}: invalid track condition")
            if key.startswith("site.") and key != "site.windClass" and not isinstance(value, bool):
                errors.append(f"{cid}: non-boolean site condition")
            if key == "site.windClass" and value not in ("weak", "good"): errors.append(f"{cid}: invalid wind class")
        queued[cid] = set()
        for choice in card["choices"].values():
            for effect in effects_in(choice):
                op = effect["op"]
                if op == "queueCard":
                    queued[cid].add(effect["cardId"])
                    if effect["cardId"] not in id_set: errors.append(f"{cid}: missing queued card {effect['cardId']}")
                if op == "track" and effect["value"] not in manifest["allowedTracks"].get(effect["key"], []):
                    errors.append(f"{cid}: invalid track transition target")
                if op == "flag" and effect["key"] in manifest["readOnlyGateFlags"]:
                    errors.append(f"{cid}: content writes protected gate flag")
                if op == "windRemove" and "solar" in card["modes"]: errors.append(f"{cid}: removes wind in solar-only mode")
                if op == "solarRemove" and "wind" in card["modes"]: errors.append(f"{cid}: removes solar in wind-only mode")
                if op == "pivot" and card["modes"] != ["hybrid"]: errors.append(f"{cid}: pivot outside hybrid")
    demo = manifest["demo"]
    if len(demo["demoFlow"]) != len(demo["script"]): errors.append("demoFlow/script decision count differs")
    if len(set(demo["script"])) != len(demo["script"]): errors.append("duplicate demo script card")
    for cid in demo["script"]:
        if cid not in id_set: errors.append(f"demo: missing card {cid}")
    previously_queueable: set[str] = set()
    for step in demo["demoFlow"]:
        alternatives = step.get("queuedOneOf", [step.get("cardId")])
        for cid in alternatives:
            if cid not in by_id:
                errors.append(f"demoFlow: missing card {cid}"); continue
            card = by_id[cid]
            if step["phase"] not in card["phases"]: errors.append(f"demoFlow: {cid} phase mismatch")
            if demo["mode"] not in card["modes"]: errors.append(f"demoFlow: {cid} mode mismatch")
            if "queuedOneOf" in step:
                if cid not in previously_queueable: errors.append(f"demoFlow: {cid} has no earlier queue source")
                if card["trigger"] != "followup": errors.append(f"demoFlow: {cid} is not a followup")
        if "queuedOneOf" in step and step.get("waitUntilDue") is not True:
            errors.append("demoFlow: queued branch must wait until due")
        for cid in alternatives:
            previously_queueable.update(queued.get(cid, set()))
    for cid in ("H002", "H003"):
        if cid in by_id and by_id[cid]["trigger"] != "followup": errors.append(f"{cid}: satire branch cannot be ambient")
    # Detect accidental outward links; this is not a semantic privacy or legal audit.
    for name in ("pack", "names", "editorial"):
        text = json.dumps(bundle[name], ensure_ascii=False).lower()
        if "http://" in text or "https://" in text: errors.append(f"{name}: external URL in runtime data")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--extra", type=Path, help="Optional draft card-pack JSON to validate merged in memory.")
    parser.add_argument("--editorial-extra", type=Path, help="Matching draft editorial JSON (object with cards array).")
    args = parser.parse_args()
    if bool(args.extra) != bool(args.editorial_extra):
        parser.error("--extra and --editorial-extra must be supplied together")
    try:
        bundle = load_bundle()
        if args.extra:
            bundle = deepcopy(bundle)
            extra = read_json(args.extra)
            extra_e = read_json(args.editorial_extra)
            bundle["pack"]["cards"].extend(extra["cards"])
            bundle["editorial"]["cards"].extend(extra_e["cards"])
            bundle["manifest"]["expectedCardCount"] = len(bundle["pack"]["cards"])
        errors = validate_bundle(bundle)
        if errors:
            print("FAILED\n" + "\n".join(errors)); return 1
        cards = bundle["pack"]["cards"]
        print("PASS: three JSON Schemas (cards, names, editorial), Draft 2020-12")
        print(f"PASS: {len(cards)} unique cards; {2*len(cards)} choices; {len(bundle['names']['names'])} unique fictional names")
        print("PASS: speaker, art-key, field, flag, track and queued-card references")
        print("PASS: editorial coverage and protected gate / component-removal constraints")
        print("PASS: demo phase, mode and queued-branch references (not engine execution)")
        print("PASS: empty case-source register and no external URLs in checked runtime data")
        print("Tones: " + str(dict(Counter(c["tone"] for c in cards))))
        print("NOT TESTED: game execution, campaign reachability, balance, humor, actual artwork, phone UI, worldwide name uniqueness")
        if args.extra: print("Draft merge was validated in memory; no source files were changed.")
        return 0
    except ImportError:
        print("ERROR: install jsonschema: python -m pip install jsonschema", file=sys.stderr); return 2
    except (OSError, ValueError, KeyError, TypeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr); return 2


if __name__ == "__main__":
    raise SystemExit(main())

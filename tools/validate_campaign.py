"""Validate the separate authored campaign; not a legal or humor review."""
import json
from pathlib import Path
from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[1]
def read(path): return json.loads((ROOT / path).read_text(encoding="utf-8"))
pack = read("content/cards.campaign.fi.json")
Draft202012Validator(read("schemas/cards.schema.json")).validate(pack)
cards = {c["id"]: c for c in pack["cards"]}
assert len(cards) == len(pack["cards"]), "Duplicate card IDs"
flow = read("content/campaign_flow.json")
assert set(n["stage"] for n in flow["nodes"]) == set(range(7))
for node in flow["nodes"]:
    assert node["cardId"] in cards
    for card_id in node.get("alternatives", []): assert card_id in cards
for card in cards.values():
    assert card["sourceIds"] == []
    for side in card["choices"].values():
        for effect in side["effects"]:
            assert effect.get("key") not in read("content/pilot_manifest.json")["readOnlyGateFlags"]
assert "http://" not in json.dumps(pack) and "https://" not in json.dumps(pack)
print(f"PASS: {len(cards)} separate campaign cards, {len(flow['nodes'])} procedure nodes, 7 stages, both choices, no gate writes or real-case links")

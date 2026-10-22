"""Builds project/components/bundle.js from components/src/sarki.js + the Phosphor SVGs.

Run:  python3 scripts/build_bundle.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "project"
ICON_DIR = ROOT / "assets/Icons"
SRC = ROOT / "components/src/sarki.js"
OUT = ROOT / "components/bundle.js"

COMPONENTS = ["Icon", "Button", "IconButton", "Input", "Checkbox", "Switch", "Badge", "Price", "Logo",
              "FormField", "QuantityStepper", "SegmentedControl", "StatTile",
              "ProductCard", "ServiceCard", "OrderSummary", "StationCard", "UsagePanel", "SiteHeader"]

icons = {}
for svg in sorted(ICON_DIR.glob("*.svg")):
    icons[svg.stem] = re.findall(r'<path d="([^"]+)"', svg.read_text())

header = {"format": 4, "namespace": "Sarki", "components": [{"name": n} for n in COMPONENTS]}
body = SRC.read_text()
bundle = (
    f"/* @ds-bundle: {json.dumps(header, separators=(',', ':'))} */\n"
    "(function () {\n"
    "'use strict';\n"
    f"var ICONS = {json.dumps(icons, separators=(',', ':'))};\n"
    f"{body}\n"
    "window.Sarki = Object.assign(window.Sarki || {}, Sarki);\n"
    "})();\n"
)
for bad in ("</script", "<!--"):
    assert bad not in bundle.lower(), bad
OUT.write_text(bundle)
print(f"wrote {OUT.relative_to(ROOT.parent)} ({len(bundle):,} bytes, {len(icons)} icons)")

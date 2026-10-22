# Sarki Energy design system

One source of truth, three outputs.

| Folder | What |
| --- | --- |
| `scripts/build_tokens.py` | **Edit tokens here.** Colours, type scale, spacing, radius, shadows. |
| `project/` | Design System artifact content: `tokens.json`, components (`components/src/sarki.js`, `bundle.css`), previews, guidelines, fonts, icons. |
| `code/tokens.css` | CSS custom properties + text-style classes for the web codebase (light/dark). |
| `code/tokens.json` | Resolved values per theme for native apps and tooling. |
| `code/playground.html` | Every component on one page with a theme switch. Serve the `design-system` folder and open it. |
| `figma/` | Figma build data and the ID ledger (`state.json`) for file `4rnrn2qJADWeHa8rUwcAPy`. |

## Rebuild after a change

```bash
python3 scripts/build_tokens.py && python3 scripts/build_bundle.py && python3 scripts/build_docs.py && python3 scripts/build_playground.py
```

Token values changed? Update the matching Figma variables too (same names, slash-grouped: `surface-subtle` → `surface/subtle`). Every Figma variable's code syntax is the CSS variable.

## Licences

Host Grotesk: SIL Open Font License 1.1 (`project/fonts/OFL.txt`). Phosphor Icons: MIT.

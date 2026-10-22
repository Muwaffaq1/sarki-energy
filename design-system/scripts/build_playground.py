"""Builds code/playground.html: every component preview on one page, with a theme switch.

Run:  python3 scripts/build_playground.py   then serve the design-system folder.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
parts = []
for p in sorted((ROOT / 'project/components').glob('*/preview.html')):
    name = p.parent.name
    if name == 'Cover':
        continue
    src = p.read_text()
    attrs, js = re.search(r'<div id="root"([^>]*)></div>\s*<script>(.*?)</script>', src, re.S).groups()
    js = js.replace("document.getElementById('root')", f"document.getElementById('c-{name}')")
    group = re.search(r'group="(\w+)"', src).group(1)
    parts.append((group, name, attrs, js))
rank = {'Atoms': 0, 'Molecules': 1, 'Organisms': 2}
parts.sort(key=lambda x: rank[x[0]])
body = '\n'.join(f'<section><h2 class="overline">{g} · {n}</h2><div id="c-{n}"{a}></div><script>{js}</script></section>'
                 for g, n, a, js in parts)
(ROOT / 'code/playground.html').write_text(f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sarki Energy — component playground</title>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="../project/components/bundle.css">
<style>
  body {{ padding: var(--space-32) var(--space-16); max-width: 1216px; margin: 0 auto; }}
  body > section {{ margin-bottom: var(--space-48); }}
  body > section > h2 {{ color: var(--ink-muted); margin: 0 0 var(--space-8); padding-left: var(--space-16); }}
  .bar {{ display: flex; gap: var(--space-8); padding: 0 var(--space-16) var(--space-32); }}
</style>
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="../project/components/bundle.js"></script>
</head>
<body>
<div class="bar">
  <button class="se-btn se-btn--secondary se-btn--sm" onclick="document.documentElement.dataset.theme='light'">Light</button>
  <button class="se-btn se-btn--secondary se-btn--sm" onclick="document.documentElement.dataset.theme='dark'">Dark</button>
</div>
{body}
</body>
</html>
''')
print('wrote code/playground.html')

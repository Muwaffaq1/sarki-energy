# UsagePanel

A headline total, a period switcher and a bar chart, for energy generation, consumption or fuel volumes.

## Use
- The core block of the monitoring dashboard and the app's Usage tab.
- `series` picks the data colour: `solar` (Flame), `battery` (teal), `grid` (grey), `fuel` (blue). One series per panel.
- The last bar (or `highlight`) is full strength; the rest sit at 45% so today's reading stands out.
- The axis rounds up to a clean step, so every tick is a value the chart can reach.
- Fetch new `data` when `onPeriodChange` fires.

# StatTile

One headline metric with label, unit, trend and context.

## Use
- Dashboards and account home screens. Lay tiles in a row of 2 to 4.
- Keep the unit separate from the value (`value: '1,284'`, `unit: 'kWh'`) so the number lines up.
- `trend` sets the arrow; `upIsGood: false` flips the colour for metrics where less is better (diesel used, cost, downtime).
- `caption` gives the comparison period or a plain-language reading ("About 9 h of backup").

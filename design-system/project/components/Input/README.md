# Input

Single-line text input with optional leading icon and trailing unit.

## Use
- Always wrap in a `FormField` so it has a visible label. Placeholder text is a hint, never the label.
- Use `suffix` for units the user should not type: kVA, kWh, L, %.
- Set `inputMode` and `autoComplete` to match the data (`tel`, `email`, `decimal`) so Nigerian mobile keyboards show the right keys.
- 16px text stops iOS from zooming on focus. Keep it.

## States
Default border `line-strong` (3:1), hover `ink-muted`, focus `ink` with a 1px ring, invalid `danger`, disabled `surface-subtle` fill.

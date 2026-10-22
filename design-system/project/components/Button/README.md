# Button

Pill-shaped action. The pill echoes the circular logo.

## Variants
- `accent`: Flame fill with black label. The one most important action in a view (Start a project, Checkout, Start charging). Never more than one per view.
- `primary`: ink fill. The default strong action: Add to cart, Submit, Save.
- `secondary`: outlined in `line-strong`. Alternatives beside a primary: Directions, Download brochure.
- `ghost`: text only. Low-emphasis actions in toolbars and dialogs: Cancel, Clear filters.
- `danger`: destructive actions only, always behind a confirmation.

## Sizes
`sm` 32px (`control-sm`) for tables and dense toolbars; `md` 40px default; `lg` 48px (`control-lg`) for mobile CTAs and heroes. On touch screens use `lg` for the primary action.

## Copy
Start with a verb and name the outcome: "Add to cart", "Request a quote", "Start charging". No "Click here", no "Submit" when a specific verb exists.

## Provide
`children` (the label), optional `iconLeft` / `iconRight` (Phosphor names), `onClick`, `loading`, `disabled`, `fullWidth`.

# Icon

Phosphor icons (regular weight) on a 256 grid, drawn in `currentColor`.

## Use
- Sizes come from the size tokens: `icon-16` in badges and small buttons, `icon-20` in default buttons and inputs, `icon-24` standalone, `icon-32` on service cards, `icon-48` in empty states.
- Pass `label` only when the icon carries meaning on its own (a status with no text). Decorative icons stay hidden from screen readers.
- Colour comes from the parent: set `color` on the container with `ink`, `ink-muted` or `accent`.

## Don't
- Don't mix in other icon sets or weights. If an icon is missing, take it from Phosphor (`@phosphor-icons/core`, regular) and add it to `assets/Icons/`.
- Don't use emoji in UI.

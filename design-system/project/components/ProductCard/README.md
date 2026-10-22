# ProductCard

Product tile for shop grids: image, category, name, key spec, price, stock and add-to-cart.

## Use
- Grid of 2 columns on mobile, 3 to 4 on desktop. Cards in a row share heights; names clamp at two lines.
- `spec` is the one line a buyer compares on: capacity, chemistry, accuracy.
- `stock`: `in`, `low` or `out`. Out of stock swaps Add to cart for a secondary "Notify me" button (`onNotify`).
- `badge` for one promotion only (a saving, New). Never stack badges.
- Without an `image`, the card shows the category icon on `surface-subtle` as a placeholder.

## Provide
Product photo on a plain light background, 4:3, at least 640px wide.

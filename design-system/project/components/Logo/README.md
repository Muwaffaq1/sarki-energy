# Logo

The Sarki mark: a lowercase "se" bleeding out of a disc. Drawn inline as SVG from the `logo-mark` and `logo-on-mark` tokens, so it flips with the theme.

## Use
- `tone="default"` on `surface` and `surface-subtle`: black disc in light mode, white in dark.
- `tone="inverse"` on `surface-inverse` (footer, CTA bands, black hero bands).
- `tone="on-photo"` over photography: always a white disc with black letters, whatever the theme.
- 32px in the header and footer, never smaller than 24px. Keep clear space of a quarter of the mark's width on every side (8px at 32px).
- Pass `label="Sarki Energy"` when the mark stands alone. Next to the "Sarki Energy" wordmark, leave it unlabelled.

## Don't
- Don't recolour it (no Volt disc), outline it, add shadows, or crop the disc.
- Don't stretch it or rotate it. The letters bleed off the right edge on purpose.

## Files
Assets → Logos: `sarki-mark.svg`, `sarki-mark-inverse.svg`, `favicon.svg` (switches with the system theme), and PNGs at 512, 180 (apple-touch-icon) and 32.

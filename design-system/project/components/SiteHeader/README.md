# SiteHeader

The website's top bar: logo, main navigation, cart and the Start a project CTA.

## Use
- 64px tall, `surface` background, hairline `line` bottom border. Sticky on scroll.
- Five links at most, named by what visitors look for: Our business, Solutions, Shop, Projects, About.
- The CTA is the header's only `accent` element. The cart count also uses accent.
- Below 760px of available width, links and the CTA collapse behind the menu button.

## Provide
`links` and `cartCount`. The header draws the `Logo` itself; pass `logoSrc` only to override it with an image.

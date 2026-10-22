"""Writes component previews, guidelines and types for the Design System artifact.

Run:  python3 scripts/build_docs.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "project"

# name: (group, height, wrapper class, render expression, guidelines, props interface)
C = {}

C["Icon"] = ("Atoms", 96, "se-row", """
  ['lightning','solar-panel','sun','battery-charging','gas-pump','gas-can','charging-station','plug-charging','wind','drop-half','flame','leaf','factory','hard-hat','wrench','gauge','atom','chart-line-up'].map(function (n) { return h(S.Icon, { key: n, name: n, size: 24, label: n }); })
""", """Phosphor icons (regular weight) on a 256 grid, drawn in `currentColor`.

## Use
- Sizes come from the size tokens: `icon-16` in badges and small buttons, `icon-20` in default buttons and inputs, `icon-24` standalone, `icon-32` on service cards, `icon-48` in empty states.
- Pass `label` only when the icon carries meaning on its own (a status with no text). Decorative icons stay hidden from screen readers.
- Colour comes from the parent: set `color` on the container with `ink`, `ink-muted` or `accent`.

## Don't
- Don't mix in other icon sets or weights. If an icon is missing, take it from Phosphor (`@phosphor-icons/core`, regular) and add it to `assets/Icons/`.
- Don't use emoji in UI.""", """export interface IconProps { name: string; size?: 16 | 20 | 24 | 32 | 48 | number; label?: string; className?: string }""")

C["Button"] = ("Atoms", 200, "se-stack", """
  h(React.Fragment, null,
    h('div', { className: 'se-row', style: { padding: 0 } },
      h(S.Button, { variant: 'accent', iconRight: 'arrow-right' }, 'Start a project'),
      h(S.Button, { variant: 'primary' }, 'Explore solutions'),
      h(S.Button, { variant: 'secondary' }, 'Download brochure'),
      h(S.Button, { variant: 'ghost' }, 'Cancel'),
      h(S.Button, { variant: 'danger' }, 'Remove')),
    h('div', { className: 'se-row', style: { padding: 0 } },
      h(S.Button, { variant: 'primary', size: 'sm', iconLeft: 'plus' }, 'Small'),
      h(S.Button, { variant: 'primary', size: 'md' }, 'Medium'),
      h(S.Button, { variant: 'primary', size: 'lg' }, 'Large'),
      h(S.Button, { variant: 'primary', loading: true }, 'Saving'),
      h(S.Button, { variant: 'primary', disabled: true }, 'Disabled')))
""", """Pill-shaped action. The pill echoes the circular logo.

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
`children` (the label), optional `iconLeft` / `iconRight` (Phosphor names), `onClick`, `loading`, `disabled`, `fullWidth`.""",
"""export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: string;
  iconRight?: string;
  loading?: boolean;
  fullWidth?: boolean;
}""")

C["IconButton"] = ("Atoms", 88, "se-row", """
  h(React.Fragment, null,
    h(S.IconButton, { icon: 'magnifying-glass', label: 'Search', variant: 'secondary' }),
    h(S.IconButton, { icon: 'shopping-cart-simple', label: 'Cart', variant: 'ghost' }),
    h(S.IconButton, { icon: 'plus', label: 'Add', variant: 'primary' }),
    h(S.IconButton, { icon: 'arrow-right', label: 'Next', variant: 'accent', size: 'lg' }),
    h(S.IconButton, { icon: 'x', label: 'Close', variant: 'ghost', size: 'sm' }))
""", """A circular button with only an icon. Same variants and sizes as Button.

## Use
- Always pass `label`: it becomes the accessible name and the tooltip.
- Use for universally understood actions only: search, close, cart, menu, next. Anything else gets a text Button.
- Keep at least 40px (`control-md`) on touch screens; `sm` is for dense desktop tables.""",
"""export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  variant?: 'accent' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}""")

C["Input"] = ("Atoms", 168, "se-stack", """
  h(React.Fragment, null,
    h(S.Input, { placeholder: 'Search inverters, panels, meters', iconLeft: 'magnifying-glass' }),
    h(S.Input, { defaultValue: '5', suffix: 'kVA', inputMode: 'decimal' }),
    h(S.Input, { defaultValue: '0803 123 456', invalid: true }))
""", """Single-line text input with optional leading icon and trailing unit.

## Use
- Always wrap in a `FormField` so it has a visible label. Placeholder text is a hint, never the label.
- Use `suffix` for units the user should not type: kVA, kWh, L, %.
- Set `inputMode` and `autoComplete` to match the data (`tel`, `email`, `decimal`) so Nigerian mobile keyboards show the right keys.
- 16px text stops iOS from zooming on focus. Keep it.

## States
Default border `line-strong` (3:1), hover `ink-muted`, focus `ink` with a 1px ring, invalid `danger`, disabled `surface-subtle` fill.""",
"""export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  iconLeft?: string;
  suffix?: React.ReactNode;
}""")

C["Checkbox"] = ("Atoms", 128, "se-stack", """
  h(React.Fragment, null,
    h(S.Checkbox, { label: 'Include installation', description: 'Certified engineers, within 7 working days', defaultChecked: true }),
    h(S.Checkbox, { label: 'Add 2-year extended warranty' }),
    h(S.Checkbox, { label: 'Unavailable in your state', disabled: true }))
""", """A square checkbox for independent yes/no choices and multi-select filters.

## Use
- Use for options that don't take effect until the user submits (filters, add-ons, consent). For settings that apply immediately, use `Switch`.
- Label says what happens when checked. Put supporting detail in `description`.
- Checked fill is `surface-inverse`, not accent: the accent stays reserved for the main action.""",
"""export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  description?: React.ReactNode;
}""")

C["Switch"] = ("Atoms", 120, "se-stack", """
  h(React.Fragment, null,
    h(S.Switch, { label: 'Charge from solar only', defaultChecked: true }),
    h(S.Switch, { label: 'Low battery alerts' }),
    h(S.Switch, { label: 'Grid export (not available)', disabled: true }))
""", """An on/off toggle for settings that take effect immediately.

## Use
- Device and account settings in the app: charge schedules, alerts, eco mode.
- The on state uses `accent` (Flame), matching how energy apps signal "active".
- Label states the setting, not the action: "Low battery alerts", not "Turn on alerts".""",
"""export interface SwitchProps {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}""")

C["Badge"] = ("Atoms", 120, "se-stack", """
  h(React.Fragment, null,
    h('div', { className: 'se-row', style: { padding: 0 } },
      h(S.Badge, null, 'Solar'),
      h(S.Badge, { tone: 'accent' }, 'New'),
      h(S.Badge, { tone: 'inverse' }, 'Bestseller')),
    h('div', { className: 'se-row', style: { padding: 0 } },
      h(S.Badge, { tone: 'success', dot: true }, 'In stock'),
      h(S.Badge, { tone: 'warning', dot: true }, 'Low battery'),
      h(S.Badge, { tone: 'danger', dot: true }, 'Offline'),
      h(S.Badge, { tone: 'info', icon: 'info' }, 'Installation included')))
""", """One or two words of status or category, in a pill.

## Tones
- `neutral`: categories and tags.
- `accent`: promotions and "New". One per card at most.
- `inverse`: editorial labels such as Bestseller.
- `success`, `warning`, `danger`, `info`: status. Always add `dot` or an `icon` so status never depends on colour alone.

## Copy
Sentence case, one to three words, no punctuation.""",
"""export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'inverse' | 'success' | 'warning' | 'danger' | 'info';
  dot?: boolean;
  icon?: string;
  children?: React.ReactNode;
}""")

C["Price"] = ("Atoms", 120, "se-stack", """
  h(React.Fragment, null,
    h(S.Price, { amount: 950000, size: 'lg' }),
    h(S.Price, { amount: 550000, compareAt: 620000 }),
    h(S.Price, { amount: 897, unit: 'L', size: 'sm' }))
""", """A naira amount in tabular figures, with an optional struck-through previous price and unit.

## Use
- Always pass numbers, never pre-formatted strings. `Price` formats with `en-NG` grouping: ₦950,000.
- `compareAt` shows the old price struck through and is announced as "Was ₦620,000".
- `unit` for metered prices: per litre (`L`), per kWh, per kg of LPG.
- Sizes: `sm` in lists, `md` on cards, `lg` on product pages and summaries.""",
"""export interface PriceProps {
  amount: number;
  compareAt?: number;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
}""")

C["Logo"] = ("Atoms", 120, "se-row", """
  h(React.Fragment, null,
    h(S.Logo, { size: 64, label: 'Sarki Energy' }),
    h('div', { style: { background: 'var(--surface-inverse)', padding: 'var(--space-16)', borderRadius: 'var(--radius-16)' } }, h(S.Logo, { size: 64, tone: 'inverse' })),
    h('div', { style: { background: 'var(--neutral-600)', padding: 'var(--space-16)', borderRadius: 'var(--radius-16)' } }, h(S.Logo, { size: 64, tone: 'on-photo' })),
    h(S.Logo, { size: 32 }), h(S.Logo, { size: 24 }))
""", """The Sarki mark: a lowercase "se" bleeding out of a disc. Drawn inline as SVG from the `logo-mark` and `logo-on-mark` tokens, so it flips with the theme.

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
Assets → Logos: `sarki-mark.svg`, `sarki-mark-inverse.svg`, `favicon.svg` (switches with the system theme), and PNGs at 512, 180 (apple-touch-icon) and 32.""", """export interface LogoProps { size?: number; tone?: 'default' | 'inverse' | 'on-photo'; label?: string; className?: string }""")

C["FormField"] = ("Molecules", 248, "se-stack", """
  h(React.Fragment, null,
    h(S.FormField, { label: 'Company name', required: true }, h(S.Input, { defaultValue: 'Kano Agro Mills Ltd' })),
    h(S.FormField, { label: 'Average monthly diesel spend', hint: 'A rough figure is fine. We use it to size your solar system.' }, h(S.Input, { placeholder: '450,000', suffix: '\\u20A6 / month', inputMode: 'numeric' })),
    h(S.FormField, { label: 'Phone number', error: 'Enter an 11-digit Nigerian number, like 0803 123 4567.' }, h(S.Input, { defaultValue: '0803 123 456', type: 'tel' })))
""", """Label, control, and hint or error message, wired together for screen readers.

## Use
- Wrap every Input, select or textarea. FormField generates the `id`, links the label, and points `aria-describedby` at the hint or error.
- `hint` explains format or why we ask. `error` replaces the hint and says how to fix the problem.
- Mark the few required fields with `required`, or the few optional ones with `optional`; never both in one form.

## Error copy
Say what to enter, not what went wrong: "Enter an 11-digit Nigerian number, like 0803 123 4567." Never "Invalid input".""",
"""export interface FormFieldProps {
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  id?: string;
  children: React.ReactElement;
}""")

C["QuantityStepper"] = ("Molecules", 88, "se-row", """
  h(React.Fragment, null,
    h(S.QuantityStepper, { defaultValue: 2, max: 10 }),
    h(S.QuantityStepper, { defaultValue: 1, size: 'sm' }))
""", """Minus / value / plus control for cart quantities and units.

## Use
- Cart lines, product pages and bulk orders (panels, cylinders).
- Set `min` and `max` from stock. The buttons disable at the limits.
- Changes are announced politely to screen readers.""",
"""export interface QuantityStepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md';
  label?: string;
}""")

C["SegmentedControl"] = ("Molecules", 120, "se-stack", """
  h(React.Fragment, null,
    h(S.SegmentedControl, { options: ['Day', 'Week', 'Month', 'Year'], defaultValue: 'Week', label: 'Period' }),
    h(S.SegmentedControl, { options: [{ value: 'kwh', label: 'kWh' }, { value: 'ngn', label: '\\u20A6' }], label: 'Units' }))
""", """Two to five mutually exclusive options shown side by side: period pickers, unit toggles, list/map views.

## Use
- Use for switching how the same content is shown. For navigation between different content, use tabs or links.
- Labels are one short word. More than five options: use a select.
- Arrow keys move the selection, as in a radio group.""",
"""export interface SegmentedControlProps {
  options: Array<string | { value: string; label: React.ReactNode }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  fullWidth?: boolean;
}""")

C["StatTile"] = ("Molecules", 176, "se-grid", """
  h(React.Fragment, null,
    h(S.StatTile, { icon: 'solar-panel', label: 'Solar generated', value: '1,284', unit: 'kWh', trend: 'up', delta: '12%', caption: 'vs last month' }),
    h(S.StatTile, { icon: 'battery-charging', label: 'Battery', value: '86', unit: '%', caption: 'About 9 h of backup' }),
    h(S.StatTile, { icon: 'gas-pump', label: 'Diesel used', value: '320', unit: 'L', trend: 'down', delta: '41%', upIsGood: false, caption: 'vs last month' }))
""", """One headline metric with label, unit, trend and context.

## Use
- Dashboards and account home screens. Lay tiles in a row of 2 to 4.
- Keep the unit separate from the value (`value: '1,284'`, `unit: 'kWh'`) so the number lines up.
- `trend` sets the arrow; `upIsGood: false` flips the colour for metrics where less is better (diesel used, cost, downtime).
- `caption` gives the comparison period or a plain-language reading ("About 9 h of backup").""",
"""export interface StatTileProps {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'flat';
  delta?: string;
  upIsGood?: boolean;
  caption?: React.ReactNode;
}""")

C["ProductCard"] = ("Organisms", 440, "se-grid", """
  h(React.Fragment, null,
    h(S.ProductCard, { icon: 'lightning', category: 'Inverters', name: 'Smart Inverter Module 5 kVA', spec: 'Pure sine wave, 48 V, Wi-Fi monitoring', price: 550000, compareAt: 620000, badge: { label: 'Save 11%' }, stock: 'in' }),
    h(S.ProductCard, { icon: 'battery-charging', category: 'Storage', name: 'Compact Lithium Cell 5 kWh', spec: 'LiFePO4, 6,000 cycles', price: 899000, stock: 'low' }),
    h(S.ProductCard, { icon: 'gauge', category: 'Metering', name: 'Digital Flow Meter', spec: 'Diesel and petrol, \\u00B10.5%', price: 380000, stock: 'out' }))
""", """Product tile for shop grids: image, category, name, key spec, price, stock and add-to-cart.

## Use
- Grid of 2 columns on mobile, 3 to 4 on desktop. Cards in a row share heights; names clamp at two lines.
- `spec` is the one line a buyer compares on: capacity, chemistry, accuracy.
- `stock`: `in`, `low` or `out`. Out of stock swaps Add to cart for a secondary "Notify me" button (`onNotify`).
- `badge` for one promotion only (a saving, New). Never stack badges.
- Without an `image`, the card shows the category icon on `surface-subtle` as a placeholder.

## Provide
Product photo on a plain light background, 4:3, at least 640px wide.""",
"""export interface ProductCardProps {
  name: string;
  price: number;
  compareAt?: number;
  category?: string;
  spec?: string;
  image?: string;
  imageAlt?: string;
  icon?: string;
  badge?: { label: string; tone?: 'accent' | 'inverse' | 'success' };
  stock?: 'in' | 'low' | 'out';
  onAdd?: () => void;
  onNotify?: () => void;
}""")

C["ServiceCard"] = ("Organisms", 320, "se-grid", """
  h(React.Fragment, null,
    h(S.ServiceCard, { icon: 'solar-panel', title: 'Renewable Energy & Power', description: 'Solar PV systems, battery energy storage and clean power for homes and industry.', href: '#' }),
    h(S.ServiceCard, { icon: 'gas-pump', title: 'Oil & Gas', description: 'Supply and trading, fuel station services, CNG and LPG stations.', href: '#' }),
    h(S.ServiceCard, { icon: 'hard-hat', title: 'Engineering', description: 'End-to-end EPC services delivering quality, safe and efficient projects.', href: '#' }))
""", """Card for a business line or service, with an icon in a black disc that echoes the logo.

## Use
- Homepage "Our Business" grid and service index pages. Three or four per row on desktop.
- Pass `href` to make the whole card a link; the arrow nudges on hover.
- Titles are the business line name. Descriptions are one sentence that lists what's included.

## Icon pairing
Renewables `solar-panel`, Oil & Gas `gas-pump`, Engineering `hard-hat`, Technology `chart-line-up`, Research & Innovation `atom`, EV charging `charging-station`, Biogas `leaf`, Energy audit `gauge`.""",
"""export interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  href?: string;
  linkLabel?: string;
}""")

C["OrderSummary"] = ("Organisms", 480, "se-stack", """
  h('div', { style: { maxWidth: 400 } }, h(S.OrderSummary, {
    items: [
      { name: 'Smart Inverter Module 5 kVA', qty: 1, amount: 550000 },
      { name: 'Compact Lithium Cell 5 kWh', qty: 2, amount: 899000 },
      { name: 'Installation, Abuja', qty: 1, amount: 150000 }],
    delivery: 25000, discount: 50000, ctaLabel: 'Continue to payment' }))
""", """Cart and checkout summary: line items, subtotal, discount, delivery, VAT and total, with the checkout action.

## Use
- Right column on desktop checkout; sticky bottom sheet on mobile.
- Pass raw numbers. The summary adds lines, applies `discount`, computes VAT at 7.5% (Nigeria's rate, set `vatRate` to change) and formats in naira.
- The CTA is the page's one `accent` button. Name the next step: "Continue to payment", "Place order".
- `note` sits under the CTA for payment reassurance. Name the methods people actually use: card, bank transfer, USSD.""",
"""export interface OrderSummaryProps {
  items: Array<{ name: string; amount: number; qty?: number }>;
  delivery?: number;
  discount?: number;
  vatRate?: number;
  title?: string;
  ctaLabel?: string;
  note?: React.ReactNode;
  onCheckout?: () => void;
}""")

C["StationCard"] = ("Organisms", 380, "se-grid se-grid--wide", """
  h(React.Fragment, null,
    h(S.StationCard, { kind: 'fuel', name: 'Sarki Station, Wuse II', distance: '2.4 km', address: 'Aminu Kano Cres', status: 'open',
      products: [{ label: 'PMS (petrol)', price: 897 }, { label: 'AGO (diesel)', price: 1180 }, { label: 'LPG', price: 1150, unit: 'kg' }] }),
    h(S.StationCard, { kind: 'ev', name: 'Sarki EV Hub, Lekki', distance: '6.1 km', address: 'Admiralty Way', status: 'busy',
      chargers: { available: 1, total: 4, power: '60 kW', price: 250 } }))
""", """A fuel, gas or EV charging station with live status, prices or charger availability, and actions.

## Use
- Bottom sheet over the station map in the app; list view on the website's station finder.
- `kind: 'fuel'` lists `products` with per-litre or per-kg prices. `kind: 'ev'` shows charger availability, max power and price per kWh.
- `status`: `open`, `busy`, `closed`, `maintenance`. Closed and maintenance disable the primary action but keep Directions.
- Use the regulator's product names with plain-language glosses: "PMS (petrol)", "AGO (diesel)".""",
"""export interface StationCardProps {
  kind: 'fuel' | 'ev';
  name: string;
  status?: 'open' | 'busy' | 'closed' | 'maintenance';
  distance?: string;
  address?: string;
  products?: Array<{ label: string; price: number; unit?: string }>;
  chargers?: { available: number; total: number; power: string; price?: number };
  onDirections?: () => void;
  onPrimary?: () => void;
}""")

C["UsagePanel"] = ("Organisms", 400, "se-stack", """
  h(S.UsagePanel, { title: 'Solar generated this week', total: '186.4', unit: 'kWh', series: 'solar',
    data: [{ label: 'Mon', value: 24.1 }, { label: 'Tue', value: 28.6 }, { label: 'Wed', value: 19.2 }, { label: 'Thu', value: 30.4 }, { label: 'Fri', value: 27.9 }, { label: 'Sat', value: 26.3 }, { label: 'Sun', value: 29.9 }],
    periods: ['Day', 'Week', 'Month', 'Year'], defaultPeriod: 'Week' })
""", """A headline total, a period switcher and a bar chart, for energy generation, consumption or fuel volumes.

## Use
- The core block of the monitoring dashboard and the app's Usage tab.
- `series` picks the data colour: `solar` (Flame), `battery` (teal), `grid` (grey), `fuel` (blue). One series per panel.
- The last bar (or `highlight`) is full strength; the rest sit at 45% so today's reading stands out.
- The axis rounds up to a clean step, so every tick is a value the chart can reach.
- Fetch new `data` when `onPeriodChange` fires.""",
"""export interface UsagePanelProps {
  title: string;
  total: React.ReactNode;
  unit?: string;
  data: Array<{ label: string; value: number }>;
  series?: 'solar' | 'battery' | 'grid' | 'fuel';
  periods?: string[];
  period?: string;
  defaultPeriod?: string;
  onPeriodChange?: (period: string) => void;
  highlight?: number;
}""")

C["SiteHeader"] = ("Organisms", 96, "", """
  h(S.SiteHeader, { cartCount: 2,
    links: [{ label: 'Our business', current: true }, { label: 'Solutions' }, { label: 'Shop' }, { label: 'Projects' }, { label: 'About' }] })
""", """The website's top bar: logo, main navigation, cart and the Start a project CTA.

## Use
- 64px tall, `surface` background, hairline `line` bottom border. Sticky on scroll.
- Five links at most, named by what visitors look for: Our business, Solutions, Shop, Projects, About.
- The CTA is the header's only `accent` element. The cart count also uses accent.
- Below 760px of available width, links and the CTA collapse behind the menu button.

## Provide
`links` and `cartCount`. The header draws the `Logo` itself; pass `logoSrc` only to override it with an image.""",
"""export interface SiteHeaderProps {
  logoSrc?: string;
  name?: string;
  homeHref?: string;
  links?: Array<{ label: string; href?: string; current?: boolean }>;
  cartCount?: number;
  ctaLabel?: string;
}""")


def preview(name, group, height, wrap, expr):
    root_cls = f' class="{wrap}"' if wrap else ""
    return f"""<!-- @dsCard group="{group}" height={height} -->
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>{name}</title></head>
<body>
<div id="root"{root_cls}></div>
<script>
  var S = window.Sarki, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('root')).render({expr.strip()});
</script>
</body>
</html>
"""


if __name__ == "__main__":
    dts = ["import type * as React from 'react';", ""]
    for name, (group, height, wrap, expr, readme, props) in C.items():
        d = ROOT / "components" / name
        d.mkdir(parents=True, exist_ok=True)
        (d / "preview.html").write_text(preview(name, group, height, wrap, expr))
        (d / "README.md").write_text(f"# {name}\n\n{readme.strip()}\n")
        dts += [props, f"export declare function {name}(props: {name}Props): React.ReactElement;", ""]
    dts += ["export declare function formatNaira(amount: number): string;", "",
            "declare global {", "  interface Window {", "    Sarki: {"]
    dts += [f"      {n}: typeof {n};" for n in C] + ["      formatNaira: typeof formatNaira;", "      icons: string[];", "    };", "  }", "}", ""]
    (ROOT / "components/index.d.ts").write_text("\n".join(dts))
    print(f"wrote {len(C)} components")

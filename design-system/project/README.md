Sarki Energy builds solar, storage, fuel and engineering infrastructure for homes, businesses and industry across Nigeria. The interface should feel like the company's work: engineered, dependable, direct. Black and white carry the brand, with one signal colour, Volt green, where energy is moving or a decision matters.

The system is built atomically: **atoms** (Icon, Button, IconButton, Input, Checkbox, Switch, Badge, Price, Logo) combine into **molecules** (FormField, QuantityStepper, SegmentedControl, StatTile), which compose **organisms** (ProductCard, ServiceCard, OrderSummary, StationCard, UsagePanel, SiteHeader). Templates and pages are built in product code from these organisms.

## Content fundamentals

- **Voice:** confident and plain. Say what the product does and what the customer gets. "Cut your diesel spend with a 10 kW solar system", not "Revolutionising energy for tomorrow".
- **Person:** speak to the customer as "you"; the company is "we".
- **Casing:** sentence case everywhere, including buttons and headings ("Start a project", "Featured solutions"). Product and business-line names keep their capitals ("Renewable Energy & Power").
- **Numbers:** always with units, a thin space before them in prose: 5 kVA, 186.4 kWh, 60 kW, ₦897/L. Naira as `₦` followed by grouped digits: ₦1,250,000. Use `Price` for any amount on screen.
- **Local terms:** use the names customers see at the pump and on bills, with a gloss where it helps: "PMS (petrol)", "AGO (diesel)", "LPG", "NEPA/grid".
- **No emoji** in product UI.

## Colour

- `surface` is the page; `surface-subtle` bands sections and backs image placeholders; `surface-raised` holds cards, always with a `line` border in light.
- Text is `ink`; secondary text is `ink-muted` (7:1 on every surface). `ink-disabled` is for disabled states and placeholders only.
- `surface-inverse` with `ink-inverse` makes the black brand blocks: hero bands, the primary button, the icon discs on service cards.
- **Volt** (`accent`) is the only brand colour. Use it for the single most important action in a view (the `accent` Button), active toggles and the cart count. Text on a Volt fill is always `on-accent` (black, 8:1); white fails. Volt as text is `accent-text`.
- Status colours (`success`, `warning`, `danger`, `info`) only mean status. Pair each with its `-soft` background, and always with a dot, icon or word, never colour alone.
- Charts use the `viz-` tokens: `viz-solar`, `viz-battery`, `viz-grid`, `viz-fuel`. Gridlines are `line`, axis text `ink-muted`.
- Components use semantic tokens only. The `neutral-`, `volt-`, `green-`, `yellow-`, `red-`, `blue-` and `teal-` primitives exist to define them.
- Both themes are first-class. Dark is true black (`neutral-1000`) with `neutral-900` cards.

## Typography

- One family: **Host Grotesk** (variable, 300–800, SIL Open Font License, free for commercial use). Self-host the files in `fonts/`.
- The scale is a Major Third (×1.25) from 16px, rounded to even numbers: 12 · 14 · 16 · 18 · 20 · 24 · 32 · 40 · 48 · 64 · 80. Every line height sits on the 4px grid.
- Tracking tightens as type grows (`display-2xl` −0.04em → `heading-4` −0.01em) and opens slightly below 16px (`caption` +0.01em, `overline` +0.08em uppercase).
- Weights: 600 for display and headings, 500 for labels and buttons, 400 for body. Avoid 700+ except in campaign display type.
- Hero headlines: `display-2xl` on desktop, `display-xl` on tablet, `display-lg` on mobile.
- Running text in `body`, lines near 65 characters. Lead paragraphs in `body-lg`.
- Every number that lines up (prices, metrics, tables) uses the `numeric` styles, which turn on tabular figures.

## Spacing, size and layout

- The scale doubles from 2: **2 · 4 · 8 · 16 · 32 · 64 · 128**, with half-steps **12 · 24 · 48 · 96** between the larger doubles. Use nothing outside `space-*`.
- Inside components: `space-8` between icon and label, `space-12` between label and input, `space-16` between stacked fields.
- Cards pad `space-16` on mobile, `space-24` on desktop. Card grids gap `space-24`.
- Sections: `space-48` apart on mobile, `space-64` on desktop; hero padding `space-96`.
- Grid: 4 columns with 16px gutters below `bp-sm`; 8 columns, 24px gutters from `bp-md`; 12 columns, 32px gutters from `bp-lg`. Content max width 1216px.
- Control heights: `control-sm` 32, `control-md` 40, `control-lg` 48. Mobile primary actions use `control-lg`.

## Shape and depth

- The logo is a disc, so round things are round: buttons, badges, icon buttons and segmented controls use `radius-full`.
- Inputs and images inside cards use `radius-8`. Cards, panels and dialogs use `radius-16`; mobile bottom sheets `radius-24`.
- Borders before shadows. Cards rest on a `line` border; `shadow-md` appears on hover and for menus; `shadow-lg` for dialogs and sheets.

## Imagery

- Real installations over stock: panels on Nigerian rooftops, stations, engineers on site, industrial clients. Natural light, no heavy filters.
- Product photos on plain light backgrounds at 4:3.
- Black-and-white photography with a single Volt element is the campaign treatment.

## Motion

Productive by default. Sarki's interface should feel engineered: quick, exact, and quiet. Motion exists to give feedback, show where something came from, or soften a change that would otherwise jump. It never decorates something people use often.

- **Decide whether it animates at all.** Keyboard actions and things people do dozens of times a day (nav links, table rows, filter chips) get `duration-0` or colour only. Occasional moments (menus, sheets, toasts) get standard motion. Rare moments (the hero, the "Order request sent" check) may be expressive.
- **Durations.** `duration-120` hover and colour, `duration-160` press feedback and toggles, `duration-240` dropdowns, accordion and toasts, `duration-320` modals, drawers and bottom sheets. UI never goes past 320ms. `duration-480` is for marketing moments only, once per visit.
- **Easing.** `ease-out` for anything entering, exiting or responding to a press (the default). `ease-in-out` for things moving on screen. `ease-drawer` for sheets. `ease-hover` for hover colour. `ease-linear` for progress only. Never use ease-in in the UI.
- **Physics.** Press scales to `motion-press-scale` (0.97). Things appear from `motion-enter-scale` (0.95) plus a fade, never from scale 0. Popovers grow from their trigger, modals from the centre. Fade-ins rise by `motion-enter-offset` (8px). Groups stagger by `motion-stagger` (48ms) and never block input.
- **No bounce.** Springs only for drag-to-dismiss on mobile sheets (bounce 0.2 at most).
- **Performance.** Animate transform and opacity only. Hover motion only on devices with a real pointer.
- **Reduced motion.** Movement and scale drop out; fades and colour stay (the tokens switch automatically under `prefers-reduced-motion`).

| Component | Motion |
| --- | --- |
| Button, IconButton, Chip | Hover colour `duration-120` `ease-hover`; press scale 0.97 `duration-160` `ease-out` |
| Switch | Thumb slides `duration-160` `ease-in-out`; track colour `duration-120` |
| Checkbox | Tick fades and scales in from 0.95, `duration-160` `ease-out` |
| SegmentedControl | Selected pill slides between options `duration-240` `ease-in-out` |
| AccordionItem | Body opens `duration-240` `ease-out`; plus icon rotates 45° on the same timing |
| Select menu, popovers | Scale from 0.95 + fade from the trigger, `duration-240` `ease-out`; close `duration-160` |
| ProductCard, ServiceCard, SectorCard | Hover only (pointer devices): border or shadow `duration-120`; arrow nudges 4px `duration-160` |
| Toast | Slides up 8px + fade `duration-240` `ease-out`; interruptible |
| Cart drawer, mobile sheets, modals | `duration-320` `ease-drawer`; modal scales from 0.95 at centre |
| WhatsAppButton | Fades and rises 8px once, after the page settles; no pulse, no bounce |
| Hero (Home) | Eyebrow, headline, lead, actions fade and rise 8px, staggered 48ms, `duration-480` `ease-out`, once per visit |
| UsagePanel bars | Grow from the baseline, staggered 48ms, `duration-480` `ease-out`, first view only |
| Request sent | Check icon scales from 0.95 + fade `duration-480`; nothing else moves |
| SiteHeader, nav links, tables, filters | No motion beyond colour |

## Focus and accessibility

- Every interactive element shows a 2px solid `focus-ring` outline, offset 2px. It is `ink`, so it reads on surfaces and on Volt fills.
- Text meets WCAG 2.2 AA (4.5:1) in both themes; borders that identify controls meet 3:1.
- Touch targets are at least 40px, 48px for primary mobile actions.

## Iconography

- **Phosphor Icons**, regular weight, MIT licence (`@phosphor-icons/core` 2.1.1, or `@phosphor-icons/react` in React apps). The 42 icons in Assets → Icons are the approved set; add more from the same set and weight.
- Phosphor was chosen because it covers the domain (solar panel, battery charging, gas pump, gas can, charging station, plug, wind, factory, hard hat, gauge, flame) and ships six weights from one source.
- Icons draw in `currentColor` on a 256 grid. Sizes: `icon-16`, `icon-20`, `icon-24`, `icon-32`, `icon-48`.
- Business-line icons: Renewables `solar-panel`, Oil & Gas `gas-pump`, Engineering `hard-hat`, Technology `chart-line-up`, Research & Innovation `atom`.

## Logo

- The mark is a lowercase "se" bleeding out of a disc (Assets → Logos; Figma → Brand). The master is vector: `sarki-mark.svg` and `sarki-mark-inverse.svg`.
- In product code, use the `Logo` component. It draws from `logo-mark` (disc) and `logo-on-mark` (letters), so it is black on light surfaces and white in dark mode.
- Three tones: **default** on `surface`; **inverse** on `surface-inverse` (footer, CTA bands); **on photo**, always a white disc, over photography.
- 32px in the header and footer, never below 24px. Keep clear space of a quarter of the mark's width on every side.
- Never recolour it (no Volt disc), outline it, add effects, crop the disc or stretch it.
- Favicon: `favicon.svg` follows the system theme, with `favicon-32.png` and `apple-touch-icon-180.png` as fallbacks.

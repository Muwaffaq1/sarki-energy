# UI research

References from Mobbin that shaped the components. Each one shows a pattern we adopted, not a look to copy.

## Monitoring and dashboards

- [Polestar, charging](https://mobbin.com/screens/3eaedacd-0029-4cb2-a49f-2d82bb7a6117): monochrome UI with one orange accent, huge numerals, −/+ steppers and accent toggles. The closest precedent for Sarki's black, white and Flame. → `Switch`, `StatTile`, `UsagePanel` totals.
- [Octopus Energy, usage](https://mobbin.com/screens/c2ed3983-9a5c-4c5d-a782-ac0be81b4b5d): Day/Week/Month/Year switcher, kWh total above a bar chart, kWh/£ unit toggle. → `UsagePanel`, `SegmentedControl`.
- [Cash App, money flow](https://mobbin.com/screens/2d543e0f-4c65-44d5-8828-a35df58ba902): black ground, one green accent, oversized net figure over simple bars. → numeric type styles.
- [ElevenLabs, analytics](https://mobbin.com/screens/e7f2ccad-19e6-422a-aecc-a2f2b5608d87): KPI tiles that double as chart selectors. → future `StatTile` selectable variant.
- [Vercel, usage](https://mobbin.com/screens/fd0e54a5-45cc-4a47-be0d-3fdb7e804ec7): included-credit meter, Daily/Weekly/Monthly toggle, tooltip breakdown, table with sparklines.
- [Commons, emissions](https://mobbin.com/screens/2d60af5d-85c8-4d1a-bf63-42b2f73a06bc): donut with a centre total and category rows. → energy-mix breakdown for v2.

## Stations and maps

- [Setel, fuel and EV](https://mobbin.com/screens/644fb90f-e6fa-4eff-8307-5c002985b7ec): Fuel / EV chargers / Parking tabs over one map, card carousel with Active / Under maintenance status. An emerging-market fuel app, closest to Sarki's station network. → `StationCard` statuses.
- [Shell Recharge](https://mobbin.com/screens/262f81ef-b0c1-4955-9cd4-0badb52fd129): "Available" status pill, filter chips, connector type and "Available (4/4)". → `StationCard` charger counts.
- [Rivian Adventure Network](https://mobbin.com/screens/baf3d44c-0c7b-403e-8af0-f561aa859971): bottom sheet with max kW, chargers free and a secondary + black primary button pair. → `StationCard` actions.
- [Pangea Charging](https://mobbin.com/screens/c1f5abb0-00fe-421d-824e-9366cf924512) and [Upside](https://mobbin.com/screens/d8884341-371c-4fa1-88bb-da9331a302aa): price-on-pin markers for fuel and charging maps.

## Shop and checkout

- [Klarna, product grid](https://mobbin.com/screens/ab04c0f2-28f4-4b54-9a72-76cdd148428a): badge, rating and an instalment line under the price. Pay-over-time matters for ₦500k+ inverters and batteries.
- [Instacart](https://mobbin.com/screens/6a27f5b9-da65-4db7-9509-9b8a57cabd16): stock status on each card, struck-through price with % off. → `ProductCard` stock badge.
- [lululemon, checkout](https://mobbin.com/flows/0a9a45a0-7b9c-4e1c-b838-faa75bd1e3ed): 4-step progress, completed steps collapse to a summary with Edit, order summary on the right. → `OrderSummary`.
- [Etsy, checkout](https://mobbin.com/flows/6ce72f42-9962-4bae-9b87-f534bdfc8762): payment methods as a radio list, review page with Change links, a submitting state.
- [ZARA, checkout](https://mobbin.com/flows/c8163bf3-f17d-4e1b-9ed9-2f891f732524): strict black-and-white checkout with a sticky total bar and black CTA.
- [H&M, filter drawer](https://mobbin.com/screens/b383b7d6-9141-4a72-90f7-c4eb7594160f): Clear / View [12] footer that shows the result count before applying.

## Lead capture

- [Semrush, project brief](https://mobbin.com/screens/1b8ccdf0-ae44-4507-ad12-1d929dcfa08b): "Step 1/2" modal, paired selects for budget, duration and location. → model for "Start a project".
- [Calendly routing form](https://mobbin.com/screens/4110e784-1731-4975-b637-b6b20379a1c7): brand panel on the left, short qualifying form on the right.
- [Jobber, service request](https://mobbin.com/screens/79fec6e5-9bd9-4452-a9e3-999c7a47688a): preferred site-visit dates and photo upload. Fits site surveys for solar and EPC.

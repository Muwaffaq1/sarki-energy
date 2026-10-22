# Price

A naira amount in tabular figures, with an optional struck-through previous price and unit.

## Use
- Always pass numbers, never pre-formatted strings. `Price` formats with `en-NG` grouping: ₦950,000.
- `compareAt` shows the old price struck through and is announced as "Was ₦620,000".
- `unit` for metered prices: per litre (`L`), per kWh, per kg of LPG.
- Sizes: `sm` in lists, `md` on cards, `lg` on product pages and summaries.

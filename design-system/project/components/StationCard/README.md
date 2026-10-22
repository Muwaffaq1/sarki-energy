# StationCard

A fuel, gas or EV charging station with live status, prices or charger availability, and actions.

## Use
- Bottom sheet over the station map in the app; list view on the website's station finder.
- `kind: 'fuel'` lists `products` with per-litre or per-kg prices. `kind: 'ev'` shows charger availability, max power and price per kWh.
- `status`: `open`, `busy`, `closed`, `maintenance`. Closed and maintenance disable the primary action but keep Directions.
- Use the regulator's product names with plain-language glosses: "PMS (petrol)", "AGO (diesel)".

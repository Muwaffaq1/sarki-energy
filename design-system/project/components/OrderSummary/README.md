# OrderSummary

Cart and checkout summary: line items, subtotal, discount, delivery, VAT and total, with the checkout action.

## Use
- Right column on desktop checkout; sticky bottom sheet on mobile.
- Pass raw numbers. The summary adds lines, applies `discount`, computes VAT at 7.5% (Nigeria's rate, set `vatRate` to change) and formats in naira.
- The CTA is the page's one `accent` button. Name the next step: "Continue to payment", "Place order".
- `note` sits under the CTA for payment reassurance. Name the methods people actually use: card, bank transfer, USSD.

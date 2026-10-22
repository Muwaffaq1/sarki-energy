// FAQ page (Figma Templates → 18 FAQ). Grouped by topic; [confirm] marks facts Sarki must check.
export const faqGroups: { topic: string; title: string; faqs: { q: string; a: string }[] }[] = [
  {
    topic: "Quotes and ordering",
    title: "Getting a price.",
    faqs: [
      { q: "How do I get a quote?", a: "Use Request a quote, or send the same details on WhatsApp. Tell us the product or service, the quantity and the site." },
      { q: "How quickly will you reply?", a: "[confirm: within 1 working day]. An engineer replies by WhatsApp, phone or email, whichever you chose." },
      { q: "Do I pay anything to get a quote?", a: "No. Quotes are free and there’s no obligation until you accept one. Site visits are free for homes." },
      { q: "How do I pay?", a: "[confirm: payment methods and terms]. Payment details come with your confirmed quote." },
    ],
  },
  {
    topic: "Fuel and gas",
    title: "Supply and delivery.",
    faqs: [
      { q: "Where do you deliver?", a: "[confirm: delivery coverage]. We confirm the delivery date with your quote." },
      { q: "What is the minimum order?", a: "[confirm: minimum order volumes for fuel and bulk LPG]." },
      { q: "Can you deliver on a schedule?", a: "Yes. We plan recurring deliveries around your consumption." },
      { q: "Is LNG available?", a: "Not yet. LNG supply is in development." },
    ],
  },
  {
    topic: "Solar and power",
    title: "Systems and installation.",
    faqs: [
      { q: "Do you visit before quoting?", a: "Yes. We log what you run and check the roof or site before we size anything. Visits are free for homes." },
      { q: "How long does an installation take?", a: "A home system takes [confirm: 1–3 days] on site once the design is approved. Larger systems are scheduled with you." },
      { q: "What warranty do I get?", a: "Equipment warranties depend on the manufacturer and are confirmed with your quote. [confirm: workmanship warranty]" },
      { q: "Do you maintain systems you didn’t install?", a: "Yes. We inspect the system first and tell you what to fix." },
    ],
  },
  {
    topic: "About Sarki Energy",
    title: "Who you’re working with.",
    faqs: [
      { q: "Where are you based?", a: "Our office is at 9, Zaria Street, Abuja. [confirm: other offices and service areas]" },
      { q: "Which services are available now?", a: "Fuel and gas supply, solar and power systems, and engineering and EPC. Infrastructure, logistics and technology are in development, and each page says which is which." },
      { q: "Do you work with partners?", a: "Yes, on stations, supply and projects. See Partners." },
    ],
  },
];

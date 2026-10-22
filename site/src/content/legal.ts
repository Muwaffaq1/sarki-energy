// Legal pages (Figma Templates → 19 Policy). DRAFTS: structure and plain-language intent only.
// Sarki's lawyers must review and complete every policy before launch (Nigeria Data Protection Act 2023 applies
// to the personal data the quote and contact forms collect).
export type Policy = { slug: string; title: string; updated: string; intro: string; sections: { title: string; text: string[] }[] };

export const policies: Policy[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    updated: "2026-10-22",
    intro: "How Sarki Energy Limited collects, uses and protects personal data from this website.",
    sections: [
      { title: "What we collect", text: ["When you request a quote, contact us or apply for a role, we collect what you give us: your name, phone number, email, organisation, site location, the details of your request and any file you attach.", "We collect basic technical data, such as pages visited, to keep the site working. [confirm: analytics tools in use]"] },
      { title: "Why we use it", text: ["To reply to your request, prepare quotes, deliver products and services, and keep records the law requires.", "We do not sell your data. [confirm: marketing communications and consent]"] },
      { title: "Who we share it with", text: ["Only with the people and providers who need it to serve you, such as our engineers and delivery partners, and the hosting and email services that run this site. [confirm: list of processors]"] },
      { title: "How long we keep it", text: ["[confirm: retention periods for enquiries, customer records and applications]"] },
      { title: "Your rights", text: ["Under the Nigeria Data Protection Act 2023 you can ask to see, correct or delete your data, or object to how we use it. Email info@sarkienergy.com. [confirm: data protection contact]"] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of use",
    updated: "2026-10-22",
    intro: "The terms for using this website. Quotes, supply and installation have their own terms, confirmed with each quote.",
    sections: [
      { title: "Using the site", text: ["The site gives general information about Sarki Energy’s products and services. It is not an offer; prices, availability and delivery are confirmed in a written quote."] },
      { title: "Accuracy", text: ["We keep the site accurate and say clearly which services are available now and which are in development. If something is wrong, tell us."] },
      { title: "Intellectual property", text: ["The content, logo and design of this site belong to Sarki Energy Limited. [confirm]"] },
      { title: "Liability", text: ["[confirm: limitation of liability wording, to be drafted by counsel]"] },
      { title: "Governing law", text: ["[confirm: governing law and jurisdiction, expected to be the Federal Republic of Nigeria]"] },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie policy",
    updated: "2026-10-22",
    intro: "Which cookies and similar technologies this site uses.",
    sections: [
      { title: "Essential", text: ["The site needs a small amount of browser storage to work, for example to remember a form you’re filling in."] },
      { title: "Analytics", text: ["[confirm: whether analytics cookies are used, which provider, and how consent is collected]"] },
      { title: "Managing cookies", text: ["You can block or delete cookies in your browser settings. Some parts of the site may not work without essential storage."] },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}

// Insights index and articles (Figma Templates → 07 Insights, 08 Article).
// Voice: "Straight answers, no sales pitch." Figures that depend on today's prices are marked [confirm].
export type Block = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  category: string;
  minutes: number;
  date: string;
  title: string;
  excerpt: string;
  image?: { src: string; alt: string };
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "why-inverter-batteries-die",
    category: "Batteries",
    minutes: 4,
    date: "2026-10-12",
    title: "Why your inverter battery dies in a year",
    excerpt: "Batteries rarely fail on their own. They are killed by deep discharge, heat, and a system never sized for its load.",
    image: { src: "/photos/project-commercial-rooftop.jpg", alt: "Solar panels on a rooftop" },
    body: [
      { type: "p", text: "Most batteries that die early were not faulty. They were asked to do more than they were built for, every night, until they gave up." },
      { type: "h2", text: "Deep discharge" },
      { type: "p", text: "Every battery has a depth of discharge it is designed for. Run it flat night after night and its life shortens sharply. Tubular lead-acid batteries suffer most; lithium tolerates deeper cycles but still has limits." },
      { type: "h2", text: "Heat" },
      { type: "p", text: "Batteries kept in a hot room or a sealed cabinet age faster. A cool, ventilated space is one of the cheapest ways to extend battery life." },
      { type: "h2", text: "A system never sized for its load" },
      { type: "p", text: "If the battery bank is too small for what you run in the evening, it is drained every night. If the solar array is too small to refill it, it never fully charges. Both shorten its life." },
      { type: "ul", items: ["Log what you actually run after sunset", "Size the battery so a normal evening uses part of it, not all", "Size the solar so the battery refills on a cloudy day"] },
      { type: "p", text: "If your battery is struggling, an audit of your evening load usually finds the cause before you buy a replacement." },
    ],
  },
  {
    slug: "lithium-vs-tubular",
    category: "Batteries",
    minutes: 5,
    date: "2026-10-05",
    title: "Lithium vs tubular: what the price tag doesn’t tell you",
    excerpt: "Tubular looks cheaper on the invoice. Work out the cost per usable kilowatt-hour over ten years and the picture flips.",
    body: [
      { type: "p", text: "Tubular lead-acid batteries cost less to buy. Lithium batteries cost less to own. The difference is in how much energy you can actually use, and for how long." },
      { type: "h2", text: "Usable capacity" },
      { type: "p", text: "A tubular battery should only be discharged to around half its capacity to last. Lithium can be used much more deeply. So a lithium battery of the same rating gives you more usable energy each night." },
      { type: "h2", text: "Cycle life" },
      { type: "p", text: "Lithium batteries are rated for many more charge cycles than tubular. Over ten years, a tubular bank is often replaced at least once; a lithium bank often is not. [confirm cycle figures per product]" },
      { type: "h2", text: "The arithmetic" },
      { type: "ul", items: ["Price ÷ (usable kWh per cycle × cycles in its life) = cost per usable kWh", "Add replacement batteries and their installation over ten years", "Compare the totals, not the invoices"] },
      { type: "p", text: "Tubular still makes sense for small, light-use systems on a tight budget. For anything you rely on every night, run the numbers first." },
    ],
  },
  {
    slug: "how-many-solar-panels",
    category: "Solar sizing",
    minutes: 4,
    date: "2026-09-28",
    title: "How many panels do you actually need?",
    excerpt: "Panels are sized by energy, not by count. Here is the arithmetic an installer should do before quoting you.",
    image: { src: "/photos/hero-solar-array.jpg", alt: "Rows of solar panels on a green field" },
    body: [
      { type: "p", text: "Ask how many panels you need and a good installer will answer with a question: what do you run, and for how long?" },
      { type: "h2", text: "Start with energy, not panels" },
      { type: "p", text: "List each appliance, its power in watts and the hours it runs each day. Multiply and add them up. That daily total, in kilowatt-hours, is what the system must supply." },
      { type: "h2", text: "Then divide by the sun" },
      { type: "p", text: "Each panel produces its rated power only in full sun. Across a typical day, the useful output is a few hours’ worth. Divide your daily energy by that figure, allow for losses in wiring, inverter and battery, and you have the array size. [confirm local sun-hour figures]" },
      { type: "ul", items: ["Daily energy (kWh) ÷ peak sun hours = array size before losses", "Add a margin for losses and rainy-season output", "Divide by one panel’s rating to get a count"] },
      { type: "p", text: "Two homes with the same floor area can need very different systems. That’s why we log your load before we quote." },
    ],
  },
  {
    slug: "is-band-a-worth-it",
    category: "Tariffs",
    minutes: 4,
    date: "2026-09-20",
    title: "Is Band A worth the money?",
    excerpt: "Twenty hours of grid at a cost-reflective tariff, or a cheaper band plus a generator? The answer is arithmetic.",
    body: [
      { type: "p", text: "Band A customers pay more per unit in return for more hours of supply. Whether that saves money depends on what you would otherwise spend to cover the gaps. [confirm current tariff structure]" },
      { type: "h2", text: "What Band A replaces" },
      { type: "p", text: "Every hour the grid is off, something else carries the load: a generator, a battery, or nothing. Price those hours. Generator hours cost fuel, servicing and wear." },
      { type: "h2", text: "Do the comparison" },
      { type: "ul", items: ["Monthly cost on Band A for your consumption", "Monthly cost on a cheaper band, plus fuel and servicing for the extra generator hours", "Monthly cost on a cheaper band with solar and storage covering the gaps"] },
      { type: "p", text: "For many sites, the cheapest option is a lower band with solar and storage. For some, Band A wins. Your bills and generator log decide it, not a rule of thumb." },
    ],
  },
  {
    slug: "true-cost-of-generators",
    category: "Generators",
    minutes: 4,
    date: "2026-09-12",
    title: "The true cost of your generator",
    excerpt: "Servicing, depreciation and lost hours put most generators at ₦400–700 per kWh. [confirm]",
    body: [
      { type: "p", text: "Fuel is only the visible part. Servicing, depreciation and the hours a breakdown steals all add to what each kilowatt-hour really costs." },
      { type: "h2", text: "What you pay for besides fuel" },
      { type: "ul", items: ["Servicing every few hundred hours: oil, filters, labour", "Depreciation over the engine’s life", "Repairs and downtime when it fails"] },
      { type: "h2", text: "The arithmetic" },
      { type: "p", text: "Add a year of fuel, servicing, repairs and the engine’s cost spread over its life. Divide by the kilowatt-hours it produced in that year. That is your cost per kWh, and it is usually far higher than the fuel bill suggests. [confirm the ₦ range against current prices]" },
      { type: "p", text: "Once you know that number, you can compare it honestly with grid, solar and storage." },
    ],
  },
  {
    slug: "spot-a-bad-solar-installation",
    category: "Installation",
    minutes: 5,
    date: "2026-09-04",
    title: "How to spot a bad solar installation",
    excerpt: "Most solar disappointment is installation shortcuts, not technology. Here is what to look for.",
    body: [
      { type: "p", text: "When a solar system underperforms, the panels are rarely to blame. The shortcuts are usually in the wiring, the protection and the sizing." },
      { type: "h2", text: "Signs of shortcuts" },
      { type: "ul", items: ["Undersized cables that run warm", "No surge protection or earthing", "Unlabelled breakers and a messy board", "Panels shaded for part of the day", "No monitoring, so nobody notices when output drops"] },
      { type: "h2", text: "What a good installation includes" },
      { type: "p", text: "A load survey before the quote, correctly sized cables and protection, a labelled board, a commissioning test, and monitoring you can see on your phone." },
      { type: "p", text: "If your system was installed by someone else and isn’t performing, we can inspect it and tell you what to fix before you replace anything." },
    ],
  },
];

export const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

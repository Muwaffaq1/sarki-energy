// Home page content, matching Figma (Templates → 01 Home, desktop 22:4 / mobile 22:625).
// Shaped like the future CMS collections so it can move into Payload without changing the components.
// Anything marked [confirm] must be checked with Sarki before launch (see design-system/copy/copy-deck.md).
import type { IconName } from "@/components/ui/Icon";
import type { Capability } from "@/components/ui/Status";

export const contact = {
  address: "9, Zaria Street, Abuja 900247",
  phone: "0814 736 3336",
  phoneHref: "tel:+2348147363336",
  email: "info@sarkienergy.com",
  // [confirm] that the main line takes WhatsApp messages.
  whatsappHref: "https://wa.me/2348147363336",
};

export const hero = {
  eyebrow: "Integrated energy for Nigeria",
  title: "Energy you can plan around.",
  lead: "Fuel and gas supply, solar and battery systems, and the engineering that connects them, for homes, businesses, industry and institutions. We measure your site first, build to standard, and stay accountable after handover.",
  // Phones get the shorter lead from the Figma mobile frame (22:625).
  leadShort: "Fuel and gas supply, solar and battery systems, and the engineering that connects them. We measure your site first, build to standard, and stay accountable after handover.",
  primary: { label: "Explore our services", href: "/services" },
  secondary: { label: "Partner with us", href: "/partners" },
  // Placeholder photography (Unsplash/Pexels, see public/photos/CREDITS.md) until Sarki supplies its own.
  slides: [
    { title: "Fuel & gas", text: "Bulk PMS, AGO and LPG supply on a schedule you can plan.", icon: "gas-pump", image: "/photos/hero-fuel-depot.jpg" },
    { title: "Power & renewables", text: "Solar, storage and hybrid systems sized on your load.", icon: "solar-panel", image: "/photos/hero-solar-array.jpg" },
    { title: "Infrastructure", text: "Stations, storage and energy hubs built to standard.", icon: "warehouse", image: "/photos/hero-industrial-plant.jpg" },
    { title: "Engineering & EPC", text: "Design, installation and maintenance by one team.", icon: "hard-hat", image: "/photos/hero-engineering.jpg" },
  ] satisfies { title: string; text: string; icon: IconName; image: string }[],
};

export const audiences: { title: string; text: string; icon: IconName; href: string }[] = [
  { title: "Homeowner", text: "Solar, LPG and backup power", icon: "house", href: "/for/homeowners" },
  { title: "Business", text: "Reliable power and fuel for operations", icon: "storefront", href: "/for/businesses" },
  { title: "Industrial customer", text: "Bulk fuel, gas and large-scale power", icon: "factory", href: "/for/industrial" },
  { title: "Filling station", text: "Supply, equipment and station development", icon: "gas-pump", href: "/for/filling-stations" },
  { title: "Fleet operator", text: "Fuel supply, CNG and EV charging", icon: "truck", href: "/for/fleets" },
  { title: "Institution", text: "Schools, hospitals and public buildings", icon: "graduation-cap", href: "/for/institutions" },
  { title: "Energy company", text: "Bulk supply, infrastructure and services", icon: "building-office", href: "/for/energy-companies" },
  { title: "Government or development partner", text: "Energy access and public infrastructure", icon: "road-horizon", href: "/for/government" },
];

export const whoWeAre = {
  title: "An integrated energy company, built for Nigeria’s real energy problems.",
  body: "Sarki Energy Limited supplies fuel and gas, designs and installs power systems, and builds the infrastructure that connects them. We combine engineering, energy supply and technology so homes, businesses, industry and institutions get energy they can rely on.",
  // [confirm] with Sarki.
  today: [
    "Fuel and LPG supply",
    "Solar, battery and hybrid power systems",
    "Energy audits and advisory",
    "Engineering, installation and maintenance",
    "CNG infrastructure works",
  ],
  image: { src: "/photos/hero-engineering.jpg", alt: "An engineer wiring a rooftop solar array" },
};

// Statuses are [confirm with Sarki before launch].
export const businessLines: {
  title: string;
  status: Capability;
  services: string;
  link: string;
  href: string;
  image?: string;
  icon: IconName;
}[] = [
  { title: "Energy supply & trading", status: "available", services: "PMS · AGO · ATK · Bulk fuel supply · Energy procurement · Commercial and industrial supply", link: "Explore supply & trading", href: "/business/supply-trading", image: "/photos/hero-fuel-depot.jpg", icon: "gas-pump" },
  { title: "Gas", status: "available", services: "LPG · CNG · LNG · Gas distribution · Cylinder solutions · Commercial and industrial gas", link: "Explore gas", href: "/business/gas", image: "/photos/business-gas.jpg", icon: "gas-can" },
  { title: "Power & renewables", status: "available", services: "Solar PV · Battery storage · Hybrid systems · Mini-grids · Embedded power · EV charging", link: "Explore power & renewables", href: "/business/power-renewables", image: "/photos/hero-solar-array.jpg", icon: "solar-panel" },
  { title: "Energy infrastructure", status: "in-development", services: "Filling stations · LPG and CNG facilities · Depots and storage · Energy hubs", link: "Explore infrastructure", href: "/business/infrastructure", image: "/photos/hero-industrial-plant.jpg", icon: "warehouse" },
  { title: "Engineering & EPC", status: "available", services: "Design · EPC · Installation · Commissioning · O&M · Energy audits", link: "Explore engineering", href: "/business/engineering-epc", image: "/photos/hero-engineering.jpg", icon: "hard-hat" },
  { title: "Energy logistics", status: "in-development", services: "Fuel and gas transport · Distribution · Fleet solutions", link: "Explore logistics", href: "/business/logistics", image: "/photos/business-logistics.jpg", icon: "truck" },
  { title: "Energy technology", status: "in-development", services: "Digital platforms · Smart metering · Monitoring · Payments · Analytics", link: "Explore technology", href: "/business/technology", image: "/photos/business-technology.jpg", icon: "chart-line-up" },
];

export const productCategories: {
  title: string;
  text: string;
  icon: IconName;
  href: string;
  link: string;
  products: { name: string; text: string; href: string }[];
}[] = [
  {
    title: "Petroleum products",
    text: "Bulk and scheduled supply",
    icon: "gas-pump",
    href: "/products/petroleum",
    link: "All petroleum products",
    products: [
      { name: "Premium Motor Spirit (PMS)", text: "Petrol for vehicles and generators", href: "/products/petroleum#pms" },
      { name: "Automotive Gas Oil (AGO)", text: "Diesel for fleets, plant and power", href: "/products/petroleum#ago" },
      { name: "Aviation Turbine Fuel (ATK)", text: "For approved aviation customers", href: "/products/petroleum#atk" },
      { name: "Other petroleum products", text: "On request", href: "/products/petroleum" },
    ],
  },
  {
    title: "Gas",
    text: "For homes, kitchens, industry and fleets",
    icon: "gas-can",
    href: "/products/gas",
    link: "All gas products",
    products: [
      { name: "Liquefied petroleum gas (LPG)", text: "Cylinders and bulk supply", href: "/products/gas#lpg" },
      { name: "Compressed natural gas (CNG)", text: "For vehicles and industry", href: "/products/gas#cng" },
      { name: "Liquefied natural gas (LNG)", text: "For large industrial users", href: "/products/gas#lng" },
      { name: "Cylinders and accessories", text: "Refills, exchange, regulators", href: "/products/gas#cylinders" },
    ],
  },
  {
    title: "Power products",
    text: "Equipment we install and supply",
    icon: "solar-panel",
    href: "/products/power",
    link: "All power products",
    products: [
      { name: "Solar panels", text: "Monocrystalline and bifacial modules", href: "/products/power#solar-panels" },
      { name: "Inverters and batteries", text: "Hybrid inverters, lithium storage", href: "/products/power#inverters-batteries" },
      { name: "Energy storage systems", text: "Commercial and industrial BESS", href: "/products/power#storage" },
      { name: "EV charging and electrical", text: "Chargers, cables, protection", href: "/products/power#ev-charging" },
    ],
  },
];

export const industries: { title: string; text: string; icon: IconName; href: string }[] = [
  { title: "Residential", text: "Homes, estates and communities", icon: "house", href: "/industries/residential" },
  { title: "Commercial", text: "Offices, retail and property", icon: "storefront", href: "/industries/commercial" },
  { title: "Industrial", text: "Factories and processing plants", icon: "factory", href: "/industries/industrial" },
  { title: "Hospitality", text: "Hotels and restaurants", icon: "bed", href: "/industries/hospitality" },
  { title: "Education", text: "Schools and universities", icon: "graduation-cap", href: "/industries/education" },
  { title: "Healthcare", text: "Hospitals, clinics, cold chain", icon: "first-aid-kit", href: "/industries/healthcare" },
  { title: "Transport & mobility", text: "Fuel, CNG, EV charging, fleets", icon: "truck", href: "/industries/transport" },
  { title: "Government & public", text: "Agencies and public infrastructure", icon: "road-horizon", href: "/industries/government" },
  { title: "Energy companies", text: "Supply, infrastructure, services", icon: "building-office", href: "/industries/energy-companies" },
];

// Project photos must be Sarki's own work; until they arrive each card briefs the shot. Figures [confirm].
export const projects: { title: string; text: string; location: string; status: "delivered" | "ongoing"; brief: string; href: string; image: string }[] = [
  { title: "Home solar systems", text: "Inverter, battery and rooftop PV for private homes, from board and inverter mounting to commissioning.", location: "Abuja", status: "delivered", brief: "Photo: installer fixing rails on a tiled roof, late afternoon", href: "/projects/home-solar-systems", image: "/photos/project-home-solar.jpg" },
  { title: "Commercial rooftop PV", text: "Multi-array rooftop PV with parallel inverter walls and lithium storage for a site running long hours.", location: "Kano", status: "delivered", brief: "Photo: installer fixing rails on a tiled roof, late afternoon", href: "/projects/commercial-rooftop-pv", image: "/photos/project-commercial-rooftop.jpg" },
  { title: "CNG infrastructure", text: "Civil and pipeline works for compressed natural gas: trenching, pipe laying and station build-out.", location: "Kaduna", status: "ongoing", brief: "Photo: installer fixing rails on a tiled roof, late afternoon", href: "/projects/cng-infrastructure", image: "/photos/project-cng.jpg" },
];

export const station = {
  title: "The Sarki Energy station.",
  body: "We’re designing a station network that puts every fuel a customer needs under one canopy, with the services that make a stop worth it. Each station will have its own page with products, hours and directions.",
  services: [
    { label: "PMS", icon: "gas-pump" },
    { label: "AGO", icon: "gas-pump" },
    { label: "LPG", icon: "gas-can" },
    { label: "CNG", icon: "flame" },
    { label: "EV charging", icon: "charging-station" },
    { label: "Convenience store", icon: "storefront" },
    { label: "Café", icon: "storefront" },
    { label: "Car wash", icon: "drop-half" },
  ] satisfies { label: string; icon: IconName }[],
  image: "/photos/station-concept.jpg", // placeholder until the concept render exists
  brief: "Concept render: a Sarki Energy station at dusk, canopy with PMS, AGO and LPG pumps, CNG and EV bays, shop and café.",
};

export const senergy = {
  title: "Energy services, from one app.",
  body: "SEnergy is the digital platform we’re building so you can order energy, book work and keep track of what you use, without a phone call.",
  features: [
    "Order cooking gas and fuel",
    "Request solar installation, maintenance or an energy audit",
    "Pay energy bills",
    "Monitor consumption and energy assets",
  ],
};

export const sustainability: { title: string; text: string; icon: IconName }[] = [
  { title: "Cleaner cooking", text: "Every LPG cylinder we supply can replace firewood or kerosene in a kitchen.", icon: "flame" },
  { title: "Gas for transport", text: "CNG lowers fuel costs and tailpipe emissions for fleets that switch.", icon: "truck" },
  { title: "Solar before generators", text: "Each solar system we commission takes generator hours off the evening.", icon: "sun" },
  { title: "Efficiency first", text: "Audits find wasted energy before anyone buys new equipment.", icon: "gauge" },
];

export const insights: { meta: string; title: string; excerpt: string; href: string }[] = [
  { meta: "Batteries · 4 min", title: "Why your inverter battery dies in a year", excerpt: "Batteries rarely fail on their own. They are killed by deep discharge, heat, and a system never sized for its load.", href: "/insights/why-inverter-batteries-die" },
  { meta: "Solar sizing · 4 min", title: "How many panels do you actually need?", excerpt: "Panels are sized by energy, not by count. Here is the arithmetic an installer should do before quoting you.", href: "/insights/how-many-solar-panels" },
  { meta: "Generators · 4 min", title: "The true cost of your generator", excerpt: "Servicing, depreciation and lost hours put most generators at ₦400–700 per kWh.", href: "/insights/true-cost-of-generators" },
];

export const footer = {
  brandLine: "Integrated Energy. Built for Progress.",
  blurb: "Fuel and gas supply, solar and battery systems, and the engineering that connects them, for homes, businesses, industry and institutions.",
  columns: [
    {
      title: "Our business",
      links: [
        ["Supply & trading", "/business/supply-trading"],
        ["Gas", "/business/gas"],
        ["Power & renewables", "/business/power-renewables"],
        ["Engineering & EPC", "/business/engineering-epc"],
        ["Energy infrastructure", "/business/infrastructure"],
        ["Energy logistics", "/business/logistics"],
        ["Energy technology", "/business/technology"],
      ],
    },
    {
      title: "Products",
      links: [
        ["Petroleum products", "/products/petroleum"],
        ["LPG", "/products/gas#lpg"],
        ["CNG", "/products/gas#cng"],
        ["LNG", "/products/gas#lng"],
        ["Solar & power", "/products/power"],
        ["Energy storage", "/products/power#storage"],
        ["EV charging", "/products/power#ev-charging"],
      ],
    },
    {
      title: "Industries",
      links: industries.map((i) => [i.title, i.href]),
    },
    {
      title: "Company",
      links: [
        ["About", "/about"],
        ["Leadership", "/about#leadership"],
        ["Sustainability", "/sustainability"],
        ["Careers", "/careers"],
        ["Partners", "/partners"],
      ],
    },
    {
      title: "Help",
      links: [
        ["Contact", "/contact"],
        ["Request a quote", "/quote"],
        ["FAQ", "/faq"],
        ["Find a location", "/locations"],
      ],
    },
  ] as { title: string; links: [string, string][] }[],
  // Placeholders until Sarki confirms its handles.
  social: [
    { label: "in", name: "LinkedIn" },
    { label: "X", name: "X" },
    { label: "IG", name: "Instagram" },
    { label: "f", name: "Facebook" },
    { label: "YT", name: "YouTube" },
  ],
  legal: [
    ["Privacy policy", "/legal/privacy"],
    ["Terms of use", "/legal/terms"],
    ["Cookie policy", "/legal/cookies"],
    ["Sitemap", "/sitemap.xml"],
  ] as [string, string][],
};

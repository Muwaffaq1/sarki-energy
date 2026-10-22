// Business line pages (/business/[line]), matching Figma Templates → 22 Business line.
// Available lines: services, how we deliver, why it matters, questions.
// In-development lines: what we're building, where it stands today, questions, and a way to get involved.
// Never imply assets Sarki doesn't have (PRD §31). [confirm] marks facts Sarki must check before launch.
import type { IconName } from "@/components/ui/Icon";
import type { Capability } from "@/components/ui/Status";

type Item = { title: string; text: string; icon: IconName };
type Step = { kicker: string; title: string; text: string };
type Point = { title: string; text: string };
type Faq = { q: string; a: string };

export type BusinessLine = {
  slug: string;
  title: string;
  status: Capability;
  hero: { title: string; lead: string };
  servicesTitle: string;
  services: Item[];
  stages?: { title: string; steps: Step[] };
  why?: { title: string; points: Point[] };
  today?: { now: string; next: string };
  faqs: Faq[];
  cta: { title: string; text: string; primary: { label: string; href: string } };
};

// The one-team lifecycle from the About page, used where a line has no stages of its own.
const lifecycle: Step[] = [
  { kicker: "Study", title: "Audits and feasibility", text: "Load studies, site surveys and the business case." },
  { kicker: "Design", title: "Engineering and specification", text: "Drawings, equipment schedules and approvals." },
  { kicker: "Build", title: "Procurement and construction", text: "Sourcing, civil works, installation, commissioning." },
  { kicker: "Operate", title: "Monitoring and maintenance", text: "Remote monitoring, service visits, performance reports." },
];

const quote = { label: "Request a quote", href: "/quote" };
const partner = { label: "Partner with us", href: "/partners" };

export const businessLinePages: BusinessLine[] = [
  {
    slug: "supply-trading",
    title: "Energy supply & trading",
    status: "available",
    hero: {
      title: "Fuel that arrives on the day you planned.",
      lead: "Bulk PMS, AGO and ATK for fleets, plants, generators and stations, delivered on a schedule you set and priced before you commit.",
    },
    servicesTitle: "What we supply.",
    services: [
      { title: "PMS (petrol)", text: "Bulk petrol for fleets, stations and standby generators.", icon: "gas-pump" },
      { title: "AGO (diesel)", text: "Diesel for plant, trucks and power generation, by the tanker load.", icon: "gas-pump" },
      { title: "ATK", text: "Aviation turbine fuel for approved aviation customers.", icon: "gas-can" },
      { title: "Scheduled deliveries", text: "Weekly or monthly drops planned around your consumption, so tanks don’t run dry.", icon: "truck" },
      { title: "Energy procurement", text: "We source and price fuel for multi-site operations and report what went where.", icon: "receipt" },
      { title: "Commercial and industrial supply", text: "Contract supply for factories, estates, hospitals and construction sites.", icon: "factory" },
    ],
    stages: {
      title: "From order to delivery note.",
      steps: [
        { kicker: "Request", title: "Product, quantity, site", text: "Tell us what you need, how much and where it goes." },
        { kicker: "Confirm", title: "Price and date agreed", text: "You see price, quantity and delivery date before anything moves." },
        { kicker: "Deliver", title: "On the agreed day", text: "Delivered to your tanks or site, with quantities checked on arrival." },
        { kicker: "Record", title: "Paperwork you can file", text: "A delivery note for every drop, ready for your accounts." },
      ],
    },
    why: {
      title: "Fuel stops being the thing you chase.",
      points: [
        { title: "No dry tanks", text: "Deliveries are planned from your actual burn rate, not guesswork." },
        { title: "One price, agreed first", text: "No surprises between the quote and the invoice." },
        { title: "A record of every drop", text: "Quantities and delivery notes for every site you run." },
      ],
    },
    faqs: [
      { q: "What is the minimum order?", a: "[confirm: minimum order volume]. Tell us the product, quantity and delivery point and we confirm price and availability." },
      { q: "Where do you deliver?", a: "[confirm: delivery coverage]. We confirm the delivery date with your quote." },
      { q: "Can you deliver on a fixed schedule?", a: "Yes. We plan recurring deliveries around your consumption and adjust them as it changes." },
    ],
    cta: { title: "Tell us what you burn in a month.", text: "Send the product, the volume and the site. We come back with a price and a delivery plan.", primary: quote },
  },
  {
    slug: "gas",
    title: "Gas",
    status: "available",
    hero: {
      title: "Gas for the kitchen, the plant and the fleet.",
      lead: "LPG cylinders and bulk supply for homes and businesses, and CNG for vehicles and industry. LNG for large industrial users is in development.",
    },
    servicesTitle: "What we supply.",
    services: [
      { title: "LPG cylinders", text: "Refills and exchange for homes, restaurants and hotels.", icon: "gas-can" },
      { title: "Bulk LPG", text: "Bulk supply for kitchens, factories and estates with their own storage.", icon: "factory" },
      { title: "CNG", text: "Compressed natural gas for converted vehicles and industrial users.", icon: "truck" },
      { title: "LNG", text: "In development, for large industrial loads. Tell us yours and we’ll keep you updated.", icon: "flame" },
      { title: "Gas distribution", text: "From storage to the point of use, planned around your demand.", icon: "road-horizon" },
      { title: "Cylinders and accessories", text: "Cylinders, regulators and hoses that meet safety standards.", icon: "shield-check" },
    ],
    stages: { title: "One partner from first study to long-term operation.", steps: lifecycle },
    why: {
      title: "Cleaner fuel, used safely.",
      points: [
        { title: "Cleaner cooking", text: "LPG replaces firewood and kerosene: faster, cleaner, indoors and out." },
        { title: "Lower running costs", text: "CNG usually costs less to run than petrol or diesel for fleets that convert. [confirm]" },
        { title: "Safe by default", text: "Certified cylinders, leak checks and regulators fitted to standard." },
      ],
    },
    faqs: [
      { q: "Do you deliver cylinders to homes?", a: "[confirm: home delivery areas]. Businesses can arrange scheduled refills." },
      { q: "Is LNG available now?", a: "Not yet. LNG supply is in development. Tell us your load and we’ll keep you updated." },
      { q: "Can you help us switch vehicles to CNG?", a: "[confirm: whether Sarki converts vehicles or works with partners]. We supply the gas and can plan refuelling around your routes." },
    ],
    cta: { title: "Tell us how much gas you use.", text: "Cylinders, bulk or CNG: send the site and the volume and we confirm price and delivery.", primary: quote },
  },
  {
    slug: "power-renewables",
    title: "Power & renewables",
    status: "available",
    hero: {
      title: "Sun by day. Battery by night.",
      lead: "From a single home system to a mini-grid or a utility-scale array: solar designed around the load you actually run, and installed to last.",
    },
    servicesTitle: "Six ways we put solar to work.",
    services: [
      { title: "Solar home systems", text: "Compact kits with battery backup for homes and small businesses.", icon: "house" },
      { title: "Solar street lights", text: "Standalone lighting for streets and estates, dusk to dawn.", icon: "lamp" },
      { title: "Utility-scale solar", text: "Ground-mounted arrays for industrial sites and grid supply.", icon: "factory" },
      { title: "Solar mini-grids", text: "Generation and distribution for off-grid communities and estates.", icon: "users-three" },
      { title: "Battery storage & hybrids", text: "BESS and hybrid solar-generator-grid systems sized on measured load.", icon: "battery-charging" },
      { title: "Solar thermal water heaters", text: "Hot water from the sun for homes, hotels and hospitals.", icon: "drop-half" },
    ],
    stages: {
      title: "Four stages, one accountable team.",
      steps: [
        { kicker: "Survey", title: "Roof, load and shading", text: "We log what you draw across a day and check orientation, pitch and shading before quoting." },
        { kicker: "Design", title: "Sized on your day", text: "Array, inverter and battery matched to your evening peak and outage tolerance." },
        { kicker: "Install", title: "Mounting, wiring, protection", text: "Certified mounting, correct cable sizing, surge and earth protection, a labelled board." },
        { kicker: "Handover", title: "Commissioning and training", text: "Performance test, monitoring on your phone, and a walkthrough for the household." },
      ],
    },
    why: {
      title: "The difference shows up after sunset.",
      points: [
        { title: "Quiet nights", text: "No generator noise or fumes. The battery carries the evening." },
        { title: "A bill you can plan", text: "Fuel and tariff swings stop driving your monthly spend." },
        { title: "Cleaner by default", text: "Every kWh from the roof is one the generator didn’t burn." },
      ],
    },
    faqs: [
      { q: "How long does an installation take?", a: "A home system takes [confirm: 1–3 days] on site once the design is approved. Commercial systems are scheduled with you." },
      { q: "What happens when it’s cloudy?", a: "The battery and grid or generator cover the gap. We size for rainy-season output, not brochure figures." },
      { q: "Do you maintain the system?", a: "Yes. Monitoring is set up at handover and maintenance visits can be scheduled." },
    ],
    cta: { title: "Book a site survey. Free for homes.", text: "Send your last electricity bill and what you spend on generator fuel. We size the system on your real load.", primary: { label: "Book a site survey", href: "/quote?service=solar" } },
  },
  {
    slug: "engineering-epc",
    title: "Engineering & EPC",
    status: "available",
    hero: {
      title: "Designed, built and run by one team.",
      lead: "Engineering, procurement and construction for energy projects, from the first site study to years of maintenance, so nothing falls between contractors.",
    },
    servicesTitle: "What we take on.",
    services: [
      { title: "Design and engineering", text: "Load studies, drawings, equipment schedules and approvals.", icon: "wrench" },
      { title: "EPC delivery", text: "Procurement and construction managed as one contract.", icon: "hard-hat" },
      { title: "Electrical installation", text: "Boards, cabling and protection installed and labelled to standard.", icon: "plug" },
      { title: "Commissioning", text: "Testing and handover with documentation you can audit.", icon: "check-circle" },
      { title: "Operations and maintenance", text: "Scheduled service, remote monitoring and fault response.", icon: "shield-check" },
      { title: "Energy audits", text: "We find wasted energy before anyone buys new equipment.", icon: "gauge" },
    ],
    stages: { title: "One partner from first study to long-term operation.", steps: lifecycle },
    why: {
      title: "One contract. One team answering for it.",
      points: [
        { title: "Nothing falls between trades", text: "Design, supply and build sit with the same engineers." },
        { title: "Documented work", text: "Drawings, test results and handover packs for every job." },
        { title: "Here after handover", text: "Maintenance and monitoring from the team that built it." },
      ],
    },
    faqs: [
      { q: "Do you build projects designed by others?", a: "Yes. We review the design first and flag anything we would change before we build." },
      { q: "Do you offer maintenance contracts?", a: "Yes. [confirm: contract terms and response times]." },
      { q: "What size of project do you take on?", a: "From single buildings to industrial sites. [confirm: largest project to date]." },
    ],
    cta: { title: "Tell us what you are building.", text: "Send the site, the drawings if you have them, and your timeline. An engineer replies with next steps.", primary: { label: "Start a project", href: "/quote" } },
  },
  {
    slug: "infrastructure",
    title: "Energy infrastructure",
    status: "in-development",
    hero: {
      title: "Stations, depots and energy hubs, in development.",
      lead: "We’re developing filling stations, LPG and CNG facilities, depots and storage, and energy hubs. Here is what exists today and how to get involved.",
    },
    servicesTitle: "What we’re building.",
    services: [
      { title: "Filling stations", text: "Stations with PMS, AGO, LPG, CNG and EV charging under one canopy.", icon: "gas-pump" },
      { title: "LPG and CNG facilities", text: "Storage and dispensing for cooking gas and compressed natural gas.", icon: "gas-can" },
      { title: "Depots and storage", text: "Bulk storage that shortens the distance between supply and customer.", icon: "warehouse" },
      { title: "Energy hubs", text: "Sites that combine fuel, gas, power and services in one place.", icon: "building-office" },
    ],
    today: {
      now: "Our engineering team delivers civil and pipeline works for CNG infrastructure, including an ongoing project in Kaduna. [confirm]",
      next: "The first Sarki Energy stations and facilities. Each will get its own page, with products, hours and directions, when it opens.",
    },
    faqs: [
      { q: "Can I visit a Sarki Energy station?", a: "Not yet. The station network is in development; each station will get its own page when it opens." },
      { q: "Can you build infrastructure for us?", a: "Yes, through Engineering & EPC. We already deliver CNG civil and pipeline works. [confirm]" },
      { q: "How do I partner on a station?", a: "Tell us about the site or the investment you have in mind and we’ll set up a conversation." },
    ],
    cta: { title: "Have a site or a stake in one?", text: "Landowners, investors and operators: tell us what you have in mind.", primary: { label: "Partner on a station", href: "/partners?interest=station" } },
  },
  {
    slug: "logistics",
    title: "Energy logistics",
    status: "in-development",
    hero: {
      title: "Fuel and gas, moved safely. In development.",
      lead: "We’re building a logistics arm for fuel and gas transport, distribution and fleet solutions. Today, deliveries run through our supply business.",
    },
    servicesTitle: "What we’re building.",
    services: [
      { title: "Fuel and gas transport", text: "Tankers and trucks for PMS, AGO, LPG and CNG, run to safety standards.", icon: "truck" },
      { title: "Distribution", text: "Planned routes from depot to customer, tracked from loading to delivery.", icon: "road-horizon" },
      { title: "Fleet solutions", text: "Fuelling and energy planning for companies that run their own fleets.", icon: "gauge" },
    ],
    today: {
      now: "Fuel deliveries for supply customers are scheduled through Energy supply & trading. [confirm how transport is handled today]",
      next: "A dedicated logistics fleet and tracked distribution for fuel and gas customers.",
    },
    faqs: [
      { q: "Can you deliver fuel to my site today?", a: "Yes, through Energy supply & trading. Request a quote with the product, quantity and delivery point." },
      { q: "Do you offer haulage for other companies’ products?", a: "Not yet. Tell us what you move and we’ll keep you updated as the logistics business opens." },
    ],
    cta: { title: "Moving fuel or gas at scale?", text: "Tell us your volumes and routes. We’ll talk about supply today and logistics as it opens.", primary: partner },
  },
  {
    slug: "technology",
    title: "Energy technology",
    status: "in-development",
    hero: {
      title: "Energy you can see and manage. In development.",
      lead: "Smart metering, monitoring, digital payments and analytics, brought together in SEnergy, the platform we’re building.",
    },
    servicesTitle: "What we’re building.",
    services: [
      { title: "SEnergy platform", text: "Order energy, book work and track what you use, from one app.", icon: "chart-line-up" },
      { title: "Smart metering", text: "Meters that report consumption without a site visit.", icon: "gauge" },
      { title: "Monitoring", text: "Live views of solar, battery and generator performance.", icon: "chart-line-up" },
      { title: "Digital payments", text: "Pay for fuel, gas and energy bills online.", icon: "receipt" },
      { title: "Analytics", text: "Reports that show where energy and money go across your sites.", icon: "chart-line-up" },
    ],
    today: {
      now: "Solar systems we install include monitoring at handover, so you can see generation and battery levels on your phone. [confirm]",
      next: "SEnergy: one app for ordering energy, booking work, paying bills and tracking consumption.",
    },
    faqs: [
      { q: "When will SEnergy be available?", a: "[confirm: launch timing]. Get early access and we’ll tell you when it opens." },
      { q: "Can I monitor my solar system today?", a: "Yes. Systems we install include monitoring at handover. [confirm]" },
    ],
    cta: { title: "Want SEnergy first?", text: "Get early access and help shape what it does.", primary: { label: "Get early access", href: "/senergy#early-access" } },
  },
];

export function getBusinessLine(slug: string) {
  return businessLinePages.find((l) => l.slug === slug);
}

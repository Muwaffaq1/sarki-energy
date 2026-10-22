// Industries (/industries, /industries/[slug]) and "I am a…" audiences (/for/[audience]).
// Index follows Figma Templates → 04 Who we serve; detail pages are composed from the design system.
// [confirm] marks claims Sarki must check before launch.
import type { IconName } from "@/components/ui/Icon";

/** Things a segment page can point people to. */
export const offerings = {
  fuel: { title: "Fuel supply", text: "PMS, AGO and ATK in bulk, on a schedule you set.", icon: "gas-pump", href: "/business/supply-trading" },
  gas: { title: "LPG and CNG", text: "Cylinders, bulk LPG and CNG for vehicles and industry.", icon: "gas-can", href: "/business/gas" },
  solar: { title: "Solar and storage", text: "Solar, batteries and hybrid systems sized on your load.", icon: "solar-panel", href: "/business/power-renewables" },
  epc: { title: "Engineering & EPC", text: "Design, installation, commissioning and maintenance.", icon: "hard-hat", href: "/business/engineering-epc" },
  audit: { title: "Energy audit", text: "Find wasted energy before you buy anything new.", icon: "gauge", href: "/quote?service=audit" },
  stations: { title: "Station development", text: "Partner on a Sarki Energy station. In development.", icon: "warehouse", href: "/stations" },
  ev: { title: "EV charging", text: "Chargers and electrical work. In development.", icon: "charging-station", href: "/products/power#ev-charging" },
  products: { title: "Equipment supply", text: "Panels, inverters, batteries and storage, quoted to spec.", icon: "storefront", href: "/products/power" },
} satisfies Record<string, { title: string; text: string; icon: IconName; href: string }>;

export type OfferingKey = keyof typeof offerings;

export type Segment = {
  slug: string;
  title: string;
  text: string;
  icon: IconName;
  hero: { title: string; lead: string };
  needs: { title: string; text: string }[];
  offer: OfferingKey[];
};

export const industries: Segment[] = [
  {
    slug: "residential",
    title: "Residential",
    text: "Homes, estates and communities",
    icon: "house",
    hero: { title: "Quiet evenings, a bill you can plan.", lead: "Solar and battery systems sized on what your home actually runs, cooking gas delivered, and estate-wide power for developers and residents’ associations." },
    needs: [
      { title: "Power after sunset", text: "The evening peak is when outages hurt. We size the battery for it." },
      { title: "Less generator", text: "Fewer generator hours means less fuel, noise and servicing." },
      { title: "Cleaner cooking", text: "LPG replaces firewood and kerosene in the kitchen." },
    ],
    offer: ["solar", "gas", "audit"],
  },
  {
    slug: "commercial",
    title: "Commercial",
    text: "Offices, retail and property",
    icon: "storefront",
    hero: { title: "Keep the lights on and the tills running.", lead: "Hybrid power for offices, shops and malls, fuel on schedule for the generator you still need, and audits that find where the money goes." },
    needs: [
      { title: "No downtime in opening hours", text: "Storage carries the load through outages without a gap." },
      { title: "Predictable running costs", text: "Solar first, generator last, fuel delivered before it runs out." },
      { title: "One accountable partner", text: "Design, supply and maintenance from the same team." },
    ],
    offer: ["solar", "fuel", "audit", "epc"],
  },
  {
    slug: "industrial",
    title: "Industrial",
    text: "Factories and processing plants",
    icon: "factory",
    hero: { title: "Power for heavy motors and long shifts.", lead: "Bulk diesel and gas on schedule, captive and hybrid power, and engineering that keeps production lines running." },
    needs: [
      { title: "Fuel that never runs dry", text: "Deliveries planned from your actual burn rate." },
      { title: "Cheaper energy per unit", text: "Gas and solar take load off diesel where the numbers work." },
      { title: "Maintenance that prevents stoppages", text: "Scheduled service and monitoring, not call-outs after failure." },
    ],
    offer: ["fuel", "gas", "solar", "epc"],
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    text: "Hotels and restaurants",
    icon: "bed",
    hero: { title: "Guests notice when the power goes. Make sure it doesn’t.", lead: "Solar and storage for rooms and kitchens, LPG for cooking, and fuel for the generator you keep as backup." },
    needs: [
      { title: "Silent nights for guests", text: "Batteries carry rooms through the night without a generator hum." },
      { title: "Kitchens that keep cooking", text: "Bulk LPG and cylinder refills on schedule." },
      { title: "Hot water from the sun", text: "Solar water heaters cut a large share of the energy bill. [confirm]" },
    ],
    offer: ["solar", "gas", "fuel"],
  },
  {
    slug: "education",
    title: "Education",
    text: "Schools and universities",
    icon: "graduation-cap",
    hero: { title: "Classrooms, labs and hostels that stay powered.", lead: "Solar and storage for campuses, energy audits that stretch tight budgets, and cooking gas for hostels and kitchens." },
    needs: [
      { title: "Power through the school day", text: "Daytime load matches solar output well." },
      { title: "Budgets that hold", text: "Lower fuel spend frees money for teaching." },
      { title: "Safe kitchens", text: "LPG installed and maintained to standard." },
    ],
    offer: ["solar", "audit", "gas"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    text: "Hospitals, clinics, cold chain",
    icon: "first-aid-kit",
    hero: { title: "A hospital can’t lose its cold chain.", lead: "Uninterrupted power for wards, theatres and vaccine fridges, with fuel and maintenance planned so backup is always ready." },
    needs: [
      { title: "Zero-gap backup", text: "Storage switches over before equipment notices." },
      { title: "Cold chain protected", text: "Fridges and freezers on circuits sized for them." },
      { title: "Backup that’s ready", text: "Generators fuelled and serviced on a schedule." },
    ],
    offer: ["solar", "fuel", "epc"],
  },
  {
    slug: "transport",
    title: "Transport & mobility",
    text: "Fuel, CNG, EV charging, fleets",
    icon: "truck",
    hero: { title: "Keep fleets moving and fuel costs down.", lead: "Bulk diesel and petrol for fleets, CNG for vehicles that switch, and EV charging in development." },
    needs: [
      { title: "Fuel where your vehicles are", text: "Deliveries to depots on a schedule." },
      { title: "Lower cost per kilometre", text: "CNG usually runs cheaper than petrol or diesel. [confirm]" },
      { title: "Ready for electric", text: "EV charging is in development; tell us your plans." },
    ],
    offer: ["fuel", "gas", "ev"],
  },
  {
    slug: "government",
    title: "Government & public",
    text: "Agencies and public infrastructure",
    icon: "road-horizon",
    hero: { title: "Energy access for public buildings and communities.", lead: "Solar street lighting, mini-grids, power for public buildings, and engineering delivered to documented standards." },
    needs: [
      { title: "Documented delivery", text: "Drawings, test results and handover packs for every site." },
      { title: "Systems that last", text: "Sized for real load and maintained after handover." },
      { title: "Access where the grid isn’t", text: "Mini-grids and standalone lighting for underserved areas." },
    ],
    offer: ["solar", "epc", "audit"],
  },
  {
    slug: "energy-companies",
    title: "Energy companies",
    text: "Supply, infrastructure, services",
    icon: "building-office",
    hero: { title: "A partner across the energy value chain.", lead: "Bulk supply, engineering and infrastructure work for operators, distributors and developers." },
    needs: [
      { title: "Reliable bulk supply", text: "Products sourced and delivered to agreed volumes." },
      { title: "Engineering capacity", text: "EPC and civil works, including CNG infrastructure. [confirm]" },
      { title: "Station partnerships", text: "We’re developing a station network and looking for partners." },
    ],
    offer: ["fuel", "gas", "epc", "stations"],
  },
];

export const audiences: Segment[] = [
  {
    slug: "homeowners",
    title: "Homeowner",
    text: "Solar, LPG and backup power",
    icon: "house",
    hero: { title: "Power and cooking gas for your home.", lead: "Solar and batteries sized on what you run, and LPG delivered. Site visits are free for homes." },
    needs: industries[0].needs,
    offer: ["solar", "gas", "audit"],
  },
  {
    slug: "businesses",
    title: "Business",
    text: "Reliable power and fuel for operations",
    icon: "storefront",
    hero: { title: "Energy that doesn’t interrupt business.", lead: "Hybrid power, fuel on schedule and audits that cut running costs, from one accountable team." },
    needs: industries[1].needs,
    offer: ["solar", "fuel", "audit", "epc"],
  },
  {
    slug: "industrial",
    title: "Industrial customer",
    text: "Bulk fuel, gas and large-scale power",
    icon: "factory",
    hero: industries[2].hero,
    needs: industries[2].needs,
    offer: ["fuel", "gas", "solar", "epc"],
  },
  {
    slug: "filling-stations",
    title: "Filling station",
    text: "Supply, equipment and station development",
    icon: "gas-pump",
    hero: { title: "Supply for your station, and a network to join.", lead: "PMS, AGO and LPG supply for independent stations, and partnership on the Sarki Energy station network, which is in development." },
    needs: [
      { title: "Product on time", text: "Deliveries planned around your sales, not ours." },
      { title: "More to sell", text: "LPG, CNG and EV charging can add revenue per site. [confirm]" },
      { title: "A network to grow with", text: "The Sarki Energy station network is in development." },
    ],
    offer: ["fuel", "gas", "stations"],
  },
  {
    slug: "fleets",
    title: "Fleet operator",
    text: "Fuel supply, CNG and EV charging",
    icon: "truck",
    hero: industries[6].hero,
    needs: industries[6].needs,
    offer: ["fuel", "gas", "ev"],
  },
  {
    slug: "institutions",
    title: "Institution",
    text: "Schools, hospitals and public buildings",
    icon: "graduation-cap",
    hero: { title: "Power that institutions can rely on.", lead: "Schools, hospitals and public buildings: solar and storage, backup that’s ready, and maintenance after handover." },
    needs: [
      { title: "No gaps for critical loads", text: "Storage carries labs, wards and servers through outages." },
      { title: "Budgets that hold", text: "Lower fuel spend, planned maintenance." },
      { title: "Documented work", text: "Handover packs for every installation." },
    ],
    offer: ["solar", "epc", "audit", "fuel"],
  },
  {
    slug: "energy-companies",
    title: "Energy company",
    text: "Bulk supply, infrastructure and services",
    icon: "building-office",
    hero: industries[8].hero,
    needs: industries[8].needs,
    offer: ["fuel", "gas", "epc", "stations"],
  },
  {
    slug: "government",
    title: "Government or development partner",
    text: "Energy access and public infrastructure",
    icon: "road-horizon",
    hero: industries[7].hero,
    needs: industries[7].needs,
    offer: ["solar", "epc", "audit"],
  },
];

// Figma 04 groups the index into two bands.
export const industryGroups = [
  { title: "Industry, infrastructure and government", lead: "Large loads, long hours, zero tolerance for downtime.", slugs: ["industrial", "healthcare", "education", "government", "transport", "energy-companies"] },
  { title: "Homes, businesses and hospitality", lead: "Reliable evenings, lower bills, less generator.", slugs: ["residential", "commercial", "hospitality"] },
];

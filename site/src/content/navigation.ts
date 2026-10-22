// Header navigation and mega menus, matching Figma (Organisms → MegaMenu 73:836, SiteHeader Menu open 74:714 / 74:827).
// Statuses are [confirm with Sarki before launch].
import type { Capability } from "@/components/ui/Status";

export type MenuItem = { title: string; text?: string; href: string; status?: Capability };
export type MenuColumn = { heading?: string; items: MenuItem[] };

export type Menu = {
  id: string;
  label: string;
  href: string;
  intro: { overline: string; title: string; lead: string; links: { label: string; href: string }[] };
  columns: MenuColumn[];
  feature?: { overline: string; title: string; body: string; link: { label: string; href: string } };
};

export const menus: Menu[] = [
  {
    id: "about",
    label: "About",
    href: "/about",
    intro: {
      overline: "About",
      title: "Who we are and how we work.",
      lead: "The company, the people and the standards behind every installation.",
      links: [{ label: "About Sarki Energy", href: "/about" }],
    },
    columns: [
      {
        heading: "Company",
        items: [
          { title: "Who we are", text: "An integrated energy company built for Nigeria.", href: "/about#who-we-are" },
          { title: "Our story", text: "How we started and where we are going.", href: "/about#who-we-are" },
          { title: "Vision & mission", text: "What we are building, and why.", href: "/about#vision" },
          { title: "Our approach", text: "Measure first, build to standard, stay accountable.", href: "/about#approach" },
          { title: "Capabilities", text: "What we deliver today and what is in development.", href: "/about#lifecycle" },
        ],
      },
      {
        heading: "People & impact",
        items: [
          { title: "Leadership", text: "The people accountable for delivery.", href: "/about#leadership" },
          { title: "Sustainability", text: "Cleaner cooking, gas for transport, solar first.", href: "/sustainability" },
          { title: "Careers", text: "Open roles in engineering, operations and supply.", href: "/careers" },
          { title: "Partners", text: "Work with us on stations, supply and projects.", href: "/partners" },
        ],
      },
    ],
    feature: {
      overline: "Sarki Energy",
      title: "Integrated Energy. Built for Progress.",
      body: "Fuel, gas, power and the engineering that connects them, for homes, businesses, industry and institutions.",
      link: { label: "Learn about us", href: "/about" },
    },
  },
  {
    id: "business",
    label: "Our business",
    href: "/business",
    intro: {
      overline: "Our business",
      title: "Seven businesses across the energy value chain.",
      lead: "Some run today; others are being built. Every line is labelled, so you know which is which.",
      links: [
        { label: "All of our business", href: "/business" },
        { label: "Services directory", href: "/services" },
      ],
    },
    columns: [
      {
        items: [
          { title: "Energy supply & trading", text: "PMS, AGO and ATK, bulk and on schedule.", href: "/business/supply-trading", status: "available" },
          { title: "Gas", text: "LPG, CNG and LNG for homes, industry and fleets.", href: "/business/gas", status: "available" },
          { title: "Power & renewables", text: "Solar, storage and hybrid systems sized on your load.", href: "/business/power-renewables", status: "available" },
          { title: "Engineering & EPC", text: "Design, installation, commissioning and O&M.", href: "/business/engineering-epc", status: "available" },
        ],
      },
      {
        items: [
          { title: "Energy infrastructure", text: "Stations, depots and energy hubs built to standard.", href: "/business/infrastructure", status: "in-development" },
          { title: "Energy logistics", text: "Fuel and gas transport, distribution and fleets.", href: "/business/logistics", status: "in-development" },
          { title: "Energy technology", text: "Smart metering, monitoring and digital payments.", href: "/business/technology", status: "in-development" },
        ],
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    href: "/products",
    intro: {
      overline: "Products",
      title: "Fuel, gas and power equipment, supplied to specification.",
      lead: "Tell us the product, quantity and delivery point. We confirm price and delivery before you commit.",
      links: [
        { label: "All products", href: "/products" },
        { label: "Request a quote", href: "/quote" },
      ],
    },
    columns: [
      {
        heading: "Petroleum",
        items: [
          { title: "Premium Motor Spirit (PMS)", text: "Petrol for vehicles and generators.", href: "/products/petroleum#pms" },
          { title: "Automotive Gas Oil (AGO)", text: "Diesel for fleets, plant and power.", href: "/products/petroleum#ago" },
          { title: "Aviation Turbine Fuel (ATK)", text: "For approved aviation customers.", href: "/products/petroleum#atk" },
        ],
      },
      {
        heading: "Gas",
        items: [
          { title: "LPG", text: "Cylinders, refills and bulk supply.", href: "/products/gas#lpg" },
          { title: "CNG", text: "For vehicles and industry.", href: "/products/gas#cng" },
          { title: "LNG", text: "For large industrial users.", href: "/products/gas#lng", status: "in-development" },
        ],
      },
      {
        heading: "Power",
        items: [
          { title: "Solar & power", text: "Panels, inverters and hybrid systems.", href: "/products/power" },
          { title: "Energy storage", text: "Lithium batteries and commercial BESS.", href: "/products/power#storage" },
          { title: "EV charging", text: "Chargers, cables and protection.", href: "/products/power#ev-charging", status: "in-development" },
        ],
      },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    href: "/industries",
    intro: {
      overline: "Industries",
      title: "Every sector draws power differently.",
      lead: "Find the products and services that fit your site and your load.",
      links: [{ label: "All industries", href: "/industries" }],
    },
    columns: [
      {
        heading: "Industries",
        items: [
          { title: "Residential", text: "Homes, estates and communities.", href: "/industries/residential" },
          { title: "Commercial", text: "Offices, retail and property.", href: "/industries/commercial" },
          { title: "Industrial", text: "Factories and processing plants.", href: "/industries/industrial" },
          { title: "Hospitality", text: "Hotels and restaurants.", href: "/industries/hospitality" },
          { title: "Education", text: "Schools and universities.", href: "/industries/education" },
        ],
      },
      {
        items: [
          { title: "Healthcare", text: "Hospitals, clinics, cold chain.", href: "/industries/healthcare" },
          { title: "Transport & mobility", text: "Fuel, CNG, EV charging, fleets.", href: "/industries/transport" },
          { title: "Government & public", text: "Agencies and public infrastructure.", href: "/industries/government" },
          { title: "Energy companies", text: "Supply, infrastructure, services.", href: "/industries/energy-companies" },
        ],
      },
      {
        heading: "I am a…",
        items: [
          { title: "Homeowner", href: "/for/homeowners" },
          { title: "Business", href: "/for/businesses" },
          { title: "Industrial customer", href: "/for/industrial" },
          { title: "Filling station", href: "/for/filling-stations" },
          { title: "Fleet operator", href: "/for/fleets" },
          { title: "Institution", href: "/for/institutions" },
          { title: "Energy company", href: "/for/energy-companies" },
          { title: "Government / development organisation", href: "/for/government" },
        ],
      },
    ],
  },
];

export const plainLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
];

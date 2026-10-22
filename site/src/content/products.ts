// Products index and category pages, matching Figma Templates → 23 Products and 24 Product category.
// Quote-led (PRD §8): no prices or cart. Every product carries a status (PRD §31). [confirm] = check with Sarki.
import type { IconName } from "@/components/ui/Icon";
import type { Capability } from "@/components/ui/Status";

export type Product = { slug: string; name: string; text: string; status: Capability; icon: IconName };

export type ProductCategory = {
  slug: string;
  title: string;
  hero: { title: string; lead: string };
  image: { src: string; alt: string };
  products: Product[];
  faqs: { q: string; a: string }[];
  cta: { title: string; text: string };
};

export const productsHero = {
  eyebrow: "Products",
  title: "Fuel, gas and power equipment, supplied to specification.",
  lead: "Tell us the product, quantity and delivery point. We confirm price, availability and delivery before you commit.",
};

export const orderingSteps = [
  { kicker: "Request", title: "Product, quantity, site", text: "Tell us what you need, how much and where it goes." },
  { kicker: "Confirm", title: "Price and date agreed", text: "You see price, availability and delivery date before anything moves." },
  { kicker: "Deliver", title: "On the agreed day", text: "Delivered or installed, with quantities checked on arrival." },
  { kicker: "Support", title: "After it arrives", text: "Delivery notes, warranties and service from the same team." },
];

export const productCategoryPages: ProductCategory[] = [
  {
    slug: "petroleum",
    title: "Petroleum products",
    hero: {
      title: "Petrol, diesel and aviation fuel, on schedule.",
      lead: "Bulk and scheduled supply for fleets, plant, generators and stations. Tell us the product, quantity and delivery point; we confirm price and delivery before you commit.",
    },
    image: { src: "/photos/hero-fuel-depot.jpg", alt: "Two white fuel storage tanks in a green field" },
    products: [
      { slug: "pms", name: "Premium Motor Spirit (PMS)", text: "Petrol for vehicles and generators.", status: "available", icon: "gas-pump" },
      { slug: "ago", name: "Automotive Gas Oil (AGO)", text: "Diesel for fleets, plant and power generation.", status: "available", icon: "gas-pump" },
      { slug: "atk", name: "Aviation Turbine Fuel (ATK)", text: "For approved aviation customers.", status: "available", icon: "gas-can" },
      { slug: "other-petroleum", name: "Other petroleum products", text: "On request. Tell us the specification.", status: "available", icon: "drop-half" },
    ],
    faqs: [
      { q: "What is the minimum order?", a: "[confirm: minimum order volume]. Tell us the product, quantity and delivery point and we confirm price and availability." },
      { q: "Can you deliver on a fixed schedule?", a: "Yes. We plan recurring deliveries around your consumption and adjust them as it changes." },
      { q: "Who can buy ATK?", a: "Approved aviation customers only. [confirm: approval requirements]" },
    ],
    cta: { title: "Tell us what you burn in a month.", text: "Send the product, the volume and the site. We come back with a price and a delivery plan." },
  },
  {
    slug: "gas",
    title: "Gas",
    hero: {
      title: "Gas for homes, kitchens, industry and fleets.",
      lead: "LPG and CNG today, LNG in development. Tell us the product, quantity and delivery point; we confirm price and delivery before you commit.",
    },
    image: { src: "/photos/business-gas.jpg", alt: "Rows of gas cylinders in a storage area" },
    products: [
      { slug: "lpg", name: "Liquefied petroleum gas (LPG)", text: "Cylinders and bulk supply for homes, kitchens and industry.", status: "available", icon: "gas-can" },
      { slug: "cng", name: "Compressed natural gas (CNG)", text: "For converted vehicles and industrial users.", status: "available", icon: "gas-pump" },
      { slug: "lng", name: "Liquefied natural gas (LNG)", text: "For large industrial users. In development.", status: "in-development", icon: "flame" },
      { slug: "cylinders", name: "Cylinders and accessories", text: "Refills, exchange, regulators and hoses.", status: "available", icon: "shield-check" },
    ],
    faqs: [
      { q: "Do you deliver cylinders to homes?", a: "[confirm: home delivery areas]. Businesses can arrange scheduled refills." },
      { q: "Is LNG available now?", a: "Not yet. LNG supply is in development. Tell us your load and we’ll keep you updated." },
      { q: "What is the minimum bulk order?", a: "[confirm: minimum bulk LPG order]. Tell us your storage capacity and we’ll plan deliveries around it." },
    ],
    cta: { title: "Tell us how much gas you use.", text: "Cylinders, bulk or CNG: send the site and the volume and we confirm price and delivery." },
  },
  {
    slug: "power",
    title: "Power products",
    hero: {
      title: "The equipment we install, supplied to you.",
      lead: "Solar panels, inverters, batteries and storage systems, specified for your load. Buy the kit on its own or with installation by our engineers.",
    },
    image: { src: "/photos/hero-solar-array.jpg", alt: "Rows of solar panels on a green field, seen from above" },
    products: [
      { slug: "solar-panels", name: "Solar panels", text: "Monocrystalline and bifacial modules.", status: "available", icon: "solar-panel" },
      { slug: "inverters-batteries", name: "Inverters and batteries", text: "Hybrid inverters and lithium storage.", status: "available", icon: "battery-charging" },
      { slug: "storage", name: "Energy storage systems", text: "Commercial and industrial BESS.", status: "available", icon: "warehouse" },
      { slug: "ev-charging", name: "EV charging and electrical", text: "Chargers, cables and protection. EV charging is in development.", status: "in-development", icon: "charging-station" },
    ],
    faqs: [
      { q: "Can I buy equipment without installation?", a: "Yes. We can also install it, or check an installer’s design before you buy." },
      { q: "What warranty comes with the equipment?", a: "Warranty terms depend on the manufacturer and are confirmed with your quote." },
      { q: "Which brands do you supply?", a: "[confirm: brands and partners]. We specify equipment for your load rather than push one brand." },
    ],
    cta: { title: "Send us your parts list.", text: "Panels, inverters, batteries or a full system: we quote project and wholesale supply." },
  },
];

export function getProductCategory(slug: string) {
  return productCategoryPages.find((c) => c.slug === slug);
}

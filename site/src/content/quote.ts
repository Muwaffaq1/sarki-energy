// Request a quote: which questions each service asks (Figma Templates → 25 Request a quote).
// The form, the review step and the server all read this one config, so a field added here appears
// everywhere. Shaped to become a CMS collection later.
import type { IconName } from "@/components/ui/Icon";

export type Field =
  | { name: string; label: string; type: "choice"; options: string[]; required?: boolean }
  | { name: string; label: string; type: "text" | "number" | "date"; placeholder?: string; hint?: string; required?: boolean; half?: boolean }
  | { name: string; label: string; type: "textarea"; placeholder?: string; hint?: string; required?: boolean };

export type Service = { id: string; label: string; icon: IconName; detailsTitle: string; fields: Field[] };

const delivery: Field = { name: "location", label: "Delivery location", type: "text", placeholder: "Street, area and city", required: true, half: true };
const neededBy: Field = { name: "neededBy", label: "Needed by", type: "date", half: true };
const frequency: Field = { name: "frequency", label: "How often", type: "choice", options: ["One-off", "Weekly", "Monthly"] };
const siteType: Field = { name: "siteType", label: "Site type", type: "choice", options: ["Home", "Business", "Industry", "Institution"], required: true };
const siteLocation: Field = { name: "location", label: "Site location", type: "text", placeholder: "Area and city, like Wuse II, Abuja", required: true };

export const services: Service[] = [
  {
    id: "fuel",
    label: "Fuel",
    icon: "gas-pump",
    detailsTitle: "Fuel details",
    fields: [
      { name: "product", label: "Product", type: "choice", options: ["PMS (petrol)", "AGO (diesel)", "ATK", "Other"], required: true },
      { name: "quantity", label: "Quantity (litres)", type: "number", placeholder: "10,000", required: true, half: true },
      frequency,
      delivery,
      neededBy,
    ],
  },
  {
    id: "gas",
    label: "Gas",
    icon: "gas-can",
    detailsTitle: "Gas details",
    fields: [
      { name: "product", label: "Product", type: "choice", options: ["LPG cylinders", "Bulk LPG", "CNG", "LNG (in development)"], required: true },
      { name: "quantity", label: "Quantity (kg or cylinders)", type: "text", placeholder: "e.g. 20 × 12.5 kg", required: true, half: true },
      frequency,
      delivery,
      neededBy,
    ],
  },
  {
    id: "power",
    label: "Solar & power",
    icon: "solar-panel",
    detailsTitle: "Power details",
    fields: [
      siteType,
      siteLocation,
      { name: "load", label: "What do you run?", type: "textarea", placeholder: "e.g. 2 ACs, a freezer, borehole pump, 5 kVA generator 8 h a day", hint: "Rough is fine. It helps us send the right engineer with the right meters.", required: true },
      { name: "spend", label: "Monthly spend on fuel and grid (₦)", type: "number", placeholder: "150,000", hint: "Optional. A recent bill works too: attach it below.", half: true },
    ],
  },
  {
    id: "engineering",
    label: "Engineering & EPC",
    icon: "hard-hat",
    detailsTitle: "Project details",
    fields: [
      { name: "projectType", label: "Project type", type: "choice", options: ["New build", "Upgrade or expansion", "Maintenance", "Other"], required: true },
      siteLocation,
      { name: "scope", label: "Describe the project", type: "textarea", placeholder: "What you are building, its size and anything already designed", required: true },
      { name: "timeline", label: "When do you need to start?", type: "choice", options: ["Within a month", "1–3 months", "Later this year", "Not sure yet"] },
    ],
  },
  {
    id: "audit",
    label: "Energy audit",
    icon: "gauge",
    detailsTitle: "Audit details",
    fields: [
      siteType,
      siteLocation,
      { name: "concern", label: "What would you like to know?", type: "textarea", placeholder: "e.g. why our diesel bill doubled, or whether solar pays back for us", required: true },
    ],
  },
  {
    id: "other",
    label: "Something else",
    icon: "chat-circle",
    detailsTitle: "Your request",
    fields: [{ name: "request", label: "Tell us what you need", type: "textarea", placeholder: "Product, service or problem, and where", required: true }],
  },
];

export function getService(id: string | undefined) {
  return services.find((s) => s.id === id);
}

/** Links from product, business line and service pages pass ?category=, ?product= or ?service=. */
export function prefillFromParams(params: Record<string, string | string[] | undefined>): { service?: string; details: Record<string, string> } {
  const one = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : undefined);
  const category = one("category");
  const product = one("product");
  const service = one("service");

  const byProduct: Record<string, { service: string; product?: string }> = {
    pms: { service: "fuel", product: "PMS (petrol)" },
    ago: { service: "fuel", product: "AGO (diesel)" },
    atk: { service: "fuel", product: "ATK" },
    "other-petroleum": { service: "fuel", product: "Other" },
    lpg: { service: "gas", product: "LPG cylinders" },
    cng: { service: "gas", product: "CNG" },
    lng: { service: "gas", product: "LNG (in development)" },
    cylinders: { service: "gas", product: "LPG cylinders" },
    "solar-panels": { service: "power" },
    "inverters-batteries": { service: "power" },
    storage: { service: "power" },
    "ev-charging": { service: "power" },
  };
  const byCategory: Record<string, string> = { petroleum: "fuel", gas: "gas", power: "power" };
  const byService: Record<string, string> = { solar: "power", audit: "audit", engineering: "engineering", fuel: "fuel", gas: "gas" };

  if (product && byProduct[product]) {
    const match = byProduct[product];
    return { service: match.service, details: match.product ? { product: match.product } : {} };
  }
  if (category && byCategory[category]) return { service: byCategory[category], details: {} };
  if (service && byService[service]) return { service: byService[service], details: {} };
  return { service: undefined, details: {} };
}

export const replyOptions = ["WhatsApp", "Phone call", "Email"] as const;

export const upload = { maxBytes: 10 * 1024 * 1024, accept: ["application/pdf", "image/jpeg", "image/png", "image/webp"] };

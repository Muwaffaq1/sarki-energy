import { z } from "zod";
import { getService, replyOptions, type Service } from "@/content/quote";

// Nigerian numbers: 0803 123 4567, +234 803 123 4567 or 234803…; spaces and dashes allowed.
export const NG_PHONE = /^(?:\+?234|0)[789][01]\d{8}$/;

const base = {
  name: z.string().trim().min(2, "Enter your name."),
  organisation: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .refine((v) => NG_PHONE.test(v.replace(/[\s-]/g, "")), "Enter an 11-digit Nigerian number, like 0803 123 4567."),
  email: z.union([z.literal(""), z.string().trim().email("Check the email address, or leave it blank.")]).optional(),
  replyBy: z.enum(replyOptions),
  notes: z.string().trim().max(2000, "Keep notes under 2,000 characters.").optional(),
};

function detailsFor(service: Service) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of service.fields) {
    const verb = f.type === "choice" ? "Choose" : "Enter";
    const message = `${verb} ${f.label.toLowerCase().replace(/ \(.*\)$/, "")}.`;
    shape[f.name] = f.required
      ? z.string({ required_error: message, invalid_type_error: message }).trim().min(1, message)
      : z.string().trim().optional().nullable();
  }
  return z.object(shape);
}

/**
 * The schema for one service. Built per service (rather than one schema with a refinement) so that a missing
 * fuel quantity and a missing name are reported together on the first submit. Shared by form and server.
 */
export function quoteSchemaFor(serviceId: string | undefined) {
  const service = getService(serviceId);
  return z
    .object({
      service: z.string({ required_error: "Pick what you need." }).refine((v) => !!getService(v), "Pick what you need."),
      details: service ? detailsFor(service) : z.record(z.string()).default({}),
      ...base,
    })
    .refine((d) => d.replyBy !== "Email" || !!d.email, { path: ["email"], message: "Add an email address so we can reply by email." });
}

export type QuoteInput = {
  service: string;
  details: Record<string, string | null | undefined>;
  name: string;
  organisation?: string;
  phone: string;
  email?: string;
  replyBy: (typeof replyOptions)[number];
  notes?: string;
};

/** Plain-text summary used for the review step, the WhatsApp fallback and the stored request. */
export function summarise(data: QuoteInput): { label: string; value: string }[] {
  const service = getService(data.service);
  if (!service) return [];
  const details = service.fields
    .filter((f) => data.details?.[f.name])
    .map((f) => ({ label: f.label, value: String(data.details[f.name]) }));
  return [
    { label: "What you need", value: service.label },
    ...details,
    { label: "Your details", value: [data.name, data.organisation, data.phone, data.email].filter(Boolean).join(" · ") },
    { label: "Reply by", value: data.replyBy },
    ...(data.notes ? [{ label: "Notes", value: data.notes }] : []),
  ];
}

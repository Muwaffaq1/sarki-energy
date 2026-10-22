import { z } from "zod";
import { enquiryForms, type EnquiryForm } from "@/content/enquiries";
import { NG_PHONE } from "./quote-schema";

/** Builds the validation for one enquiry form from its field config. Shared by the form and the API. */
export function enquirySchemaFor(kind: EnquiryForm["kind"]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of enquiryForms[kind].fields) {
    const verb = f.type === "choice" ? "Choose" : "Enter";
    const message = `${verb} ${f.label.toLowerCase()}.`;
    let s: z.ZodTypeAny;
    if (f.type === "tel") {
      s = z.string().trim().refine((v) => NG_PHONE.test(v.replace(/[\s-]/g, "")), "Enter an 11-digit Nigerian number, like 0803 123 4567.");
    } else if (f.type === "email") {
      s = f.required
        ? z.string().trim().email("Check the email address.")
        : z.union([z.literal(""), z.string().trim().email("Check the email address, or leave it blank.")]).optional();
    } else if (f.required) {
      s = z.string({ required_error: message, invalid_type_error: message }).trim().min(f.type === "textarea" ? 10 : 1, f.type === "textarea" ? "Add a little more detail." : message);
    } else {
      s = z.string().trim().optional().nullable();
    }
    shape[f.name] = s;
  }
  return z.object(shape);
}

export const enquiryKinds = Object.keys(enquiryForms) as EnquiryForm["kind"][];

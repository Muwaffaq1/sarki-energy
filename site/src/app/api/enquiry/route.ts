/** Receives contact, partnership and careers forms (components/forms/EnquiryForm). Storage: lib/submissions.ts. */
import { upload } from "@/content/quote";
import { enquiryForms } from "@/content/enquiries";
import { enquiryKinds, enquirySchemaFor } from "@/lib/enquiry-schema";
import { reference, storeSubmission } from "@/lib/submissions";

const prefixes = { contact: "SC", partner: "SP", career: "SJ", senergy: "SA" } as const;

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "We couldn’t read that." }, { status: 400 });
  }
  const kind = String(form.get("kind")) as (typeof enquiryKinds)[number];
  if (!enquiryKinds.includes(kind)) return Response.json({ error: "Unknown form." }, { status: 400 });

  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("data") ?? ""));
  } catch {
    return Response.json({ error: "We couldn’t read that." }, { status: 400 });
  }
  const parsed = enquirySchemaFor(kind).safeParse(raw);
  if (!parsed.success) return Response.json({ error: "Some answers need a look.", issues: parsed.error.flatten() }, { status: 400 });

  const file = form.get("file");
  const attachment = file instanceof File && file.size > 0 ? file : null;
  const config = enquiryForms[kind];
  if (config.file?.required && !attachment) return Response.json({ error: `Attach your ${config.file.label}.` }, { status: 400 });
  const accept = kind === "career" ? ["application/pdf"] : upload.accept;
  if (attachment && (!accept.includes(attachment.type) || attachment.size > upload.maxBytes)) {
    return Response.json({ error: "That file type or size isn’t accepted." }, { status: 400 });
  }

  const record = {
    reference: reference(prefixes[kind]),
    kind,
    receivedAt: new Date().toISOString(),
    ...parsed.data,
    attachment: attachment ? { name: attachment.name, type: attachment.type, size: attachment.size } : null,
  };
  const result = await storeSubmission("enquiries", process.env.ENQUIRY_WEBHOOK_URL, record, attachment);
  if (!result.ok) return Response.json({ error: result.error }, { status: result.status });
  return Response.json({ reference: record.reference }, { status: 201 });
}

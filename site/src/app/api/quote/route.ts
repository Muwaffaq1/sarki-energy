/**
 * Receives quote requests from /quote and validates them with the form's own schema. Where they are stored
 * (QUOTE_WEBHOOK_URL, the dev file, or a 503 in unconfigured production) is in lib/submissions.ts.
 */
import { quoteSchemaFor, summarise } from "@/lib/quote-schema";
import { upload } from "@/content/quote";
import { reference, storeSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "We couldn’t read your request." }, { status: 400 });
  }

  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("data") ?? ""));
  } catch {
    return Response.json({ error: "We couldn’t read your request." }, { status: 400 });
  }
  const serviceId = typeof raw === "object" && raw !== null && "service" in raw ? String((raw as { service: unknown }).service) : undefined;
  const parsed = quoteSchemaFor(serviceId).safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: "Some answers need a look.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const file = form.get("file");
  const attachment = file instanceof File && file.size > 0 ? file : null;
  if (attachment && (!upload.accept.includes(attachment.type) || attachment.size > upload.maxBytes)) {
    return Response.json({ error: "Attach a PDF or an image up to 10 MB." }, { status: 400 });
  }

  const record = {
    reference: reference("SE"),
    receivedAt: new Date().toISOString(),
    ...parsed.data,
    summary: summarise(parsed.data as Parameters<typeof summarise>[0]),
    attachment: attachment ? { name: attachment.name, type: attachment.type, size: attachment.size } : null,
  };
  const result = await storeSubmission("quote-requests", process.env.QUOTE_WEBHOOK_URL, record, attachment);
  if (!result.ok) return Response.json({ error: result.error }, { status: result.status });
  return Response.json({ reference: record.reference }, { status: 201 });
}

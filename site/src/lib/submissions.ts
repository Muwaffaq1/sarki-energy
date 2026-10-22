/**
 * Where form submissions go, for quotes and enquiries alike:
 *  - a webhook URL is set (QUOTE_WEBHOOK_URL / ENQUIRY_WEBHOOK_URL): POST the record as JSON, attachment
 *    base64-encoded. Point it at the CMS once Payload is in, or at an email or automation hook.
 *  - otherwise, under `next dev`: append to site/<store>.json and save the attachment in site/<store>-uploads/.
 *  - otherwise (production with nowhere to store it): refuse with 503 so nothing is silently lost.
 */
export type StoreResult = { ok: true } | { ok: false; status: number; error: string };

export async function storeSubmission(store: "quote-requests" | "enquiries", webhook: string | undefined, record: { reference: string } & Record<string, unknown>, attachment: File | null): Promise<StoreResult> {
  if (webhook) {
    const payload = attachment
      ? { ...record, attachment: { name: attachment.name, type: attachment.type, size: attachment.size, base64: Buffer.from(await attachment.arrayBuffer()).toString("base64") } }
      : record;
    const res = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return res.ok ? { ok: true } : { ok: false, status: 502, error: "We couldn’t send that just now." };
  }

  if (process.env.NODE_ENV === "development") {
    const { readFile, writeFile, mkdir } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const file = join(process.cwd(), `${store}.json`);
    let all: unknown[] = [];
    try {
      all = JSON.parse(await readFile(file, "utf8"));
    } catch {}
    if (attachment) {
      const dir = join(process.cwd(), store === "quote-requests" ? "quote-uploads" : "enquiry-uploads");
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, `${record.reference}-${attachment.name.replace(/[^\w.-]+/g, "_")}`), Buffer.from(await attachment.arrayBuffer()));
    }
    all.push(record);
    await writeFile(file, JSON.stringify(all, null, 2) + "\n");
    return { ok: true };
  }

  return { ok: false, status: 503, error: "Online forms aren’t switched on yet." };
}

export function reference(prefix: string) {
  return `${prefix}-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

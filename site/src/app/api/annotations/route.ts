/**
 * Dev-only store for design annotations made with the click-to-note overlay
 * (components/dev/Annotator.tsx). Notes are kept in site/annotations.json so they
 * can be read back while editing. Every method answers 404 outside `next dev`,
 * so nothing here works in production.
 */

type Note = {
  id: string;
  path: string;
  selector: string;
  snippet: string;
  tag: string;
  fx: number;
  fy: number;
  note: string;
  viewport: number;
  createdAt: string;
};

const isDev = process.env.NODE_ENV === "development";

async function store() {
  const { readFile, writeFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const file = join(process.cwd(), "annotations.json");
  return {
    async read(): Promise<Note[]> {
      try {
        return JSON.parse(await readFile(file, "utf8"));
      } catch {
        return [];
      }
    },
    async write(notes: Note[]) {
      await writeFile(file, JSON.stringify(notes, null, 2) + "\n");
    },
  };
}

const notFound = () => new Response("Not found", { status: 404 });

export async function GET() {
  if (!isDev) return notFound();
  const s = await store();
  return Response.json(await s.read());
}

export async function POST(request: Request) {
  if (!isDev) return notFound();
  const body = (await request.json()) as Omit<Note, "id" | "createdAt">;
  if (!body?.note?.trim() || !body.selector || !body.path) {
    return Response.json({ error: "A note, selector and path are required." }, { status: 400 });
  }
  const s = await store();
  const notes = await s.read();
  const note: Note = { ...body, note: body.note.trim(), id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  notes.push(note);
  await s.write(notes);
  return Response.json(note, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!isDev) return notFound();
  const id = new URL(request.url).searchParams.get("id");
  const s = await store();
  const notes = await s.read();
  await s.write(notes.filter((n) => n.id !== id));
  return new Response(null, { status: 204 });
}

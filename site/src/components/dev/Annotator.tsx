"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Annotator.module.css";

/**
 * Dev-only click-to-note overlay (ported from the Almutamir site). Shift+A (or the floating button) turns
 * annotate mode on: hover outlines an element, click opens a note box, and saved notes pin to the element
 * as numbered dots. Notes are stored through /api/annotations in site/annotations.json. Mounted only under
 * `next dev`. Its orange is deliberately off-brand so it never reads as site UI.
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

type Draft = Omit<Note, "id" | "createdAt" | "note"> & { x: number; y: number };

/** A stable CSS path from body (or the nearest id) down to the element. */
function cssPath(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node !== document.body && node !== document.documentElement) {
    if (node.id) {
      parts.unshift(`#${CSS.escape(node.id)}`);
      return parts.join(" > ");
    }
    const parent: Element | null = node.parentElement;
    if (!parent) break;
    const tag = node.tagName.toLowerCase();
    const siblings = Array.from(parent.children).filter((c) => c.tagName === node!.tagName);
    parts.unshift(siblings.length > 1 ? `${tag}:nth-of-type(${siblings.indexOf(node) + 1})` : tag);
    node = parent;
  }
  return `body > ${parts.join(" > ")}`;
}

function isOwnUi(el: EventTarget | null) {
  return el instanceof Element && !!el.closest("[data-annotator]");
}

function isTyping(el: EventTarget | null) {
  return el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}

export function Annotator() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [hover, setHover] = useState<DOMRect | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [text, setText] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [, setFrame] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const pageNotes = notes.filter((n) => n.path === pathname);

  useEffect(() => {
    fetch("/api/annotations")
      .then((r): Promise<Note[]> | Note[] => (r.ok ? r.json() : []))
      .then(setNotes)
      .catch(() => setNotes([]));
  }, []);

  // Shift+A toggles; Escape closes the note box, then leaves the mode
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (draft) setDraft(null);
        else if (openId) setOpenId(null);
        else setActive(false);
        return;
      }
      if (e.shiftKey && e.key.toLowerCase() === "a" && !isTyping(e.target)) {
        e.preventDefault();
        setActive((a) => !a);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [draft, openId]);

  // Keep pins and the hover box attached while the page scrolls or resizes
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setFrame((f) => f + 1));
    };
    window.addEventListener("scroll", tick, { passive: true, capture: true });
    window.addEventListener("resize", tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick, { capture: true });
      window.removeEventListener("resize", tick);
    };
  }, []);

  // Annotate mode: outline on hover, capture clicks so links and menus don't fire
  useEffect(() => {
    if (!active) return;
    function onMove(e: MouseEvent) {
      if (draft || isOwnUi(e.target) || !(e.target instanceof Element)) return setHover(null);
      setHover(e.target.getBoundingClientRect());
    }
    function onClick(e: MouseEvent) {
      if (isOwnUi(e.target) || !(e.target instanceof Element)) return;
      e.preventDefault();
      e.stopPropagation();
      if (draft) return;
      const el = e.target;
      const r = el.getBoundingClientRect();
      setDraft({
        path: pathname,
        selector: cssPath(el),
        snippet: (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 120),
        tag: el.tagName.toLowerCase(),
        fx: r.width ? (e.clientX - r.left) / r.width : 0,
        fy: r.height ? (e.clientY - r.top) / r.height : 0,
        viewport: window.innerWidth,
        x: e.clientX,
        y: e.clientY,
      });
      setText("");
      setHover(null);
      requestAnimationFrame(() => textRef.current?.focus());
    }
    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    document.body.style.cursor = "crosshair";
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      document.body.style.cursor = "";
    };
  }, [active, draft, pathname]);

  const save = useCallback(async () => {
    if (!draft || !text.trim()) return;
    const res = await fetch("/api/annotations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // x and y only place the note box; undefined drops them from the JSON
      body: JSON.stringify({ ...draft, x: undefined, y: undefined, note: text }),
    });
    if (res.ok) {
      const saved: Note = await res.json();
      setNotes((n) => [...n, saved]);
      setDraft(null);
      setText("");
    }
  }, [draft, text]);

  async function remove(id: string) {
    await fetch(`/api/annotations?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setNotes((n) => n.filter((x) => x.id !== id));
    setOpenId(null);
  }

  function pinPosition(n: Note) {
    const el = document.querySelector(n.selector);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left + n.fx * r.width, top: r.top + n.fy * r.height };
  }

  const clamp = (v: number, max: number) => Math.max(16, Math.min(v, max));

  return (
    <div data-annotator className={styles.root}>
      {/* Hover outline */}
      {active && hover && (
        <div className={styles.outline} style={{ left: hover.left, top: hover.top, width: hover.width, height: hover.height }} />
      )}

      {/* Pins for this page */}
      {active &&
        pageNotes.map((n, i) => {
          const pos = pinPosition(n);
          if (!pos) return null;
          const open = openId === n.id;
          return (
            <div key={n.id} className={styles.pinWrap} style={{ left: pos.left, top: pos.top }}>
              <button type="button" className={styles.pin} onClick={() => setOpenId(open ? null : n.id)} aria-label={`Note ${i + 1}`}>
                {i + 1}
              </button>
              {open && (
                <div className={styles.popover}>
                  <p className={styles.noteText}>{n.note}</p>
                  <p className={styles.meta}>
                    {n.tag} · {n.snippet || n.selector}
                  </p>
                  <button type="button" className={styles.delete} onClick={() => remove(n.id)}>
                    Delete note
                  </button>
                </div>
              )}
            </div>
          );
        })}

      {/* New note box */}
      {draft && (
        <div
          className={styles.draft}
          style={{ left: clamp(draft.x + 12, window.innerWidth - 304), top: clamp(draft.y + 12, window.innerHeight - 200) }}
        >
          <p className={styles.meta}>
            {draft.tag} · {draft.snippet || draft.selector}
          </p>
          <textarea
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save();
            }}
            rows={3}
            placeholder="What should change here?"
            className={styles.textarea}
          />
          <div className={styles.draftFooter}>
            <span className={styles.hint}>⌘↵ to save · Esc to cancel</span>
            <div className={styles.draftActions}>
              <button type="button" className={styles.cancel} onClick={() => setDraft(null)}>
                Cancel
              </button>
              <button type="button" className={styles.save} onClick={save} disabled={!text.trim()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle: sits above the WhatsApp button */}
      <button
        type="button"
        className={styles.toggle}
        data-active={active}
        onClick={() => {
          setActive((a) => !a);
          setDraft(null);
          setOpenId(null);
        }}
      >
        <span className={styles.toggleDot} />
        {active ? `Done · ${pageNotes.length} on this page` : `Annotate (⇧A)${notes.length ? ` · ${notes.length}` : ""}`}
      </button>
    </div>
  );
}

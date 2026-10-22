"""Sarki Energy design tokens — single source of truth.

Writes:
  project/tokens.json   (read by the Design System artifact page)
  code/tokens.css       (CSS custom properties for the web codebase)
  code/tokens.json      (resolved values per theme, for Figma / native apps)

Run:  python3 scripts/build_tokens.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# ── Primitives ────────────────────────────────────────────────────────────────
# Raw palette. Components never use these directly; they use the semantic layer.
PRIMITIVES = [
    # Neutral: true greys with the faintest warm bias, anchored on the logo's pure black.
    ("neutral-0", "#ffffff"), ("neutral-50", "#fafaf9"), ("neutral-100", "#f4f4f2"),
    ("neutral-200", "#e7e7e4"), ("neutral-300", "#d4d4d0"), ("neutral-400", "#a3a39e"),
    ("neutral-500", "#73736e"), ("neutral-600", "#52524e"), ("neutral-700", "#3d3d3a"),
    ("neutral-800", "#262624"), ("neutral-900", "#171716"), ("neutral-950", "#0d0d0c"),
    ("neutral-1000", "#000000"),
    # Volt: the single brand accent (chosen 21 Oct 2026). 500 is the signature value.
    ("volt-50", "#ebf8f1"), ("volt-100", "#d2f1e1"), ("volt-200", "#a6e3c4"),
    ("volt-300", "#73d2a2"), ("volt-400", "#4cc489"), ("volt-500", "#2bb673"),
    ("volt-600", "#1f9a5f"), ("volt-700", "#167a4b"), ("volt-800", "#105c39"),
    ("volt-900", "#0b3f27"), ("volt-950", "#062517"),
    # Status hues.
    ("green-100", "#dcfce7"), ("green-300", "#86efac"), ("green-500", "#22c55e"),
    ("green-700", "#15803d"), ("green-950", "#052e16"),
    ("yellow-100", "#fef9c3"), ("yellow-300", "#fde047"), ("yellow-500", "#eab308"),
    ("yellow-700", "#a16207"), ("yellow-950", "#2a2003"),
    ("red-100", "#fee2e2"), ("red-300", "#fca5a5"), ("red-500", "#ef4444"),
    ("red-700", "#b91c1c"), ("red-950", "#3a0a0a"),
    ("blue-100", "#dbeafe"), ("blue-300", "#93c5fd"), ("blue-500", "#3b82f6"),
    ("blue-700", "#1d4ed8"), ("blue-950", "#0b1a3a"),
    # Data-viz only.
    ("teal-400", "#2dd4bf"), ("teal-600", "#0d9488"),
]

# ── Semantic colors: (name, light, dark, usage) ───────────────────────────────
# Values in {braces} alias a primitive.
SEMANTIC = [
    ("surface", "{neutral-0}", "{neutral-1000}", "Page background."),
    ("surface-subtle", "{neutral-100}", "{neutral-950}", "Section bands, table stripes, image placeholders."),
    ("surface-raised", "{neutral-0}", "{neutral-900}", "Cards, menus, sheets. In light it relies on `line` for its edge."),
    ("surface-inverse", "{neutral-950}", "{neutral-50}", "Brand blocks, hero bands, the primary button fill."),
    ("line", "{neutral-200}", "{neutral-800}", "Hairlines, card borders, dividers. Decorative only."),
    ("line-strong", "{neutral-500}", "{neutral-500}", "Input and checkbox borders. Meets 3:1 on surface and surface-raised."),
    ("ink", "{neutral-950}", "{neutral-50}", "Primary text and icons on surface, surface-subtle and surface-raised."),
    ("ink-muted", "{neutral-600}", "{neutral-400}", "Secondary text, metadata, helper text on any surface (7:1+)."),
    ("ink-disabled", "{neutral-400}", "{neutral-600}", "Disabled labels and placeholders only. Not for readable copy."),
    ("ink-inverse", "{neutral-0}", "{neutral-950}", "Text and icons on surface-inverse."),
    ("ink-inverse-muted", "{neutral-400}", "{neutral-600}", "Secondary text and outline-button borders on surface-inverse (footer, CTA bands). 7:1+."),
    ("line-inverse", "{neutral-700}", "{neutral-300}", "Hairlines on surface-inverse. Decorative only."),
    ("logo-mark", "{neutral-1000}", "{neutral-0}", "The logo disc. Black on light surfaces, white in dark mode. Logo only."),
    ("logo-on-mark", "{neutral-0}", "{neutral-1000}", "The \"se\" letters cut into the logo disc. Always the opposite of logo-mark. Logo only."),
    ("accent", "{volt-500}", "{volt-500}", "Volt. The one signal colour: the main CTA, active states, brand moments. One accent CTA per view."),
    ("accent-hover", "{volt-600}", "{volt-400}", "Hover and pressed fill for accent."),
    ("on-accent", "{neutral-1000}", "{neutral-1000}", "Text and icons on an accent fill. Always black (8:1); white fails (2.6:1)."),
    ("accent-text", "{volt-700}", "{volt-400}", "Volt as text: links, active tab labels, on surface (5.4:1) or accent-soft."),
    ("accent-soft", "{volt-50}", "{volt-950}", "Tinted backgrounds behind accent-text: selected rows, promo badges."),
    ("success", "{green-700}", "{green-300}", "In stock, online, charging, completed. Text on surface or success-soft."),
    ("success-soft", "{green-100}", "{green-950}", "Background for success badges and banners."),
    ("warning", "{yellow-700}", "{yellow-300}", "Low stock, low battery, maintenance due. Text on surface or warning-soft."),
    ("warning-soft", "{yellow-100}", "{yellow-950}", "Background for warning badges and banners."),
    ("danger", "{red-700}", "{red-300}", "Errors, faults, out of stock, offline. Text on surface or danger-soft."),
    ("danger-soft", "{red-100}", "{red-950}", "Background for danger badges, banners and invalid inputs."),
    ("info", "{blue-700}", "{blue-300}", "Neutral notices and tips. Text on surface or info-soft."),
    ("info-soft", "{blue-100}", "{blue-950}", "Background for info badges and banners."),
    ("focus-ring", "{neutral-950}", "{neutral-50}", "2px focus outline, offset 2px. Solid ink so it shows on every surface, accent fills included."),
    ("viz-solar", "{yellow-500}", "{yellow-300}", "Charts: solar generation (sun yellow, kept apart from the brand green)."),
    ("viz-battery", "{volt-600}", "{volt-400}", "Charts: battery charge and discharge."),
    ("viz-grid", "{neutral-400}", "{neutral-500}", "Charts: grid import and baseline series."),
    ("viz-fuel", "{blue-700}", "{blue-300}", "Charts: fuel, gas and diesel volumes."),
]

# ── Typography ────────────────────────────────────────────────────────────────
# Major Third (×1.25) from a 16px base, each step rounded to an even number:
# 12 · 14 · 16 · 18 · 20 · 24 · 32 · 40 · 48 · 64 · 80. Line heights sit on the 4px grid.
# Tracking tightens as size grows (Host Grotesk is wide-set); small text opens up.
TYPE_GROUPS = [
    ("Display", "sans", [
        ("display-2xl", 80, 80, "-0.04em", 600, "Hero headline on marketing pages. One per page."),
        ("display-xl", 64, 72, "-0.035em", 600, "Hero headline on tablet; section openers on desktop."),
        ("display-lg", 48, 56, "-0.03em", 600, "Hero headline on mobile; big campaign statements."),
    ]),
    ("Heading", "sans", [
        ("heading-1", 40, 48, "-0.025em", 600, "Page title."),
        ("heading-2", 32, 40, "-0.02em", 600, "Section title."),
        ("heading-3", 24, 32, "-0.015em", 600, "Card group and panel titles."),
        ("heading-4", 20, 28, "-0.01em", 600, "Card titles, dialog titles."),
        ("heading-5", 18, 24, "-0.005em", 600, "Small card titles, list group headers."),
    ]),
    ("Body", "sans", [
        ("body-lg", 18, 28, "0em", 400, "Lead paragraphs and hero sub-copy."),
        ("body", 16, 24, "0em", 400, "Default running text. Keep lines near 65 characters."),
        ("body-sm", 14, 20, "0.005em", 400, "Dense UI text, table cells, helper text."),
    ]),
    ("Utility", "sans", [
        ("label-lg", 16, 24, "0em", 500, "Large buttons and prominent form labels."),
        ("label", 14, 20, "0.005em", 500, "Buttons, form labels, tabs, badges."),
        ("label-sm", 12, 16, "0.01em", 500, "Badges, chart legends, cart counts."),
        ("caption", 12, 16, "0.01em", 400, "Timestamps, footnotes, chart axes."),
        ("overline", 12, 16, "0.08em", 600, "Eyebrows above headings. Always uppercase."),
    ]),
    ("Numeric", "sans", [
        ("numeric-xl", 48, 48, "-0.03em", 600, "Hero metrics: kWh, battery %, savings. Tabular figures."),
        ("numeric-lg", 32, 40, "-0.02em", 600, "Stat tile values and prices on product pages. Tabular figures."),
        ("numeric", 16, 24, "0em", 500, "Prices on cards, table numbers, quantities. Tabular figures."),
    ]),
]

FAMILIES = {
    "sans": "\"Host Grotesk\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", sans-serif",
    "mono": "ui-monospace, \"SF Mono\", Menlo, Consolas, monospace",
}
FONTS = [
    {"family": "Host Grotesk", "file": "fonts/HostGrotesk-Variable.ttf", "weight": "300 800", "style": "normal"},
    {"family": "Host Grotesk", "file": "fonts/HostGrotesk-Italic-Variable.ttf", "weight": "300 800", "style": "italic"},
]

# ── Space, size, radius: doubles with half-steps ──────────────────────────────
SPACE = [
    (0, "No gap."),
    (2, "Hairline nudges: icon-to-text optical fixes."),
    (4, "Tightest gap: badge padding, icon and label inside a chip."),
    (8, "Default inline gap: icon to label in buttons, items in a row of chips."),
    (12, "Half-step. Gap between label and input; small card padding."),
    (16, "Base unit. Mobile page gutter, card padding, stacked form fields."),
    (24, "Half-step. Desktop card padding, gap between cards in a grid."),
    (32, "Gap between content groups inside a section; desktop gutter."),
    (48, "Half-step. Space between sections on mobile."),
    (64, "Space between sections on desktop."),
    (96, "Half-step. Hero padding on desktop."),
    (128, "Largest break: marketing page openers and closers."),
]
SIZE = [
    ("control-sm", "32px", "Small buttons, compact inputs, table row actions."),
    ("control-md", "40px", "Default button and input height."),
    ("control-lg", "48px", "Primary mobile CTAs and hero buttons. Meets the 44px touch target."),
    ("icon-16", "16px", "Icons inside small buttons, badges and captions."),
    ("icon-20", "20px", "Icons inside default buttons and inputs."),
    ("icon-24", "24px", "Standalone icons, navigation, list items."),
    ("icon-32", "32px", "Feature icons on service cards."),
    ("icon-48", "48px", "Empty states and large feature callouts."),
]
RADIUS = [
    ("radius-0", "0px", "Full-bleed images, tables, hero bands."),
    ("radius-4", "4px", "Checkboxes, tooltips, small tags."),
    ("radius-8", "8px", "Inputs, selects, images inside cards."),
    ("radius-16", "16px", "Cards, sheets, dialogs, panels."),
    ("radius-24", "24px", "Large feature panels and mobile bottom sheets."),
    ("radius-full", "9999px", "Buttons, badges, icon buttons, avatars. Echoes the circular logo."),
]
BORDER = [
    ("border-1", "1px", "Default borders and dividers."),
    ("border-2", "2px", "Selected cards, focus rings, emphasis."),
]
BREAKPOINT = [
    ("bp-sm", "640px", "Large phones and up: 4 → 8 columns."),
    ("bp-md", "768px", "Tablets: 8 columns, 24px gutters."),
    ("bp-lg", "1024px", "Laptops: 12 columns, 32px gutters."),
    ("bp-xl", "1280px", "Desktop: 12 columns, content max 1216px."),
    ("bp-2xl", "1536px", "Wide screens: content stays at max width, margins grow."),
]
SHADOW = [
    ("shadow-sm", "0 1px 2px rgba(13,13,12,0.06)", "0 1px 2px rgba(0,0,0,0.6)", "Resting cards in dense UIs; inputs on subtle surfaces."),
    ("shadow-md", "0 4px 16px rgba(13,13,12,0.08)", "0 4px 16px rgba(0,0,0,0.7)", "Hovered cards, dropdown menus, popovers."),
    ("shadow-lg", "0 16px 48px rgba(13,13,12,0.12)", "0 16px 48px rgba(0,0,0,0.8)", "Dialogs, bottom sheets, cart drawer."),
]



# ── Motion ────────────────────────────────────────────────────────────────────
# Rules from Emil Kowalski's design-engineering standards (skills: emil-design-eng,
# review-animations). Sarki is "productive by default": UI motion stays under 300ms,
# animates only transform and opacity, and never bounces. "Expressive" durations are
# for rare, marketing moments only (hero entrance, chart reveal, request sent).
# Durations sit on two doubling ladders: 120 · 240 · 480 and 160 · 320.
DURATION = [
    ("duration-0", "0ms", "Keyboard-triggered actions and repeat tooltips. Frequent actions get no animation."),
    ("duration-120", "120ms", "Hover colour and border changes, chip selection, focus rings."),
    ("duration-160", "160ms", "Press feedback (scale 0.97), switch thumb, checkbox tick, tooltips."),
    ("duration-240", "240ms", "Dropdowns, selects, accordion, segmented-control indicator, toasts."),
    ("duration-320", "320ms", "Modals, drawers, mobile bottom sheets, cart drawer. The longest UI duration."),
    ("duration-480", "480ms", "Expressive only: hero entrance, chart bars growing, the request-sent check. Once per visit."),
]
EASING = [
    ("ease-out", "cubic-bezier(0.23, 1, 0.32, 1)", "Default. Anything entering, exiting or responding to a press. Starts fast, so the UI feels instant."),
    ("ease-in-out", "cubic-bezier(0.77, 0, 0.175, 1)", "Things moving or morphing on screen: switch thumb, segmented indicator, carousel."),
    ("ease-drawer", "cubic-bezier(0.32, 0.72, 0, 1)", "Drawers and bottom sheets (iOS-like)."),
    ("ease-hover", "cubic-bezier(0.25, 0.1, 0.25, 1)", "Hover colour, border and shadow changes (the CSS ease curve)."),
    ("ease-linear", "linear", "Constant motion only: progress bars, spinners."),
]
MOTION_MISC = [
    ("motion-press-scale", "0.97", "Scale on press for every pressable element. Never below 0.95."),
    ("motion-enter-scale", "0.95", "Starting scale for popovers and modals entering. Never scale(0)."),
    ("motion-enter-offset", "8px", "Starting translateY for content fading in (hero lines, toasts, cards)."),
    ("motion-stagger", "48ms", "Delay between items in a staggered group. Decorative: never blocks input."),
]


def page_tokens():
    colors = [{"name": n, "value": v, "usage": "Primitive. Use a semantic token in components."} for n, v in PRIMITIVES]
    colors += [{"name": n, "value": {"light": l, "dark": d}, "usage": u} for n, l, d, u in SEMANTIC]
    groups = []
    for gname, fam, styles in TYPE_GROUPS:
        groups.append({"name": gname, "family": fam, "styles": [
            {"name": n, "fontSize": f"{s}px", "lineHeight": f"{lh}px", "letterSpacing": ls, "fontWeight": w, "usage": u,
             **({"sample": "₦ 1,250,000"} if gname == "Numeric" else {}),
             **({"sample": "Featured solutions"} if n == "overline" else {})}
            for n, s, lh, ls, w, u in styles]})
    return {
        "name": "Sarki Energy",
        "version": 1,
        "color": {"themes": [{"id": "light", "name": "Light"}, {"id": "dark", "name": "Dark"}], "tokens": colors},
        "type": {"fonts": FONTS, "families": FAMILIES, "groups": groups},
        "spacing": {"note": "Doubles (2, 4, 8, 16, 32, 64, 128) are the backbone; half-steps (12, 24, 48, 96) fill the gaps.",
                    "tokens": [{"name": f"space-{v}", "value": f"{v}px", "usage": u} for v, u in SPACE]},
        "size": {"note": "Control heights and icon sizes, on the same 2s scale.",
                 "tokens": [{"name": n, "value": v, "usage": u} for n, v, u in SIZE]},
        "radius": {"tokens": [{"name": n, "value": v, "usage": u} for n, v, u in RADIUS]},
        "borderWidth": {"tokens": [{"name": n, "value": v, "usage": u} for n, v, u in BORDER]},
        "breakpoint": {"note": "Every breakpoint is a multiple of 128.",
                       "tokens": [{"name": n, "value": v, "usage": u} for n, v, u in BREAKPOINT]},
        "shadow": {"tokens": [{"name": n, "value": {"light": l, "dark": d}, "usage": u} for n, l, d, u in SHADOW]},
        "duration": {"note": "Motion durations. UI stays at 320ms or under; 480ms is for rare marketing moments.",
                     "tokens": [{"name": n, "value": v, "usage": u} for n, v, u in DURATION]},
        "easing": {"note": "Never ease-in on UI: it delays the moment people are watching.",
                   "tokens": [{"name": n, "value": v, "usage": u} for n, v, u in EASING]},
        "interaction": {"note": "Scale, offset and stagger values used with the duration and easing tokens.", "tokens": [{"name": n, "value": v, "usage": u} for n, v, u in MOTION_MISC]},
    }


def resolve(value, prim):
    m = re.fullmatch(r"\{(.+)\}", value)
    return prim[m.group(1)] if m else value


def css_value(value):
    m = re.fullmatch(r"\{(.+)\}", value)
    return f"var(--{m.group(1)})" if m else value


def code_css():
    out = ["/* Sarki Energy — generated by scripts/build_tokens.py. Do not edit by hand. */", ""]
    for f in FONTS:
        out.append(f"@font-face {{ font-family: \"{f['family']}\"; src: url(\"../project/{f['file']}\") format(\"truetype\"); "
                   f"font-weight: {f['weight']}; font-style: {f['style']}; font-display: swap; }}")
    out += ["", ":root, [data-theme=\"light\"] {"]
    out += [f"  --{n}: {v};" for n, v in PRIMITIVES]
    out += [f"  --{n}: {css_value(l)};" for n, l, d, u in SEMANTIC]
    out += [f"  --{n}: {l};" for n, l, d, u in SHADOW]
    out += ["}", "", "[data-theme=\"dark\"] {", "  color-scheme: dark;"]
    out += [f"  --{n}: {css_value(d)};" for n, l, d, u in SEMANTIC]
    out += [f"  --{n}: {d};" for n, l, d, u in SHADOW]
    out += ["}", "", "@media (prefers-color-scheme: dark) {", "  :root:not([data-theme=\"light\"]) {", "    color-scheme: dark;"]
    out += [f"    --{n}: {css_value(d)};" for n, l, d, u in SEMANTIC]
    out += [f"    --{n}: {d};" for n, l, d, u in SHADOW]
    out += ["  }", "}", "", ":root {"]
    out += [f"  --font-{k}: {v};" for k, v in FAMILIES.items()]
    out += [f"  --space-{v}: {v}px;" for v, _ in SPACE]
    out += [f"  --{n}: {v};" for n, v, _ in SIZE + RADIUS + BORDER + BREAKPOINT + DURATION + EASING + MOTION_MISC]
    out += ["}", "",
            "/* Reduced motion: keep opacity and colour, drop movement and scale. */",
            "@media (prefers-reduced-motion: reduce) {",
            "  :root { --motion-press-scale: 1; --motion-enter-scale: 1; --motion-enter-offset: 0px; --motion-stagger: 0ms; --duration-480: 160ms; --duration-320: 160ms; --duration-240: 120ms; }",
            "}", ""]
    for _, fam, styles in TYPE_GROUPS:
        for n, s, lh, ls, w, _ in styles:
            extra = " text-transform: uppercase;" if n == "overline" else ""
            extra += " font-variant-numeric: tabular-nums;" if n.startswith("numeric") else ""
            out.append(f".{n} {{ font-family: var(--font-{fam}); font-size: {s}px; line-height: {lh}px; "
                       f"letter-spacing: {ls}; font-weight: {w};{extra} }}")
    return "\n".join(out) + "\n"


def code_json():
    prim = dict(PRIMITIVES)
    return {
        "color": {
            "primitive": prim,
            "light": {n: resolve(l, prim) for n, l, d, u in SEMANTIC},
            "dark": {n: resolve(d, prim) for n, l, d, u in SEMANTIC},
            "alias": {n: {"light": l.strip("{}"), "dark": d.strip("{}")} for n, l, d, u in SEMANTIC},
        },
        "type": {n: {"group": g, "fontSize": s, "lineHeight": lh, "letterSpacing": ls, "fontWeight": w}
                 for g, _, styles in TYPE_GROUPS for n, s, lh, ls, w, _ in styles},
        "space": {f"space-{v}": v for v, _ in SPACE},
        "size": {n: int(v[:-2]) for n, v, _ in SIZE},
        "radius": {n: int(v[:-2]) for n, v, _ in RADIUS},
        "borderWidth": {n: int(v[:-2]) for n, v, _ in BORDER},
        "breakpoint": {n: int(v[:-2]) for n, v, _ in BREAKPOINT},
        "duration": {n: int(v[:-2]) for n, v, _ in DURATION},
        "easing": {n: v for n, v, _ in EASING},
        "motion": {n: v for n, v, _ in MOTION_MISC},
    }


if __name__ == "__main__":
    (ROOT / "project").mkdir(exist_ok=True)
    (ROOT / "code").mkdir(exist_ok=True)
    (ROOT / "project/tokens.json").write_text(json.dumps(page_tokens(), indent=2, ensure_ascii=False) + "\n")
    (ROOT / "code/tokens.css").write_text(code_css())
    (ROOT / "code/tokens.json").write_text(json.dumps(code_json(), indent=2) + "\n")
    print("wrote project/tokens.json, code/tokens.css, code/tokens.json")

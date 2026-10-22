// Our business index, matching Figma (Templates → 21 Our business, 86:9492).
// The lines come from the same data as the Home tiles, listed with what runs today first. Statuses [confirm].
import { businessLines } from "./home";

export const businessHero = {
  eyebrow: "Our business",
  title: "Seven businesses across the energy value chain.",
  lead: "Some run today; others are being built. Every line is labelled, so you know which is which.",
};

export const businessIndex = [...businessLines]
  .sort((a, b) => Number(a.status === "in-development") - Number(b.status === "in-development"))
  .map((line) => ({ ...line, tags: line.services.split(" · ") }));

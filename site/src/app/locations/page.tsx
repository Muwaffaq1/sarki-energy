import type { Metadata } from "next";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import styles from "./locations.module.css";

export const metadata: Metadata = {
  title: "Find a location",
  description: "Sarki Energy station locations will be listed here as they open.",
  alternates: { canonical: "/locations" },
};

// The locator (map, filters, list) arrives with the first station. Until then, an honest empty state.
export default function LocationsPage() {
  return (
    <PageShell>
      <PageHero status="in-development" eyebrow="Find a location" title="No stations are open yet." lead="The Sarki Energy station network is in development. This page will show every station, with products, hours and directions, as they open." />
      <section className="section" style={{ paddingTop: 0 }} aria-label="Locations">
        <div className="container">
          <div className={styles.empty}>
            <MapPin size={40} aria-hidden="true" />
            <p className="heading-4">Stations will appear here.</p>
            <p className={styles.muted}>Need fuel or gas now? We deliver through Energy supply & trading.</p>
            <div className={styles.actions}>
              <Button href="/quote?category=petroleum" variant="primary">Order fuel or gas</Button>
              <Button href="/stations" variant="secondary">About the station network</Button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

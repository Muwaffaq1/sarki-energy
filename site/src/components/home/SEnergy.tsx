import { Check, ChartLineUp, GasCan, GasPump, Gauge, MagnifyingGlass, Receipt, SolarPanel } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { CapabilityStatus } from "@/components/ui/Status";
import { TextLink } from "@/components/ui/TextLink";
import { senergy } from "@/content/home";
import styles from "./SEnergy.module.css";

const QUICK_ACTIONS = [
  { label: "Order cooking gas", Icon: GasCan },
  { label: "Order fuel", Icon: GasPump },
  { label: "Solar installation", Icon: SolarPanel },
  { label: "Energy audit", Icon: Gauge },
  { label: "Pay energy bills", Icon: Receipt },
  { label: "Monitor usage", Icon: ChartLineUp },
];

/** SEnergyPhone (Figma 64:432): a marketing mockup of the app home screen, not a product spec. */
export function Phone() {
  return (
    <div className={styles.phone} aria-hidden="true">
      <div className={styles.screen}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span className={styles.muted}>SEnergy</span>
        </div>
        <div className={styles.greeting}>
          <div>
            <p className={`caption ${styles.muted}`}>Good morning</p>
            <p className="heading-4">Amina</p>
          </div>
          <span className={styles.avatar} />
        </div>
        <div className={styles.search}>
          <MagnifyingGlass size={16} />
          <span>Search fuel, gas, solar…</span>
        </div>
        <p className="label">Quick actions</p>
        <div className={styles.quick}>
          {QUICK_ACTIONS.map(({ label, Icon }) => (
            <div key={label} className={styles.action}>
              <span className={styles.disc}><Icon size={18} /></span>
              <span className="label-sm">{label}</span>
            </div>
          ))}
        </div>
        <div className={styles.order}>
          <div className={styles.orderTop}>
            <span className="label">LPG refill · 12.5 kg</span>
            <span className={`label-sm ${styles.eta}`}>2:30 pm</span>
          </div>
          <span className="caption">On the way to Wuse II</span>
          <span className={styles.progress}><span /></span>
        </div>
      </div>
    </div>
  );
}

export function SEnergy() {
  return (
    <section className="section" aria-labelledby="senergy-title">
      <div className={`container ${styles.split}`}>
        <div className={styles.stage}>
          <Phone />
        </div>
        <div className={styles.copy}>
          <CapabilityStatus status="in-development" />
          <p className="overline" style={{ color: "var(--ink-muted)" }}>SEnergy</p>
          <h2 id="senergy-title" className={`heading-1 ${styles.title}`}>{senergy.title}</h2>
          <p className={`body-lg ${styles.body}`}>{senergy.body}</p>
          <ul className={styles.features}>
            {senergy.features.map((f) => (
              <li key={f}>
                <Check size={20} className={styles.check} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button href="/senergy" variant="primary" size="lg">Explore SEnergy</Button>
            <TextLink href="/senergy#early-access">Get early access</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

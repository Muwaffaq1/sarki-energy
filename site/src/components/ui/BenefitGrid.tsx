import { Icon, type IconName } from "./Icon";
import styles from "./BenefitGrid.module.css";

/** BenefitItem (Figma 18:70), icon variant, in a 3- or 4-up row: icon disc, title, one line. */
export function BenefitGrid({
  items,
  columns = 4,
}: {
  items: { title: string; text: string; icon: IconName }[];
  columns?: 3 | 4;
}) {
  return (
    <ul className={`${styles.grid} ${columns === 3 ? styles.three : ""}`}>
      {items.map((item) => (
        <li key={item.title} className={styles.item}>
          <span className={styles.disc}>
            <Icon name={item.icon} size={24} />
          </span>
          <h3 className="heading-4">{item.title}</h3>
          <p className={styles.text}>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

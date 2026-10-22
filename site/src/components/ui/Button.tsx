import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant =
  | "accent" // the one key action per view (Volt, black label)
  | "primary" // ink fill
  | "secondary" // outline on page surfaces
  | "on-inverse" // outline on surface-inverse bands
  | "on-photo"; // outline over photography (hero)

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  block?: boolean;
  className?: string;
};

/** Pill action. Sizes: md 40, lg 48. Every button on the site navigates, so it renders a link. */
export function Button({ href, children, variant = "primary", size = "md", iconLeft, iconRight, block, className }: Props) {
  const cls = [styles.button, styles[variant], styles[size], block && styles.block, className].filter(Boolean).join(" ");
  return (
    <Link href={href} className={cls}>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </Link>
  );
}

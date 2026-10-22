"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CaretDown, List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { CapabilityStatus } from "@/components/ui/Status";
import { contact } from "@/content/home";
import { menus, plainLinks, type Menu } from "@/content/navigation";
import styles from "./SiteHeader.module.css";

/**
 * Site header (Figma SiteHeader 12:204).
 * overlay: Home only. Sits on the hero photo in white and turns solid while a mega menu is open.
 * solid: every other page. White bar with a hairline, sticky on scroll.
 * Menus open on click, close on Escape, outside click or navigation.
 */
export function SiteHeader({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Desktop mega menu: Escape returns focus to its trigger; a click outside the header closes it.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.getElementById(`trigger-${openMenu}`)?.focus();
      setOpenMenu(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu]);

  // Mobile drawer: Escape closes it and the page behind stops scrolling.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [drawerOpen]);

  const solid = variant === "solid" || openMenu !== null;
  const close = () => setOpenMenu(null);

  return (
    <header ref={headerRef} className={`${styles.header} ${styles[variant]}`} data-solid={solid}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label="Sarki Energy home" onClick={close}>
          <Logo tone={solid ? "default" : "on-photo"} size={32} />
          <span>Sarki Energy</span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {menus.map((m) => (
            <button
              key={m.id}
              id={`trigger-${m.id}`}
              type="button"
              className={styles.navItem}
              aria-expanded={openMenu === m.id}
              aria-controls={`menu-${m.id}`}
              onClick={() => setOpenMenu((cur) => (cur === m.id ? null : m.id))}
            >
              {m.label}
              <CaretDown size={16} className={styles.caret} aria-hidden="true" />
            </button>
          ))}
          {plainLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navItem} onClick={close}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/search" className={styles.iconButton} aria-label="Search" onClick={close}>
            <MagnifyingGlass size={20} aria-hidden="true" />
          </Link>
          <Button href="/contact" variant={solid ? "secondary" : "on-photo"} className={styles.desktopOnly}>Talk to us</Button>
          <Button href="/quote" variant="accent" className={styles.desktopOnly}>Request a quote</Button>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="site-drawer"
            onClick={() => setDrawerOpen(true)}
          >
            <List size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      {menus.map((m) => (
        <MegaMenu key={m.id} menu={m} open={openMenu === m.id} onNavigate={close} />
      ))}

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

function MegaMenu({ menu, open, onNavigate }: { menu: Menu; open: boolean; onNavigate: () => void }) {
  return (
    <div id={`menu-${menu.id}`} className={styles.panel} hidden={!open}>
      <div className={styles.intro}>
        <p className={styles.introOverline}>{menu.intro.overline}</p>
        <p className={styles.introTitle}>{menu.intro.title}</p>
        <p className={styles.introLead}>{menu.intro.lead}</p>
        <ul className={styles.introLinks}>
          {menu.intro.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={styles.arrowLink} onClick={onNavigate}>
                {l.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.columns}>
        {menu.columns.map((col, i) => (
          <div key={i} className={styles.column}>
            {/* Columns without a heading keep the space so items line up with their neighbours. */}
            <p className={styles.columnHeading} aria-hidden={!col.heading}>{col.heading ?? " "}</p>
            <ul>
              {col.items.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className={styles.item} onClick={onNavigate}>
                    <span className={styles.itemTitle}>
                      {item.title}
                      {item.status ? <CapabilityStatus status={item.status} /> : null}
                    </span>
                    {item.text ? <span className={styles.itemText}>{item.text}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {menu.feature ? (
          <div className={styles.feature}>
            <p className={styles.featureOverline}>{menu.feature.overline}</p>
            <p className={styles.featureTitle}>{menu.feature.title}</p>
            <p className={styles.featureBody}>{menu.feature.body}</p>
            <Link href={menu.feature.link.href} className={`${styles.arrowLink} ${styles.featureLink}`} onClick={onNavigate}>
              {menu.feature.link.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div id="site-drawer" className={styles.drawer} hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
      <div className={styles.drawerTop}>
        <Link href="/" className={styles.drawerBrand} onClick={onClose}>
          <Logo size={28} />
          <span>Sarki Energy</span>
        </Link>
        <Link href="/search" className={styles.drawerIcon} aria-label="Search" onClick={onClose}>
          <MagnifyingGlass size={24} aria-hidden="true" />
        </Link>
        <button type="button" className={styles.drawerIcon} aria-label="Close menu" onClick={onClose}>
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Main" className={styles.drawerNav}>
        <ul>
          {menus.map((m) => {
            const isOpen = expanded === m.id;
            const items = m.columns.flatMap((c) => c.items);
            return (
              <li key={m.id} className={styles.drawerRow}>
                <button
                  type="button"
                  className={styles.drawerSection}
                  aria-expanded={isOpen}
                  aria-controls={`drawer-${m.id}`}
                  onClick={() => setExpanded(isOpen ? null : m.id)}
                >
                  {m.label}
                  <CaretDown size={20} className={styles.caret} aria-hidden="true" />
                </button>
                <ul id={`drawer-${m.id}`} className={styles.drawerItems} hidden={!isOpen}>
                  {items.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} onClick={onClose}>
                        {item.title}
                        {item.status ? <CapabilityStatus status={item.status} /> : null}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={m.intro.links[0].href} onClick={onClose}>{m.intro.links[0].label}</Link>
                  </li>
                </ul>
              </li>
            );
          })}
          {plainLinks.map((l) => (
            <li key={l.href} className={styles.drawerRow}>
              <Link href={l.href} className={styles.drawerSection} onClick={onClose}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.drawerActions}>
        <Button href="/quote" variant="accent" size="lg" block>Request a quote</Button>
        <Button href="/contact" variant="secondary" size="lg" block>Talk to us</Button>
        <p className={styles.drawerContact}>
          <a href={contact.phoneHref}>{contact.phone}</a> · <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </div>
    </div>
  );
}

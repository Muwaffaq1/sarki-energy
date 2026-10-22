"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, GasPump, HardHat, SolarPanel, Warehouse } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";
import styles from "./Hero.module.css";

// Client-side icon map (the hero is the only client section that needs icons).
const SLIDE_ICONS = { "gas-pump": GasPump, "solar-panel": SolarPanel, warehouse: Warehouse, "hard-hat": HardHat } as const;

/**
 * Hero / Immersive (Figma 57:7078). Full-bleed photo per business line under a dark scrim.
 * Slides advance every 6s, driven by the progress bar's CSS animation, and crossfade over 480ms.
 * Picking a tab jumps to it and stops the auto-advance. No auto-advance under reduced motion.
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAutoplay(false);
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const next = () => setActive((i) => (i + 1) % hero.slides.length);
  const choose = (i: number) => {
    setActive(i);
    setAutoplay(false);
  };

  const current = hero.slides[active];

  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-autoplay={autoplay} data-paused={paused}>
      <div className={styles.media} aria-hidden="true">
        {hero.slides.map((slide, i) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className={styles.photo}
            data-active={i === active}
          />
        ))}
        <div className={styles.scrim} />
      </div>


      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          {hero.eyebrow}
        </p>
        <h1 id="hero-title" className={styles.title}>{hero.title}</h1>
        <p className={styles.lead}>
          <span className={styles.leadLong}>{hero.lead}</span>
          <span className={styles.leadShort}>{hero.leadShort}</span>
        </p>
        <div className={styles.actions}>
          <Button href={hero.primary.href} variant="accent" size="lg" iconRight={<ArrowRight size={20} aria-hidden="true" />}>
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} variant="on-photo" size="lg">{hero.secondary.label}</Button>
        </div>
      </div>

      {/* Desktop: four frosted tabs. */}
      <div
        className={styles.tabs}
        role="group"
        aria-label="Business lines"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {hero.slides.map((slide, i) => {
          const Icon = SLIDE_ICONS[slide.icon as keyof typeof SLIDE_ICONS];
          const isActive = i === active;
          return (
            <button key={slide.title} type="button" className={styles.tab} aria-pressed={isActive} onClick={() => choose(i)}>
              <span className={styles.tabTop}>
                <Icon size={20} aria-hidden="true" className={isActive ? styles.tabIconActive : undefined} />
                <span>{String(i + 1).padStart(2, "0")}&nbsp;&nbsp;{slide.title}</span>
              </span>
              <span className={styles.tabText}>{slide.text}</span>
              <span className={styles.track} aria-hidden="true">
                {isActive ? <span key={active} className={styles.bar} onAnimationEnd={next} /> : null}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile and tablet: current line plus four bars. */}
      <div className={styles.indicator}>
        <p className={styles.current} aria-live="polite">
          <span className={styles.number}>{String(active + 1).padStart(2, "0")}</span> {current.title}
        </p>
        <div className={styles.bars}>
          {hero.slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              className={styles.barButton}
              aria-label={`Show ${slide.title}`}
              aria-pressed={i === active}
              data-state={i < active ? "done" : i === active ? "active" : "todo"}
              onClick={() => choose(i)}
            >
              {i === active ? <span key={active} className={styles.bar} onAnimationEnd={next} /> : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { WhatsAppButton } from "./WhatsAppButton";

/** Inner-page frame: solid header, main content, footer and the floating WhatsApp button. */
export function PageShell({ children, whatsapp = true }: { children: ReactNode; whatsapp?: boolean }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      {whatsapp ? <WhatsAppButton /> : null}
    </>
  );
}

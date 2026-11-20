"use client";

import { useSyncExternalStore } from "react";
import { contact } from "@/config/site";

const subscribe = () => () => {};

/**
 * Zeigt die öffentliche Kontaktadresse (contact.displayEmail) an und
 * verlinkt auf die tatsächliche Empfängeradresse. Der mailto-Link wird erst
 * im Browser zusammengesetzt, damit die Adresse nicht im HTML steht
 * (Schutz vor einfachen Spam-Robotern).
 */
export function MailLink({
  className,
  children,
  subject,
}: {
  className?: string;
  children?: React.ReactNode;
  subject?: string;
}) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  let href = "/kontakt/";
  if (isClient) {
    const [user, domain] = contact.recipientEmail.split("@");
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    href = `mailto:${user}@${domain}${query}`;
  }

  return (
    <a href={href} className={className}>
      {children ?? contact.displayEmail}
    </a>
  );
}

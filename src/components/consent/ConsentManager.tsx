"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import { analytics } from "@/config/site";

type Consent = "granted" | "denied";

/* Kleiner Speicher für die Einwilligung (localStorage + Ereignis für Live-Updates) */
const EVENT = "pds-consent-change";

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(analytics.storageKey);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(value: Consent | null) {
  try {
    if (value) window.localStorage.setItem(analytics.storageKey, value);
    else window.localStorage.removeItem(analytics.storageKey);
  } catch {
    /* Speichern nicht möglich – Banner erscheint beim nächsten Besuch erneut */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Öffnet den Cookie-Hinweis erneut (z. B. aus dem Footer). */
export function openConsentSettings() {
  writeConsent(null);
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Lädt das Google-Tag – ausschließlich nach Einwilligung, nur einmal pro Seite. */
function loadGoogleAnalytics(id: string) {
  if (document.getElementById("google-tag")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);
  const script = document.createElement("script");
  script.id = "google-tag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}

/** Löscht Analytics-Cookies nach Widerruf. */
function removeAnalyticsCookies() {
  const host = window.location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    for (const domain of ["", `; domain=.${host}`, `; domain=${host}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  });
}

export function ConsentManager() {
  const id = analytics.measurementId;
  const consent = useSyncExternalStore(subscribe, readConsent, () => "denied" as Consent);

  useEffect(() => {
    if (!id) return;
    if (consent === "granted") {
      loadGoogleAnalytics(id);
    } else if (consent === "denied" && document.getElementById("google-tag")) {
      // Widerruf: Cookies entfernen und Seite neu laden, damit das Tag nicht weiterläuft
      removeAnalyticsCookies();
      window.location.reload();
    }
  }, [consent, id]);

  if (!id || consent !== null) return null;

  const { banner } = analytics;
  return (
    <div
      role="region"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:max-w-md"
    >
      <div className="rounded-[1.5rem] border border-line bg-paper p-5 shadow-window sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-forest">
            <Cookie className="size-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-[1rem] font-semibold leading-snug text-ink">{banner.title}</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
              {banner.text}{" "}
              <Link href="/datenschutz/#analytics" className="text-ink underline decoration-sage decoration-2 underline-offset-2">
                Mehr erfahren
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => writeConsent("denied")}
            className="h-11 rounded-full border border-line-strong bg-paper font-display text-[0.9rem] font-semibold text-ink transition-colors hover:bg-mint"
          >
            {banner.decline}
          </button>
          <button
            type="button"
            onClick={() => writeConsent("granted")}
            className="h-11 rounded-full border border-ink bg-ink font-display text-[0.9rem] font-semibold text-cream transition-colors hover:bg-forest"
          >
            {banner.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Link „Cookie-Einstellungen“ für den Footer */
export function ConsentSettingsButton({ className }: { className?: string }) {
  if (!analytics.measurementId) return null;
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie-Einstellungen
    </button>
  );
}

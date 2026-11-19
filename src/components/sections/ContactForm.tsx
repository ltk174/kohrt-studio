"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Copy, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contact, contactSection } from "@/config/site";
import { cn } from "@/lib/format";

type FormState = {
  name: string;
  company: string;
  email: string;
  website: string;
  service: string;
  message: string;
};

const noopSubscribe = () => () => {};

const initialState: Omit<FormState, "service"> = {
  name: "",
  company: "",
  email: "",
  website: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Bitte gib deinen Namen an.";
  if (!values.email.trim()) errors.email = "Bitte gib deine E-Mail-Adresse an.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Bitte prüfe deine E-Mail-Adresse.";
  if (!values.message.trim()) errors.message = "Erzähl mir kurz von deinem Vorhaben.";
  return errors;
}

function buildMessage(values: FormState) {
  const service = contactSection.serviceOptions.find((option) => option.value === values.service)?.label ?? values.service;
  return [
    `Name: ${values.name.trim()}`,
    `Unternehmen: ${values.company.trim() || "–"}`,
    `E-Mail: ${values.email.trim()}`,
    `Bestehende Website: ${values.website.trim() || "–"}`,
    `Gewünschte Leistung: ${service}`,
    "",
    "Nachricht:",
    values.message.trim(),
  ].join("\n");
}

const inputClass =
  "mt-2 block w-full rounded-xl border border-line-strong bg-cream px-4 text-[1rem] text-ink placeholder:text-ink-muted/70 transition-[border-color,box-shadow] duration-300 hover:border-ink/40 focus:border-forest focus:outline-none focus:ring-4 focus:ring-sage/30 aria-[invalid=true]:border-[#B4533F]";

/**
 * Kontaktformular – erste Version ohne Server:
 * Beim Absenden wird eine vorausgefüllte E-Mail im E-Mail-Programm geöffnet (mailto).
 * Es werden keine Daten auf dieser Website gespeichert.
 */
export function ContactForm({ className }: { className?: string }) {
  const [fields, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Leistung aus der URL vorauswählen, z. B. /kontakt/?leistung=landingpage
  const preset = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("leistung"),
    () => null,
  );
  const [serviceChoice, setServiceChoice] = useState<string | null>(null);
  const validPreset = contactSection.serviceOptions.some((option) => option.value === preset) ? preset : null;
  const service = serviceChoice ?? validPreset ?? contactSection.serviceOptions[0].value;
  const values: FormState = { ...fields, service };

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const update = (field: keyof typeof initialState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    const subject = `Projektanfrage – ${values.company.trim() || values.name.trim()}`;
    const [user, domain] = contact.recipientEmail.split("@");
    const href = `mailto:${user}@${domain}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(values))}`;
    window.location.href = href;
    setSent(true);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(buildMessage(values));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (sent) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={cn("rounded-[var(--radius-card)] bg-paper p-7 text-ink outline-none sm:p-10", className)}
      >
        <span className="grid size-14 place-items-center rounded-full bg-mint text-forest">
          <MailCheck className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-display-sm font-semibold">Fast geschafft!</h3>
        <p className="mt-4 text-ink-soft">
          Dein E-Mail-Programm sollte sich jetzt mit deiner vorbereiteten Anfrage geöffnet haben. Du musst sie dort nur noch
          absenden.
        </p>
        <div className="mt-8 rounded-2xl bg-cream p-5 text-[0.92rem] text-ink-soft">
          <p>
            Es hat sich nichts geöffnet? Kopiere deine Nachricht und sende sie einfach an{" "}
            <strong className="font-semibold text-ink">{contact.displayEmail}</strong>.
          </p>
          <button
            type="button"
            onClick={copyMessage}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-4 py-2 font-display text-[0.85rem] font-semibold text-ink transition-colors hover:bg-mint"
          >
            {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
            {copied ? "Nachricht kopiert" : "Nachricht kopieren"}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-[0.9rem] font-medium text-ink underline decoration-sage decoration-2 underline-offset-4"
        >
          Zurück zum Formular
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-label="Projektanfrage"
      className={cn("rounded-[var(--radius-card)] bg-paper p-6 text-ink shadow-lift sm:p-10", className)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputClass, "h-13")}
            required
          />
        </Field>
        <Field label="Unternehmen" name="company" hint="optional">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={update("company")}
            className={cn(inputClass, "h-13")}
          />
        </Field>
        <Field label="E-Mail" name="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClass, "h-13")}
            required
          />
        </Field>
        <Field label="Bestehende Website" name="website" hint="optional">
          <input
            id="website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="www.beispiel.de"
            value={values.website}
            onChange={update("website")}
            className={cn(inputClass, "h-13")}
          />
        </Field>
      </div>

      <fieldset className="mt-7">
        <legend className="font-display text-[0.9rem] font-semibold text-ink">Gewünschte Leistung</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {contactSection.serviceOptions.map((option) => (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value={option.value}
                checked={values.service === option.value}
                onChange={() => setServiceChoice(option.value)}
                className="peer sr-only"
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-cream px-4 py-2.5 text-[0.92rem] text-ink-soft transition-colors hover:border-ink/40 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:ring-4 peer-focus-visible:ring-sage/40">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Nachricht" name="message" error={errors.message} required className="mt-7">
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Erzähl mir kurz von deinem Unternehmen und deinen Vorstellungen …"
          className={cn(inputClass, "min-h-36 resize-y py-3.5")}
          required
        />
      </Field>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit">Anfrage vorbereiten</Button>
        <p className="max-w-xs text-[0.8rem] leading-relaxed text-ink-muted">
          Beim Absenden öffnet sich dein E-Mail-Programm mit deiner Anfrage. Auf dieser Website werden keine Daten
          gespeichert.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  hint,
  error,
  required,
  className,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("block", className)}>
      <label htmlFor={name} className="flex items-baseline justify-between gap-3 font-display text-[0.9rem] font-semibold">
        <span>
          {label}
          {required && (
            <span className="text-forest" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
        {hint && <span className="text-[0.78rem] font-normal text-ink-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-[0.85rem] font-medium text-[#A4432F]">
          {error}
        </p>
      )}
    </div>
  );
}

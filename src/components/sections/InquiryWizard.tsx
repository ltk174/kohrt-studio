"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  Check,
  Ellipsis,
  Hammer,
  Inbox,
  LayoutGrid,
  LayoutTemplate,
  MailCheck,
  MonitorSmartphone,
  Palette,
  RefreshCcw,
  Scissors,
  Search,
  Sparkles,
  Stethoscope,
  Store,
  Trees,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formDelivery, freeDraft, inquiry } from "@/config/site";
import { cn } from "@/lib/format";

/* ------------------------------------------------------------------ */
/* Datenmodell                                                         */
/* ------------------------------------------------------------------ */

type Answers = {
  projectType: string;
  industry: string;
  goals: string[];
  style: string;
  palette: string;
  sections: string[];
  materials: string[];
  timeline: string;
  budget: string;
  care: string;
  name: string;
  company: string;
  email: string;
  city: string;
  website: string;
  note: string;
};

const initialAnswers: Answers = {
  projectType: "",
  industry: "",
  goals: [],
  style: "",
  palette: "",
  sections: [...inquiry.defaultSections],
  materials: [],
  timeline: "",
  budget: "",
  care: "",
  name: "",
  company: "",
  email: "",
  city: "",
  website: "",
  note: "",
};

type Option = { value: string; label: string };

const icons: Record<string, LucideIcon> = {
  "neue-website": MonitorSmartphone,
  modernisierung: RefreshCcw,
  landingpage: LayoutTemplate,
  sonstiges: Ellipsis,
  handwerk: Hammer,
  garten: Trees,
  beauty: Sparkles,
  friseur: Scissors,
  gastronomie: UtensilsCrossed,
  gesundheit: Stethoscope,
  handel: Store,
  dienstleistung: Briefcase,
  andere: Ellipsis,
  anfragen: Inbox,
  termine: CalendarCheck,
  image: BadgeCheck,
  google: Search,
  angebot: LayoutGrid,
  personal: Users,
};

function labelOf(list: readonly Option[], value: string) {
  return list.find((option) => option.value === value)?.label ?? "";
}

function labelsOf(list: readonly Option[], values: string[]) {
  return list.filter((option) => values.includes(option.value)).map((option) => option.label);
}

/* ------------------------------------------------------------------ */
/* Briefing für E-Mail und KI-Entwurf                                  */
/* ------------------------------------------------------------------ */

function buildBriefing(a: Answers) {
  const palette = inquiry.palettes.find((p) => p.value === a.palette);
  const style = inquiry.styles.find((s) => s.value === a.style);
  const paletteText = palette
    ? `${palette.label}${palette.colors.length ? ` (${palette.colors.join(", ")})` : ""}`
    : "–";
  const have = labelsOf(inquiry.materials, a.materials);
  const missing = inquiry.materials.filter((m) => !a.materials.includes(m.value)).map((m) => m.label);
  const company = a.company.trim();
  const city = a.city.trim();
  const industry = labelOf(inquiry.industries, a.industry);
  const goals = labelsOf(inquiry.goals, a.goals).join(", ");
  const sections = labelsOf(inquiry.sections, a.sections).join(", ");

  const overview = [
    `Unternehmen: ${company}${city ? ` (${city})` : ""}`,
    `Ansprechpartner: ${a.name.trim()} · ${a.email.trim()}`,
    `Projekt: ${labelOf(inquiry.projectTypes, a.projectType)}`,
    `Branche: ${industry}`,
    `Ziele: ${goals}`,
    `Stil: ${style?.label ?? "–"}`,
    `Farbwelt: ${paletteText}`,
    `Bereiche: ${sections}`,
    `Vorhanden: ${have.length ? have.join(", ") : "noch nichts"}`,
    `Bestehende Website: ${a.website.trim() || "–"}`,
    `Zeitrahmen: ${labelOf(inquiry.timelines, a.timeline) || "–"}`,
    `Budget: ${labelOf(inquiry.budgets, a.budget) || "–"}`,
    `Website-Care: ${labelOf(inquiry.care, a.care) || "–"}`,
    `Hinweise: ${a.note.trim() || "–"}`,
  ];

  const prompt = [
    `Erstelle einen ersten Designentwurf für die Startseite der Website von „${company}“, einem Unternehmen aus dem Bereich ${industry}${city ? ` in ${city}` : ""}.`,
    `Projekt: ${labelOf(inquiry.projectTypes, a.projectType)}. Ziele: ${goals}.`,
    `Stil: ${style?.label ?? "modern"}. Farbwelt: ${paletteText}.`,
    `Bereiche der Startseite: ${sections}.`,
    `Vorhanden: ${have.length ? have.join(", ") : "nichts"}${missing.length ? `; fehlt noch: ${missing.join(", ")} (bitte passende Platzhalter verwenden)` : ""}.`,
    a.note.trim() ? `Besondere Hinweise: ${a.note.trim()}.` : "",
    `Anforderungen: deutschsprachig, responsiv, klare Handlungsaufforderung, SEO-freundliche Struktur mit sinnvollen Überschriften${city ? ` und regionalem Bezug zu ${city}` : ""}.`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    subject: `Kostenloser Erstentwurf – ${company}`,
    body: ["ANFRAGE: KOSTENLOSER ERSTENTWURF", "", ...overview, "", "KI-BRIEFING", prompt].join("\n"),
  };
}

/* ------------------------------------------------------------------ */
/* Schritte                                                            */
/* ------------------------------------------------------------------ */

type StepId = "projekt" | "branche" | "ziele" | "stil" | "inhalte" | "rahmen" | "kontakt";

const steps: { id: StepId; title: string; subtitle: string; auto?: boolean }[] = [
  { id: "projekt", title: "Worum geht es?", subtitle: "Wähle aus, was am besten passt.", auto: true },
  { id: "branche", title: "In welcher Branche bist du tätig?", subtitle: "So kann ich den Entwurf passend gestalten.", auto: true },
  { id: "ziele", title: "Was soll deine Website erreichen?", subtitle: "Mehrfachauswahl möglich." },
  { id: "stil", title: "Welcher Stil passt zu dir?", subtitle: "Dein Bauchgefühl reicht völlig." },
  { id: "inhalte", title: "Welche Bereiche brauchst du?", subtitle: "Typische Bereiche sind schon vorausgewählt." },
  { id: "rahmen", title: "Noch ein paar Eckdaten", subtitle: "Alle Angaben sind freiwillig." },
  { id: "kontakt", title: "Wohin darf dein Entwurf?", subtitle: "Fast geschafft – nur noch deine Kontaktdaten." },
];

function validate(id: StepId, a: Answers): Partial<Record<keyof Answers, string>> {
  const errors: Partial<Record<keyof Answers, string>> = {};
  if (id === "projekt" && !a.projectType) errors.projectType = "Bitte wähle eine Option.";
  if (id === "branche" && !a.industry) errors.industry = "Bitte wähle deine Branche.";
  if (id === "ziele" && a.goals.length === 0) errors.goals = "Bitte wähle mindestens ein Ziel.";
  if (id === "stil") {
    if (!a.style) errors.style = "Bitte wähle einen Stil.";
    if (!a.palette) errors.palette = "Bitte wähle eine Farbwelt.";
  }
  if (id === "inhalte" && a.sections.length === 0) errors.sections = "Bitte wähle mindestens einen Bereich.";
  if (id === "kontakt") {
    if (!a.name.trim()) errors.name = "Bitte gib deinen Namen an.";
    if (!a.company.trim()) errors.company = "Bitte gib den Namen deines Unternehmens an.";
    if (!a.email.trim()) errors.email = "Bitte gib deine E-Mail-Adresse an.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email.trim())) errors.email = "Bitte prüfe deine E-Mail-Adresse.";
  }
  return errors;
}

const noopSubscribe = () => () => {};

/* ------------------------------------------------------------------ */
/* Komponente                                                          */
/* ------------------------------------------------------------------ */

/**
 * Mehrstufiger Anfrage-Assistent für den kostenlosen Erstentwurf.
 * Fast nur Klicks, kaum Tippen. Beim Absenden wird die Anfrage samt
 * strukturiertem KI-Briefing direkt über Web3Forms per E-Mail zugestellt –
 * ohne E-Mail-Programm und ohne dass die Empfängeradresse sichtbar ist.
 */
export function InquiryWizard({ className }: { className?: string }) {
  const preset = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("leistung"),
    () => null,
  );
  const validPreset = inquiry.projectTypes.some((option) => option.value === preset) ? (preset as string) : "";

  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof Answers, string>>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pointerSelect = useRef(false);
  const hasNavigated = useRef(false);
  const autoTimer = useRef<number | null>(null);

  // Vorauswahl aus der URL (z. B. /kontakt/?leistung=landingpage)
  const values: Answers = { ...answers, projectType: answers.projectType || validPreset };
  const step = steps[stepIndex];

  useEffect(() => {
    if (!hasNavigated.current) return;
    headingRef.current?.focus({ preventScroll: true });
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      rootRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  }, [stepIndex, sent]);

  useEffect(
    () => () => {
      if (autoTimer.current) window.clearTimeout(autoTimer.current);
    },
    [],
  );

  const goTo = (index: number) => {
    hasNavigated.current = true;
    setErrors({});
    setStepIndex(Math.max(0, Math.min(steps.length - 1, index)));
  };

  const next = (state: Answers = values) => {
    const nextErrors = validate(step.id, state);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return false;
    goTo(stepIndex + 1);
    return true;
  };

  const setSingle = (field: keyof Answers, value: string) => {
    const nextState = { ...values, [field]: value };
    setAnswers(nextState);
    setErrors((current) => ({ ...current, [field]: undefined }));
    // Bei Mausklick/Touch automatisch weiter – nicht bei Pfeiltasten-Navigation
    if (step.auto && pointerSelect.current) {
      if (autoTimer.current) window.clearTimeout(autoTimer.current);
      autoTimer.current = window.setTimeout(() => next(nextState), 260);
    }
    pointerSelect.current = false;
  };

  const toggleMulti = (field: "goals" | "sections" | "materials", value: string) => {
    setAnswers((current) => {
      const list = current[field];
      return { ...current, [field]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
    });
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const setText = (field: keyof Answers) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswers((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step.id !== "kontakt") {
      next();
      return;
    }
    const nextErrors = validate("kontakt", values);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      rootRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (sending) return;
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || formDelivery.accessKey;
    if (!accessKey) {
      setSendError("Das Formular ist noch nicht vollständig eingerichtet. Bitte versuche es später noch einmal.");
      return;
    }
    const { subject, body } = buildBriefing(values);
    setSending(true);
    setSendError("");
    try {
      const response = await fetch(formDelivery.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: formDelivery.fromName,
          name: values.name.trim(),
          email: values.email.trim(),
          unternehmen: values.company.trim(),
          message: body,
          botcheck: honeypotRef.current?.checked ?? false,
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (!response.ok || !result?.success) throw new Error("Versand fehlgeschlagen");
      hasNavigated.current = true;
      setSent(true);
    } catch {
      setSendError(
        "Deine Anfrage konnte leider nicht gesendet werden. Bitte prüfe deine Internetverbindung und versuche es noch einmal.",
      );
    } finally {
      setSending(false);
    }
  };

  /* ---------------- Erfolg ---------------- */
  if (sent) {
    return (
      <div ref={rootRef} className={cn("scroll-mt-28 rounded-[var(--radius-card)] bg-paper p-7 text-ink sm:p-10", className)}>
        <span className="grid size-14 place-items-center rounded-full bg-mint text-forest">
          <MailCheck className="size-6" aria-hidden="true" />
        </span>
        <h3 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-display-sm font-semibold outline-none" role="status">
          Vielen Dank, {values.name.trim().split(" ")[0]}!
        </h3>
        <p className="mt-4 text-ink-soft">
          Deine Anfrage ist bei mir angekommen. Ich mache mich jetzt an deinen kostenlosen Erstentwurf für{" "}
          <strong className="font-semibold text-ink">{values.company.trim()}</strong>. Er kann bereits innerhalb von{" "}
          {freeDraft.hours} Stunden bei dir sein – ich melde mich unter der angegebenen E-Mail-Adresse.
        </p>
        <ul className="mt-8 space-y-3 rounded-2xl bg-cream p-5 text-[0.92rem] text-ink-soft">
          {["Anfrage erhalten", "Erstentwurf wird gestaltet", "Du erhältst deinen Designvorschlag per E-Mail"].map((item, index) => (
            <li key={item} className="flex items-center gap-3">
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold",
                  index === 0 ? "bg-forest text-cream" : "border border-line-strong text-ink-muted",
                )}
              >
                {index === 0 ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : index + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ---------------- Assistent ---------------- */
  const errorText = Object.values(errors).filter(Boolean)[0];
  const showWebsiteField = values.materials.includes("website") || values.projectType === "modernisierung";

  return (
    <div ref={rootRef} className={cn("scroll-mt-28", className)}>
      <form
        noValidate
        onSubmit={submit}
        aria-label={inquiry.title}
        className="flex min-h-[36rem] flex-col rounded-[var(--radius-card)] bg-paper p-5 text-ink shadow-lift sm:p-8"
      >
        {/* Fortschritt */}
        <div className="flex items-center justify-between gap-4 text-[0.8rem] font-medium text-ink-muted">
          <span>
            Schritt <span className="tabular-nums text-ink">{stepIndex + 1}</span> von {steps.length}
          </span>
          <span>{inquiry.duration}</span>
        </div>
        <div
          className="mt-3 grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={stepIndex + 1}
          aria-label="Fortschritt der Anfrage"
        >
          {steps.map((s, index) => (
            <span
              key={s.id}
              className={cn(
                "h-1.5 rounded-full transition-colors duration-500",
                index <= stepIndex ? "bg-forest" : "bg-ink/10",
              )}
            />
          ))}
        </div>

        <div key={step.id} className="wizard-step mt-8 flex-1">
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] outline-none sm:text-[1.85rem]"
          >
            {step.title}
          </h3>
          <p className="mt-2 text-[0.95rem] text-ink-soft">{step.subtitle}</p>

          <div className="mt-7">
            {step.id === "projekt" && (
              <ChoiceGrid columns="sm:grid-cols-2" label={step.title}>
                {inquiry.projectTypes.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    type="radio"
                    name="projectType"
                    checked={values.projectType === option.value}
                    onPointerDown={() => (pointerSelect.current = true)}
                    onChange={() => setSingle("projectType", option.value)}
                    icon={icons[option.value]}
                    label={option.label}
                    hint={option.hint}
                  />
                ))}
              </ChoiceGrid>
            )}

            {step.id === "branche" && (
              <ChoiceGrid columns="grid-cols-2 sm:grid-cols-3" label={step.title}>
                {inquiry.industries.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    type="radio"
                    name="industry"
                    compact
                    checked={values.industry === option.value}
                    onPointerDown={() => (pointerSelect.current = true)}
                    onChange={() => setSingle("industry", option.value)}
                    icon={icons[option.value]}
                    label={option.label}
                  />
                ))}
              </ChoiceGrid>
            )}

            {step.id === "ziele" && (
              <ChoiceGrid columns="grid-cols-2" label={step.title}>
                {inquiry.goals.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    type="checkbox"
                    name="goals"
                    compact
                    checked={values.goals.includes(option.value)}
                    onChange={() => toggleMulti("goals", option.value)}
                    icon={icons[option.value]}
                    label={option.label}
                  />
                ))}
              </ChoiceGrid>
            )}

            {step.id === "stil" && (
              <div className="space-y-8">
                <ChoiceGrid columns="grid-cols-2 sm:grid-cols-3" label="Stil">
                  {inquiry.styles.map((option) => (
                    <ChoiceCard
                      key={option.value}
                      type="radio"
                      name="style"
                      compact
                      checked={values.style === option.value}
                      onChange={() => setSingle("style", option.value)}
                      label={option.label}
                      visual={<StylePreview font={option.font} colors={option.colors} />}
                    />
                  ))}
                </ChoiceGrid>
                <div>
                  <p className="font-display text-[1.05rem] font-semibold">Und welche Farbwelt gefällt dir?</p>
                  <ChoiceGrid columns="grid-cols-2 sm:grid-cols-3" label="Farbwelt" className="mt-4">
                    {inquiry.palettes.map((option) => (
                      <ChoiceCard
                        key={option.value}
                        type="radio"
                        name="palette"
                        compact
                        checked={values.palette === option.value}
                        onChange={() => setSingle("palette", option.value)}
                        label={option.label}
                        visual={<PaletteSwatch colors={option.colors} value={option.value} />}
                      />
                    ))}
                  </ChoiceGrid>
                </div>
              </div>
            )}

            {step.id === "inhalte" && (
              <div className="space-y-8">
                <ChipGroup label="Bereiche der Website">
                  {inquiry.sections.map((option) => (
                    <Chip
                      key={option.value}
                      type="checkbox"
                      name="sections"
                      checked={values.sections.includes(option.value)}
                      onChange={() => toggleMulti("sections", option.value)}
                      label={option.label}
                    />
                  ))}
                </ChipGroup>
                <div>
                  <p className="font-display text-[1.05rem] font-semibold">Was ist schon vorhanden?</p>
                  <p className="mt-1 text-[0.88rem] text-ink-muted">Was fehlt, ergänze ich im Entwurf mit passenden Platzhaltern.</p>
                  <ChipGroup label="Vorhandenes Material" className="mt-4">
                    {inquiry.materials.map((option) => (
                      <Chip
                        key={option.value}
                        type="checkbox"
                        name="materials"
                        checked={values.materials.includes(option.value)}
                        onChange={() => toggleMulti("materials", option.value)}
                        label={option.label}
                      />
                    ))}
                  </ChipGroup>
                </div>
              </div>
            )}

            {step.id === "rahmen" && (
              <div className="space-y-7">
                {(
                  [
                    ["timeline", "Wann soll die Website online gehen?", inquiry.timelines],
                    ["budget", "Welches Budget hast du ungefähr eingeplant?", inquiry.budgets],
                    ["care", "Interesse an der monatlichen Betreuung (ab 29 €)?", inquiry.care],
                  ] as const
                ).map(([field, question, options]) => (
                  <div key={field}>
                    <p className="font-display text-[1.05rem] font-semibold">{question}</p>
                    <ChipGroup label={question} className="mt-3">
                      {options.map((option) => (
                        <Chip
                          key={option.value}
                          type="radio"
                          name={field}
                          checked={values[field] === option.value}
                          onChange={() => setSingle(field, option.value)}
                          label={option.label}
                        />
                      ))}
                    </ChipGroup>
                  </div>
                ))}
              </div>
            )}

            {step.id === "kontakt" && (
              <div className="space-y-6">
                <Summary values={values} onEdit={goTo} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField label="Dein Name" name="name" autoComplete="name" value={values.name} onChange={setText("name")} error={errors.name} required />
                  <TextField
                    label="Name deines Unternehmens"
                    name="company"
                    autoComplete="organization"
                    value={values.company}
                    onChange={setText("company")}
                    error={errors.company}
                    required
                  />
                  <TextField
                    label="E-Mail"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={setText("email")}
                    error={errors.email}
                    required
                  />
                  <TextField
                    label="Ort / Region"
                    name="city"
                    autoComplete="address-level2"
                    hint="optional"
                    placeholder="z. B. Musterstadt"
                    value={values.city}
                    onChange={setText("city")}
                  />
                  {showWebsiteField && (
                    <TextField
                      label="Bestehende Website"
                      name="website"
                      inputMode="url"
                      autoComplete="url"
                      hint="optional"
                      placeholder="www.beispiel.de"
                      value={values.website}
                      onChange={setText("website")}
                      className="sm:col-span-2"
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="note" className="flex items-baseline justify-between gap-3 font-display text-[0.9rem] font-semibold">
                    Möchtest du noch etwas ergänzen?
                    <span className="text-[0.78rem] font-normal text-ink-muted">optional</span>
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    rows={2}
                    value={values.note}
                    onChange={setText("note")}
                    placeholder="z. B. was dein Unternehmen besonders macht"
                    className={cn(inputClass, "min-h-20 resize-y py-3")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Spam-Schutz (für Menschen unsichtbar) */}
        <input ref={honeypotRef} type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" className="hidden" />

        {/* Fehlermeldung des Schritts bzw. des Versands */}
        <p aria-live="polite" role={sendError ? "alert" : undefined} className="mt-6 min-h-6 text-[0.9rem] font-medium text-[#A4432F]">
          {step.id !== "kontakt" ? errorText : sendError}
        </p>

        {/* Navigation */}
        <div className="mt-2 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={() => goTo(stepIndex - 1)}
              className="inline-flex items-center gap-2 self-start rounded-full px-2 py-2 font-display text-[0.92rem] font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Zurück
            </button>
          ) : (
            <span className="text-[0.85rem] text-ink-muted">Kostenlos & unverbindlich</span>
          )}
          {step.id === "kontakt" ? (
            <Button type="submit" disabled={sending} aria-busy={sending}>
              {sending ? "Wird gesendet …" : "Erstentwurf anfordern"}
            </Button>
          ) : (
            <button
              type="submit"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-ink pl-6 pr-2 font-display font-semibold text-cream transition-colors hover:bg-forest"
            >
              Weiter
              <span className="grid size-9 place-items-center rounded-full bg-cream/10 transition-transform duration-500 group-hover:translate-x-0.5">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
        {step.id === "kontakt" && (
          <p className="mt-5 text-[0.8rem] leading-relaxed text-ink-muted">
            {inquiry.privacyNote} Dein Erstentwurf kann innerhalb von {freeDraft.hours} Stunden bei dir sein ({freeDraft.footnote.charAt(0).toLowerCase() + freeDraft.footnote.slice(1, -1)}).
          </p>
        )}
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bausteine                                                           */
/* ------------------------------------------------------------------ */

const inputClass =
  "mt-2 block w-full rounded-xl border border-line-strong bg-cream px-4 text-[1rem] text-ink placeholder:text-ink-muted/70 transition-[border-color,box-shadow] duration-300 hover:border-ink/40 focus:border-forest focus:outline-none focus:ring-4 focus:ring-sage/30 aria-[invalid=true]:border-[#B4533F]";

function ChoiceGrid({
  children,
  columns,
  label,
  className,
}: {
  children: React.ReactNode;
  columns: string;
  label: string;
  className?: string;
}) {
  return (
    <fieldset className={className}>
      <legend className="sr-only">{label}</legend>
      <div className={cn("grid gap-3", columns)}>{children}</div>
    </fieldset>
  );
}

function ChoiceCard({
  type,
  name,
  checked,
  onChange,
  onPointerDown,
  label,
  hint,
  icon: Icon,
  visual,
  compact = false,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  onPointerDown?: () => void;
  label: string;
  hint?: string;
  icon?: LucideIcon;
  visual?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <label
      onPointerDown={onPointerDown}
      className={cn(
        "group relative flex cursor-pointer flex-col rounded-2xl border bg-cream transition-[border-color,background-color,box-shadow,transform] duration-300",
        "hover:-translate-y-0.5 hover:border-ink/35 has-focus-visible:ring-4 has-focus-visible:ring-sage/50",
        checked ? "border-ink bg-mint shadow-soft" : "border-line-strong",
        compact ? "gap-3 p-3.5" : "gap-4 p-5",
      )}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-3 top-3 grid size-5 place-items-center rounded-full border transition-colors",
          checked ? "border-ink bg-ink text-cream" : "border-line-strong bg-paper text-transparent",
        )}
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
      {visual}
      {Icon && (
        <span
          aria-hidden="true"
          className={cn(
            "grid place-items-center rounded-xl transition-colors",
            compact ? "size-9" : "size-11",
            checked ? "bg-forest text-cream" : "bg-paper text-forest",
          )}
        >
          <Icon className={compact ? "size-[1.1rem]" : "size-5"} strokeWidth={1.8} />
        </span>
      )}
      <span className="pr-6">
        <span className={cn("block font-display font-semibold leading-snug tracking-[-0.015em]", compact ? "text-[0.92rem]" : "text-[1.05rem]")}>
          {label}
        </span>
        {hint && <span className="mt-1 block text-[0.85rem] leading-snug text-ink-muted">{hint}</span>}
      </span>
    </label>
  );
}

function ChipGroup({ children, label, className }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <fieldset className={className}>
      <legend className="sr-only">{label}</legend>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </fieldset>
  );
}

function Chip({
  type,
  name,
  checked,
  onChange,
  label,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="cursor-pointer">
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-cream px-4 py-2.5 text-[0.92rem] text-ink-soft transition-colors hover:border-ink/40 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:ring-4 peer-focus-visible:ring-sage/40">
        {checked && <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />}
        {label}
      </span>
    </label>
  );
}

function StylePreview({ font, colors }: { font: string; colors: readonly string[] }) {
  const [bg, fg, accent] = colors;
  const fontClass =
    font === "serif"
      ? "font-accent text-[1.35rem]"
      : font === "bold"
        ? "font-display text-[1.05rem] font-extrabold uppercase tracking-tight"
        : font === "rounded"
          ? "font-display text-[1.15rem] font-medium"
          : "font-sans text-[1.1rem] font-semibold tracking-tight";
  return (
    <span aria-hidden="true" className="block overflow-hidden rounded-xl ring-1 ring-ink/10" style={{ backgroundColor: bg }}>
      <span className="flex h-16 flex-col justify-center gap-1.5 px-3">
        <span className={cn("leading-none", fontClass)} style={{ color: fg }}>
          Aa
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-10 rounded-full opacity-40" style={{ backgroundColor: fg }} />
          <span className="h-3 w-6 rounded-full" style={{ backgroundColor: accent }} />
        </span>
      </span>
    </span>
  );
}

function PaletteSwatch({ colors, value }: { colors: readonly string[]; value: string }) {
  if (colors.length === 0) {
    const Icon = value === "firmenfarben" ? Palette : Sparkles;
    return (
      <span aria-hidden="true" className="flex h-10 items-center gap-2 text-forest">
        <span className="grid size-10 place-items-center rounded-full border border-dashed border-ink/30 bg-paper">
          <Icon className="size-4" />
        </span>
      </span>
    );
  }
  return (
    <span aria-hidden="true" className="flex h-10 items-center">
      {colors.map((color, index) => (
        <span
          key={color}
          className="size-10 rounded-full ring-2 ring-paper"
          style={{ backgroundColor: color, marginLeft: index === 0 ? 0 : -10 }}
        />
      ))}
    </span>
  );
}

function Summary({ values, onEdit }: { values: Answers; onEdit: (index: number) => void }) {
  const items: { label: string; value: string; step: number }[] = [
    { label: "Projekt", value: labelOf(inquiry.projectTypes, values.projectType), step: 0 },
    { label: "Branche", value: labelOf(inquiry.industries, values.industry), step: 1 },
    { label: "Ziele", value: labelsOf(inquiry.goals, values.goals).join(", "), step: 2 },
    {
      label: "Stil",
      value: [labelOf(inquiry.styles, values.style), labelOf(inquiry.palettes, values.palette)].filter(Boolean).join(" · "),
      step: 3,
    },
    { label: "Bereiche", value: labelsOf(inquiry.sections, values.sections).join(", "), step: 4 },
  ];
  return (
    <details className="group rounded-2xl bg-cream px-4 py-3 text-[0.88rem]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display font-semibold text-ink [&::-webkit-details-marker]:hidden">
        Deine Auswahl ansehen
        <span className="text-ink-muted transition-transform group-open:rotate-180" aria-hidden="true">
          ▾
        </span>
      </summary>
      <dl className="mt-3 space-y-2 border-t border-line pt-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4">
            <div>
              <dt className="text-ink-muted">{item.label}</dt>
              <dd className="text-ink">{item.value || "–"}</dd>
            </div>
            <button
              type="button"
              onClick={() => onEdit(item.step)}
              className="shrink-0 text-[0.82rem] font-medium text-forest underline decoration-sage underline-offset-4"
            >
              Ändern
            </button>
          </div>
        ))}
      </dl>
    </details>
  );
}

function TextField({
  label,
  name,
  hint,
  error,
  required,
  className,
  ...rest
}: {
  label: string;
  name: keyof Answers;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">) {
  return (
    <div className={className}>
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
      <input
        id={name}
        name={name}
        type={rest.type ?? "text"}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        required={required}
        className={cn(inputClass, "h-13")}
        {...rest}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-[0.85rem] font-medium text-[#A4432F]">
          {error}
        </p>
      )}
    </div>
  );
}

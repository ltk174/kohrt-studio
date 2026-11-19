import fs from "node:fs";
import path from "node:path";
import { Camera } from "lucide-react";
import { owner } from "@/config/site";
import { cn } from "@/lib/format";

/**
 * Portrait von Lars-Timon Kohrt.
 * Beim Build wird geprüft, ob `public/images/lars-timon-kohrt.jpg` existiert.
 * Fehlt die Datei, erscheint automatisch eine gestaltete Platzhalterfläche.
 */
export function Portrait({ className, priority = false }: { className?: string; priority?: boolean }) {
  const filePath = path.join(process.cwd(), "public", owner.portrait.src);
  const hasPhoto = fs.existsSync(filePath);

  return (
    <div className={cn("relative", className)}>
      {/* versetzte Markenfläche */}
      <div aria-hidden="true" className="absolute -bottom-4 -right-4 left-10 top-10 rounded-[2rem] bg-sage/45 sm:-bottom-6 sm:-right-6" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={owner.portrait.src}
            alt={owner.portrait.alt}
            width={owner.portrait.width}
            height={owner.portrait.height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="size-full object-cover object-[50%_30%]"
          />
        ) : (
          <div className="grain flex size-full flex-col justify-between p-7 sm:p-9">
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
              <div className="absolute inset-x-0 top-1/3 border-t border-ink/10" />
              <div className="absolute inset-x-0 top-2/3 border-t border-ink/10" />
              <div className="absolute inset-y-0 left-1/3 border-l border-ink/10" />
              <div className="absolute inset-y-0 left-2/3 border-l border-ink/10" />
              <div className="absolute left-1/2 top-[42%] size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand-deep sm:size-56" />
              <div className="absolute bottom-0 left-1/2 h-[34%] w-[70%] -translate-x-1/2 rounded-t-full bg-sand-deep" />
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-paper/80 px-3 py-1.5 text-[0.78rem] font-medium text-ink-soft backdrop-blur">
              <Camera className="size-3.5" aria-hidden="true" />
              Foto folgt
            </span>
            <p className="max-w-[16rem] text-[0.9rem] text-ink-soft">
              Hier folgt in Kürze ein persönliches Foto von {owner.firstName}.
            </p>
          </div>
        )}
        <div className="absolute bottom-4 right-4 rounded-2xl bg-paper/90 px-4 py-3 shadow-soft backdrop-blur">
          <p className="font-display text-[0.95rem] font-semibold text-ink">{owner.name}</p>
          <p className="text-[0.78rem] text-ink-muted">{owner.role}</p>
        </div>
      </div>
    </div>
  );
}

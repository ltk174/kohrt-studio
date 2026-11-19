import screenshotDims from "@/config/study-screenshots.json";
import { studies, type Study, type StudySlug } from "@/config/site";

type Dims = { width: number; height: number; mobileHeight?: number };

const fallback: Dims = { width: 1440, height: 5400, mobileHeight: 9000 };

export function getStudy(slug: StudySlug): Study {
  const study = studies.find((item) => item.slug === slug);
  if (!study) throw new Error(`Unbekannte Designstudie: ${slug}`);
  return study;
}

export function getScreenshot(study: Study) {
  const dims = (screenshotDims as Record<string, Dims>)[study.slug] ?? fallback;
  const base = study.screenshot;
  return {
    dims,
    src: `${base}-1440.webp`,
    srcSet: `${base}-900.webp 900w, ${base}-1440.webp 1440w, ${base}-2160.webp 2160w`,
    hero: `${base}-hero.webp`,
    mobile: `${base}-mobile.webp`,
    mobileFull: `${base}-mobile-full.webp`,
  };
}

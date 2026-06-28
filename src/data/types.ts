import type { Locale } from '@/i18n/routing';

/** A string available in every supported locale. */
export type Localized = Record<Locale, string>;

export type ProjectVisibility = 'public' | 'private';

export interface ProjectScreenshot {
  src: string;
  alt: string;
  /** Caption describing what's on this screen ("here is X, there is Y"). */
  caption: Localized;
}

export interface Project {
  /** Stable id used for routing/modal state. */
  id: string;
  /** Brand/product name — kept the same across locales. */
  title: string;
  /** Short one-liner shown on the card. */
  tagline: Localized;
  /** Longer description shown in the detail modal. */
  description: Localized;
  /** Main image shown on the card. */
  cover: string;
  /** Intrinsic cover dimensions — used by the public showcase preview. */
  coverWidth?: number;
  coverHeight?: number;
  /** Category id used by the filter (e.g. "commercial", "web"). */
  category: string;
  /** Tech stack chips. */
  tags: string[];
  /**
   * "public"  → code + live link can be shown openly.
   * "private" → commercial/closed work, presented via screenshots only.
   */
  visibility: ProjectVisibility;
  /** Highlighted on the grid when true. */
  featured?: boolean;
  /** Public live URL (omit for private projects you don't want exposed). */
  liveUrl?: string;
  /** Source code URL (omit for closed-source work). */
  githubUrl?: string;
  /** Optional gated/demo entry point (the "demo button"). */
  demoUrl?: string;
  /** Walkthrough screenshots shown in the modal gallery. */
  screenshots: ProjectScreenshot[];
}

/** Pick the right translation for a localized field. */
export function pick(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Add/remove locales here. Each needs a matching messages/<locale>.json file.
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  // Default locale has no prefix (clean "/" URL); others are prefixed ("/pl").
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

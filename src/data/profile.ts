import type { Localized } from './types';

export const profile = {
  name: 'Tigran Mkrtchyan',
  /** Shown under the name in the hero. Localized. */
  roleKey: 'Hero.role',
  email: 'tigranmkrtchyan295@gmail.com',
  location: 'Poland',
  /** Drop your real PDF at frontend/public/cv/cv.pdf */
  cvPath: '/cv/cv.pdf',
  socials: {
    github: 'https://github.com/your-handle',
    linkedin: 'https://www.linkedin.com/in/your-handle',
  },
};

/** A couple of headline numbers for the About section. */
export const stats: { value: string; labelKey: keyof typeof statLabels }[] = [
  { value: '10+', labelKey: 'statProjects' },
  { value: '15+', labelKey: 'statTech' },
  { value: '3+', labelKey: 'statYears' },
];

// Keys map into the About.* messages namespace.
const statLabels = {
  statProjects: true,
  statTech: true,
  statYears: true,
} as const;

export type ProfileTagline = Localized;

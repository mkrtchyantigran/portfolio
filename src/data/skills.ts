export interface Skill {
  subject: string;
  /** 0–100 proficiency, drives the radar chart. */
  level: number;
}

export const skills: Skill[] = [
  { subject: 'React / Next.js', level: 92 },
  { subject: 'TypeScript', level: 88 },
  { subject: 'Node.js', level: 80 },
  { subject: 'UI / Tailwind', level: 86 },
  { subject: 'Databases', level: 74 },
  { subject: 'Cloud / DevOps', level: 70 },
];

/** Flat list of tech chips rendered under the chart. */
export const techChips: string[] = [
  'React',
  'Next.js',
  'TypeScript',
  'Redux Toolkit',
  'Node.js',
  'Tailwind CSS',
  'HeroUI',
  'Framer Motion',
  'PostgreSQL',
  'Docker',
  'Azure',
  'Git',
];

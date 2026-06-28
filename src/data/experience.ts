import type { Localized } from './types';

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'work' | 'education';
  description: Localized;
  tags?: string[];
}

// Work history — shown under the "Experience" subsection.
export const experience: ExperienceEntry[] = [
  {
    id: 'it-department',
    role: 'IT Department Employee',
    company: 'Manufacturing Company · Łódź, Poland',
    period: '2025 — Present',
    type: 'work',
    description: {
      en: 'Developing and maintaining an internal manufacturing management system (a full-stack application). Project details can be found in the Projects section.',
      pl: 'Tworzenie i utrzymywanie wewnętrznego systemu zarządzania produkcją (aplikacja full-stack). Szczegóły projektu znajdują się w sekcji Projekty.',
    },
    tags: [
      'React',
      'TypeScript',
      'Redux Toolkit',
      'Tailwind CSS',
      'Vite',
      'Node.js',
      'Microsoft SQL Server',
      'Windows Server',
      'IIS',
    ],
  },
  {
    id: 'graphic-designer',
    role: 'Graphic Designer & Print Operator',
    company: 'DrukowaneTasiemki · Łódź, Poland',
    period: '2023 — 2025',
    type: 'work',
    description: {
      en: 'Preparing designs for ribbons, clothing labels, tapes and other print materials, printing finalized designs on wide-format paper using plotters, and processing the materials through production machinery.',
      pl: 'Przygotowywanie projektów wstążek, metek odzieżowych, taśm i innych materiałów do druku, drukowanie gotowych projektów na papierze wielkoformatowym przy użyciu ploterów oraz obróbka materiałów na maszynach produkcyjnych.',
    },
    tags: ['CorelDRAW', 'Adobe Illustrator', 'Adobe Photoshop', 'Wasatch SoftRIP'],
  },
];

// Courses — shown under the "Courses" subsection on the same page.
export const courses: ExperienceEntry[] = [
  {
    id: 'fullstack-course',
    role: 'Full-Stack Development Course',
    company: 'Samvel Hayrapetyan [Sami] — Software Engineer',
    period: '05.2025 — Present',
    type: 'education',
    description: {
      en: 'Comprehensive full-stack development program, from the basics to an advanced level.',
      pl: 'Kompleksowy program nauki full-stack — od podstaw do poziomu zaawansowanego.',
    },
    tags: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'OOP',
      'React',
      'Next.js',
      'Redux Toolkit',
    ],
  },
  {
    id: 'frontend-course',
    role: 'Front-End Development Course',
    company: 'Samvel Hayrapetyan [Sami] — Software Engineer',
    period: '2024 — 2025',
    type: 'education',
    description: {
      en: 'Front-end development program focused on the modern React ecosystem.',
      pl: 'Program nauki front-endu skupiony na nowoczesnym ekosystemie React.',
    },
    tags: ['React', 'Redux', 'Next.js'],
  },
];

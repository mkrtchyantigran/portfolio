import type { Project } from './types';

/**
 * Your projects live here. To add one, copy a block and edit it.
 *
 *  - visibility: 'private' → commercial/closed work. Don't set githubUrl;
 *    leave liveUrl out (or use demoUrl for a gated demo). It will be shown
 *    through the screenshot walkthrough only, with a "Private / commercial" badge.
 *  - visibility: 'public'  → set liveUrl and/or githubUrl freely.
 *
 * Images: put files in frontend/public/projects/ and reference them as
 * "/projects/your-file.svg" (or .png/.jpg).
 */
export const projects: Project[] = [
  {
    id: 'nexus-crm',
    title: 'Nexus CRM',
    category: 'commercial',
    visibility: 'private',
    featured: true,
    cover: '/projects/nexus-crm-cover.svg',
    tagline: {
      en: 'A commercial CRM & analytics platform deployed on Azure + Render.',
      pl: 'Komercyjna platforma CRM i analityki wdrożona na Azure + Render.',
    },
    description: {
      en: 'A closed-source CRM I built and shipped for a client: lead pipeline, role-based dashboards, reporting and billing. The code and live app are private, so here is a guided screenshot tour of the main areas. A limited demo can be granted on request.',
      pl: 'CRM o zamkniętym kodzie, który zbudowałem i wdrożyłem dla klienta: pipeline leadów, panele oparte na rolach, raporty i rozliczenia. Kod i aplikacja live są prywatne, więc poniżej jest prezentacja głównych obszarów na zrzutach ekranu. Ograniczone demo mogę udostępnić na życzenie.',
    },
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Azure', 'Render'],
    // No githubUrl and no public liveUrl on purpose — commercial/closed.
    demoUrl: 'https://example.com/demo', // replace with your gated demo, or remove
    screenshots: [
      {
        src: '/projects/nexus-crm-1.svg',
        alt: 'Nexus CRM dashboard',
        caption: {
          en: 'Main dashboard: KPIs at the top, revenue chart in the center, recent activity on the right.',
          pl: 'Główny panel: KPI na górze, wykres przychodów na środku, ostatnia aktywność po prawej.',
        },
      },
      {
        src: '/projects/nexus-crm-2.svg',
        alt: 'Nexus CRM leads pipeline',
        caption: {
          en: 'Leads pipeline: drag-and-drop stages, each card opens a full contact profile.',
          pl: 'Pipeline leadów: etapy przeciągnij-i-upuść, każda karta otwiera pełny profil kontaktu.',
        },
      },
      {
        src: '/projects/nexus-crm-3.svg',
        alt: 'Nexus CRM reports',
        caption: {
          en: 'Reports: filter by period and team; export to CSV is in the top-right corner.',
          pl: 'Raporty: filtrowanie po okresie i zespole; eksport do CSV w prawym górnym rogu.',
        },
      },
      {
        src: '/projects/nexus-crm-4.svg',
        alt: 'Nexus CRM billing',
        caption: {
          en: 'Billing: subscription plans on the left, invoice history table on the right.',
          pl: 'Rozliczenia: plany subskrypcji po lewej, tabela historii faktur po prawej.',
        },
      },
    ],
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    category: 'web',
    visibility: 'public',
    featured: true,
    cover: '/projects/taskflow-cover.svg',
    tagline: {
      en: 'A collaborative kanban board with real-time updates.',
      pl: 'Tablica kanban do współpracy z aktualizacjami w czasie rzeczywistym.',
    },
    description: {
      en: 'An open-source task manager with boards, drag-and-drop, labels and keyboard shortcuts. Built to explore optimistic UI and real-time sync.',
      pl: 'Open-source’owy menedżer zadań z tablicami, przeciąganiem, etykietami i skrótami klawiszowymi. Zbudowany, by eksplorować optymistyczne UI i synchronizację w czasie rzeczywistym.',
    },
    tags: ['React', 'Redux Toolkit', 'Node.js', 'WebSocket'],
    liveUrl: 'https://example.com/taskflow',
    githubUrl: 'https://github.com/your-handle/taskflow',
    screenshots: [
      {
        src: '/projects/taskflow-1.svg',
        alt: 'TaskFlow board',
        caption: {
          en: 'Board view with columns and draggable cards.',
          pl: 'Widok tablicy z kolumnami i przeciąganymi kartami.',
        },
      },
      {
        src: '/projects/taskflow-2.svg',
        alt: 'TaskFlow card detail',
        caption: {
          en: 'Card detail: description, checklist and activity log.',
          pl: 'Szczegóły karty: opis, lista kontrolna i dziennik aktywności.',
        },
      },
    ],
  },
  {
    id: 'devradar',
    title: 'DevRadar',
    category: 'web',
    visibility: 'public',
    cover: '/projects/devradar-cover.svg',
    tagline: {
      en: 'A dashboard that aggregates dev news and GitHub trends.',
      pl: 'Panel agregujący newsy dev i trendy GitHub.',
    },
    description: {
      en: 'A small data dashboard pulling trending repositories and articles, with charts and saved filters. A good demo of data fetching, caching and charts.',
      pl: 'Mały panel danych pobierający trendujące repozytoria i artykuły, z wykresami i zapisanymi filtrami. Dobra demonstracja pobierania danych, cache’owania i wykresów.',
    },
    tags: ['Next.js', 'TypeScript', 'Recharts', 'REST API'],
    liveUrl: 'https://example.com/devradar',
    githubUrl: 'https://github.com/your-handle/devradar',
    screenshots: [
      {
        src: '/projects/devradar-1.svg',
        alt: 'DevRadar overview',
        caption: {
          en: 'Overview with trend charts and a sortable repo table.',
          pl: 'Przegląd z wykresami trendów i sortowalną tabelą repozytoriów.',
        },
      },
    ],
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    category: 'web',
    visibility: 'public',
    cover: '/projects/portfolio-cover.svg',
    tagline: {
      en: 'The site you are looking at — Next.js, HeroUI, Redux, i18n.',
      pl: 'Strona, którą oglądasz — Next.js, HeroUI, Redux, i18n.',
    },
    description: {
      en: 'My portfolio, built with the App Router, HeroUI, Tailwind, Framer Motion, Redux Toolkit and next-intl. Fully responsive, dark/light themes and bilingual.',
      pl: 'Moje portfolio zbudowane z App Router, HeroUI, Tailwind, Framer Motion, Redux Toolkit i next-intl. W pełni responsywne, motywy ciemny/jasny i dwujęzyczne.',
    },
    tags: ['Next.js', 'HeroUI', 'Tailwind', 'Framer Motion', 'next-intl'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/your-handle/portfolio',
    screenshots: [
      {
        src: '/projects/portfolio-1.svg',
        alt: 'Portfolio hero',
        caption: {
          en: 'Hero section with theme and language switchers.',
          pl: 'Sekcja hero z przełącznikami motywu i języka.',
        },
      },
    ],
  },
];

/** Distinct categories for the filter bar, in display order. */
export const projectCategories: string[] = Array.from(
  new Set(projects.map((p) => p.category)),
);

export function getProjectById(id: string | null): Project | undefined {
  if (!id) return undefined;
  return projects.find((p) => p.id === id);
}

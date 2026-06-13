import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, Lock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { projects, getProjectById } from '@/data/projects';
import { pick } from '@/data/types';
import { ProjectGallery } from './_components/ProjectGallery';
import { ProjectActions } from './_components/ProjectActions';

// Pre-render a static page for every project.
export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} — Tigran Mkrtchyan`,
    description: pick(project.tagline, locale as Locale),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale as Locale);

  const project = getProjectById(id);
  if (!project) notFound();

  const t = await getTranslations('Projects');
  const loc = locale as Locale;
  const isPrivate = project.visibility === 'private';

  const shots = project.screenshots.map((s) => ({
    src: s.src,
    alt: s.alt,
    caption: pick(s.caption, loc),
  }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-default-500 transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        {t('back')}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        {isPrivate && (
          <span className="inline-flex items-center gap-1 rounded-full bg-warning-100 px-2.5 py-1 text-xs font-medium text-warning-700">
            <Lock size={12} />
            {t('privateBadge')}
          </span>
        )}
      </div>
      <p className="mt-3 max-w-2xl text-lg text-default-500">
        {pick(project.tagline, loc)}
      </p>

      <div className="mt-8">
        <ProjectGallery shots={shots} />
        <p className="mt-2 text-xs text-default-400">{t('galleryHint')}</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          {isPrivate && (
            <div className="mb-6 rounded-lg border border-warning-200 bg-warning-50 p-4 text-sm text-warning-700">
              {t('privateNote')}
            </div>
          )}
          <p className="leading-relaxed text-default-600">
            {pick(project.description, loc)}
          </p>
        </div>

        <ProjectActions project={project} />
      </div>
    </div>
  );
}

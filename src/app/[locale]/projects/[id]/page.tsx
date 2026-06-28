import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ExternalLink, Github, Lock } from 'lucide-react';
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
        className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-300 ease-out group-hover:-translate-x-1.5"
        />
        {t('back')}
      </Link>

      {shots.length > 0 ? (
        // Private / commercial — title on top, then the screenshot walkthrough.
        <>
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
            <ProjectGallery
              shots={shots}
              hint={t('galleryHint')}
              aside={<ProjectActions project={project} />}
              details={
                <p className="leading-relaxed text-default-600">
                  {pick(project.description, loc)}
                </p>
              }
            />
          </div>
        </>
      ) : (
        // Public project — showcase: big screenshot left, info on the right.
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <Image
            src={project.cover}
            alt={project.title}
            width={project.coverWidth ?? 1600}
            height={project.coverHeight ?? 1000}
            sizes="(max-width: 1024px) 100vw, 520px"
            className="h-auto w-full rounded-2xl border border-default-200 shadow-xl"
            priority
          />

          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 leading-relaxed text-default-600">
              {pick(project.description, loc)}
            </p>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-default-500">
              {t('techStack')}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  <Github size={18} />
                  {t('code')}
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <ExternalLink size={18} />
                  {t('live')}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

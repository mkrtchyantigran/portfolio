import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Reveal } from '@/components/Reveal';

export function FeaturedProjects() {
  const t = useTranslations('Home');
  // Prefer flagged projects; fall back to the first few.
  const featured = projects.filter((p) => p.featured);
  const list = (featured.length > 0 ? featured : projects).slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t('featuredTitle')}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-2 max-w-xl text-default-500">
              {t('featuredSubtitle')}
            </p>
          </Reveal>
        </div>
        <Link
          href="/projects"
          className="group hidden shrink-0 items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:inline-flex"
        >
          {t('viewAll')}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
          />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          href="/projects"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-default-300 px-4 py-3 font-medium transition-colors hover:border-primary hover:text-primary"
        >
          {t('viewAll')}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
          />
        </Link>
      </div>
    </section>
  );
}

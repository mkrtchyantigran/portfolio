'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, ExternalLink, Github, Images, Lock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { pick, type Project } from '@/data/types';
import type { Locale } from '@/i18n/routing';

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Glassy translucent action button — same visual language as the navbar pills.
const actionBtn =
  'inline-flex items-center justify-center gap-1.5 rounded-lg border border-default-200 bg-default-100/60 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-default-100';

/** Glassmorphism card that links to the project's detail page. */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('Projects');
  const locale = useLocale() as Locale;
  const isPrivate = project.visibility === 'private';
  const detailHref = `/projects/${project.id}`;
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-default-200 bg-default-100/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-default-300 hover:bg-default-100/60 hover:shadow-xl">
        {/* Glossy light sweep that glides across the card on hover. */}
        <span className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]" />

        {/* Cover → detail page, with an "Explore" overlay that fades in on hover. */}
        <Link
          href={detailHref}
          className="relative block aspect-[16/10] overflow-hidden bg-default-100"
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {isPrivate && (
            <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-default-200 bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-md">
              <Lock size={12} />
              {t('privateBadge')}
            </span>
          )}

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-background/50 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur-md">
              {t('explore')}
              <ArrowUpRight size={16} />
            </span>
          </div>
        </Link>

        {/* Body */}
        <div className="relative z-10 flex flex-1 flex-col gap-2 p-4">
          <Link
            href={detailHref}
            className="w-fit text-lg font-semibold transition-colors hover:text-primary"
          >
            {project.title}
          </Link>
          <p className="text-sm text-default-500">
            {pick(project.tagline, locale)}
          </p>

          <div className="mt-1 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-default-200 bg-default-100/50 px-2 py-0.5 text-xs text-default-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons. Public → Live + Source; private → screenshots only. */}
          <div className="mt-auto flex gap-2 pt-3">
            {isPrivate ? (
              <Link href={detailHref} className={`${actionBtn} w-full`}>
                <Images size={16} />
                {t('screenshots')}
              </Link>
            ) : hasLinks ? (
              <>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${actionBtn} flex-1`}
                  >
                    <ExternalLink size={16} />
                    {t('live')}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${actionBtn} flex-1`}
                  >
                    <Github size={16} />
                    {t('code')}
                  </a>
                )}
              </>
            ) : (
              <Link href={detailHref} className={`${actionBtn} w-full`}>
                {t('viewDetails')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

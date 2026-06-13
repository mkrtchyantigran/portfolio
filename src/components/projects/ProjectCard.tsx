'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardBody, CardFooter, Chip } from '@heroui/react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { pick, type Project } from '@/data/types';
import type { Locale } from '@/i18n/routing';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/** Card that navigates to the project's own detail page on click. */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('Projects');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const isPrivate = project.visibility === 'private';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Card
        isPressable
        onPress={() => router.push(`/projects/${project.id}`)}
        shadow="sm"
        className="group h-full w-full overflow-hidden border border-default-200"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isPrivate && (
            <Chip
              size="sm"
              color="warning"
              variant="solid"
              startContent={<Lock size={12} />}
              className="absolute left-3 top-3 z-10"
            >
              {t('privateBadge')}
            </Chip>
          )}
        </div>

        <CardBody className="gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-default-400 transition-colors group-hover:text-primary"
            />
          </div>
          <p className="text-sm text-default-500">
            {pick(project.tagline, locale)}
          </p>
        </CardBody>

        <CardFooter className="flex flex-wrap gap-1.5 pt-0">
          {project.tags.slice(0, 4).map((tag) => (
            <Chip key={tag} size="sm" variant="flat">
              {tag}
            </Chip>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

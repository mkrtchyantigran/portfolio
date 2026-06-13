'use client';

import { Button, Chip, Divider } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { ExternalLink, Github, PlayCircle } from 'lucide-react';
import type { Project } from '@/data/types';

/** Tech stack + action buttons sidebar (HeroUI lives in this client island). */
export function ProjectActions({ project }: { project: Project }) {
  const t = useTranslations('Projects');
  const hasActions = Boolean(
    project.liveUrl || project.demoUrl || project.githubUrl,
  );

  return (
    <aside className="h-fit rounded-2xl border border-default-200 p-5">
      <p className="mb-3 text-sm font-medium text-default-500">
        {t('techStack')}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Chip key={tag} size="sm" variant="flat" color="primary">
            {tag}
          </Chip>
        ))}
      </div>

      {hasActions && (
        <>
          <Divider className="my-5" />
          <div className="flex flex-col gap-2">
            {project.liveUrl && (
              <Button
                as="a"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                startContent={<ExternalLink size={16} />}
                fullWidth
              >
                {t('live')}
              </Button>
            )}
            {project.demoUrl && (
              <Button
                as="a"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="flat"
                startContent={<PlayCircle size={16} />}
                fullWidth
              >
                {t('tryDemo')}
              </Button>
            )}
            {project.githubUrl && (
              <Button
                as="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="bordered"
                startContent={<Github size={16} />}
                fullWidth
              >
                {t('code')}
              </Button>
            )}
          </div>
        </>
      )}
    </aside>
  );
}

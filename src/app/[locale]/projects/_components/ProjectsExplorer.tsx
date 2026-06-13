'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategory } from '@/store/slices/uiSlice';
import { projects, projectCategories } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export function ProjectsExplorer() {
  const t = useTranslations('Projects');
  const dispatch = useAppDispatch();
  const active = useAppSelector((s) => s.ui.activeCategory);

  const filters = ['all', ...projectCategories];
  const visible =
    active === 'all'
      ? projects
      : projects.filter((p) => p.category === active);

  const label = (c: string) =>
    c === 'all' ? t('filterAll') : c.charAt(0).toUpperCase() + c.slice(1);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            size="sm"
            radius="full"
            variant={active === f ? 'solid' : 'bordered'}
            color={active === f ? 'primary' : 'default'}
            onPress={() => dispatch(setCategory(f))}
          >
            {label(f)}
          </Button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </>
  );
}

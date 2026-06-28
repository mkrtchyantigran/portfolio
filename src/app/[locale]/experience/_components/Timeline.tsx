'use client';

import { useLocale } from 'next-intl';
import { Chip } from '@heroui/react';
import { Reveal } from '@/components/Reveal';
import type { ExperienceEntry } from '@/data/experience';
import { pick } from '@/data/types';
import type { Locale } from '@/i18n/routing';

export function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  const locale = useLocale() as Locale;

  return (
    <div className="relative mt-5 pl-8">
      {/* Thick two-tone accent bar (green + dark) running down the timeline. */}
      <div
        aria-hidden
        className="absolute left-0 bottom-1 top-1 flex w-2.5 overflow-hidden rounded-full"
      >
        <div className="w-1/2 bg-primary" />
        <div className="w-1/2 bg-slate-700" />
      </div>

      <div className="space-y-9">
        {entries.map((entry, i) => (
          <Reveal key={entry.id} delay={i * 0.05}>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-default-400">
                {entry.period}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-primary">
                {entry.role}
              </h3>
              <p className="text-sm font-medium text-default-600 underline decoration-default-300 underline-offset-4">
                {entry.company}
              </p>
              <p className="mt-2 max-w-2xl leading-relaxed text-default-600">
                {pick(entry.description, locale)}
              </p>
              {entry.tags && entry.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <Chip
                      key={tag}
                      size="sm"
                      variant="bordered"
                      className="border-default-300"
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

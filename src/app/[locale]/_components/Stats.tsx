'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';
import { stats } from '@/data/profile';

export function Stats() {
  const t = useTranslations('About');

  return (
    <div className="grid max-w-xl grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <Reveal key={s.labelKey} delay={0.1 + i * 0.05}>
          <div className="rounded-2xl border border-default-200 p-5 text-center">
            <div className="text-3xl font-bold text-primary">{s.value}</div>
            <div className="mt-1 text-sm text-default-500">{t(s.labelKey)}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

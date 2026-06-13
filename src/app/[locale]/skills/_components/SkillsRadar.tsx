'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Client-only import keeps Recharts out of the server bundle / SSR pass.
const RadarChartInner = dynamic(
  () => import('./RadarChartInner').then((m) => m.RadarChartInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-xl bg-default-100" />
    ),
  },
);

export function SkillsRadar() {
  const t = useTranslations('Skills');

  return (
    <div className="h-[360px] w-full">
      <RadarChartInner label={t('chartLabel')} />
    </div>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Briefcase, GraduationCap } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/PageHeader';
import { experience, courses } from '@/data/experience';
import { Timeline } from './_components/Timeline';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Nav' });
  return { title: `${t('experience')} — Tigran Mkrtchyan` };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('Experience');

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <section className="mt-12">
        <div className="flex items-center gap-2.5">
          <Briefcase className="text-foreground" size={22} />
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t('workTitle')}
          </h2>
        </div>
        <Timeline entries={experience} />
      </section>

      <section className="mt-14">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="text-foreground" size={22} />
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t('coursesTitle')}
          </h2>
        </div>
        <Timeline entries={courses} />
      </section>
    </div>
  );
}

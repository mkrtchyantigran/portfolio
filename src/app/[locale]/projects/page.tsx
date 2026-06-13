import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/PageHeader';
import { ProjectsExplorer } from './_components/ProjectsExplorer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });
  return { title: `${t('title')} — Tigran Mkrtchyan` };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('Projects');

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />
      <ProjectsExplorer />
    </div>
  );
}

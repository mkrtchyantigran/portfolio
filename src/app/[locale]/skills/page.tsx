import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/PageHeader';
import { SkillsRadar } from './_components/SkillsRadar';
import { TechChips } from './_components/TechChips';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Nav' });
  return { title: `${t('skills')} — Tigran Mkrtchyan` };
}

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('Skills');

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="mt-4 grid items-center gap-10 lg:grid-cols-2">
        <SkillsRadar />
        <TechChips />
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/PageHeader';
import { Stats } from './_components/Stats';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Nav' });
  return { title: `${t('about')} — Tigran Mkrtchyan` };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('About');

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <PageHeader title={t('title')} />
      <p className="max-w-3xl text-lg leading-relaxed text-default-600">
        {t('body')}
      </p>
      <div className="mt-12">
        <Stats />
      </div>
    </div>
  );
}

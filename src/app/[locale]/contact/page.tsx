import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from './_components/ContactForm';
import { ContactInfo } from './_components/ContactInfo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Nav' });
  return { title: `${t('contact')} — Tigran Mkrtchyan` };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('Contact');

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="grid gap-10 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}

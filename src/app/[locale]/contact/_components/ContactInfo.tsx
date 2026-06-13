import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

export function ContactInfo() {
  const t = useTranslations('Contact');

  return (
    <div className="flex h-full flex-col justify-center gap-6 rounded-2xl border border-default-200 p-8">
      <div>
        <p className="text-default-500">{t('orEmail')}</p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-1 inline-flex items-center gap-2 text-lg font-medium text-primary hover:underline"
        >
          <Mail size={18} />
          {profile.email}
        </a>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="rounded-full border border-default-200 p-3 transition-colors hover:border-primary hover:text-primary"
        >
          <Github size={20} />
        </a>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="rounded-full border border-default-200 p-3 transition-colors hover:border-primary hover:text-primary"
        >
          <Linkedin size={20} />
        </a>
      </div>
      <p className="text-sm text-default-400">{profile.location}</p>
    </div>
  );
}

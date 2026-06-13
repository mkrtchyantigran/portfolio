import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-default-200">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-default-500 sm:flex-row">
        <p>
          © {year} {profile.name}. {t('rights')}
        </p>

        <div className="flex items-center gap-5">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-primary"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-primary"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="transition-colors hover:text-primary"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="text-default-400">{t('builtWith')}</p>
      </div>
    </footer>
  );
}

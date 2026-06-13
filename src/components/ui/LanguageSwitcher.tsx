'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { ChevronDown, Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LABELS: Record<string, string> = {
  en: 'English',
  pl: 'Polski',
};

const SHORT: Record<string, string> = {
  en: 'EN',
  pl: 'PL',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Lang');
  const [open, setOpen] = useState(false);

  return (
    <Dropdown placement="bottom-end" isOpen={open} onOpenChange={setOpen}>
      <DropdownTrigger>
        <Button
          variant="light"
          size="sm"
          aria-label={t('label')}
          startContent={<Globe size={16} />}
          endContent={
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
            />
          }
        >
          {SHORT[locale] ?? locale.toUpperCase()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={t('label')}
        selectionMode="single"
        selectedKeys={new Set([locale])}
        onAction={(key) => router.replace(pathname, { locale: String(key) })}
      >
        {routing.locales.map((loc) => (
          <DropdownItem
            key={loc}
            startContent={
              <span className="w-6 text-xs font-semibold text-default-400">
                {SHORT[loc]}
              </span>
            }
          >
            {LABELS[loc] ?? loc}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

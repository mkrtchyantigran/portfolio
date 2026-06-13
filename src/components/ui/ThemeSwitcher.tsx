'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@heroui/react';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('Theme');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Before mount we assume light (the default theme) to avoid a hydration flip.
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <Switch
      isSelected={isDark}
      onValueChange={(selected) => setTheme(selected ? 'dark' : 'light')}
      size="lg"
      color="secondary"
      aria-label={t('toggle')}
      classNames={{
        wrapper: 'mx-0',
      }}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Moon size={13} className={className} />
        ) : (
          <Sun size={13} className={className} />
        )
      }
    />
  );
}

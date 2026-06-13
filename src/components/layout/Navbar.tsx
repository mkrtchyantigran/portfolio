'use client';

import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from '@heroui/react';
import { useTranslations } from 'next-intl';
import { FileDown } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { profile } from '@/data/profile';

const NAV = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'projects', href: '/projects' },
  { key: 'skills', href: '/skills' },
  { key: 'contact', href: '/contact' },
] as const;

export function SiteNavbar() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Navbar
      isMenuOpen={open}
      onMenuOpenChange={setOpen}
      maxWidth="lg"
      isBordered
      classNames={{ base: 'backdrop-blur-md bg-background/70' }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link href="/" className="text-lg font-bold text-foreground">
            {profile.name.split(' ')[0]}
            <span className="text-primary">.</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-6 sm:flex" justify="center">
        {NAV.map(({ key, href }) => (
          <NavbarItem key={key} isActive={isActive(href)}>
            <Link
              href={href}
              className={
                isActive(href)
                  ? 'text-sm font-medium text-primary'
                  : 'text-sm text-foreground transition-colors hover:text-primary'
              }
            >
              {t(key)}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-1">
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button
            as="a"
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            variant="flat"
            size="sm"
            startContent={<FileDown size={16} />}
          >
            {t('resume')}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {NAV.map(({ key, href }) => (
          <NavbarMenuItem key={key} isActive={isActive(href)}>
            <Link
              href={href}
              className="w-full text-foreground"
              onClick={() => setOpen(false)}
            >
              {t(key)}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <a
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-primary"
          >
            {t('resume')}
          </a>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

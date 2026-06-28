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
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FileDown } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { profile } from '@/data/profile';

const NAV = [
  // The home page now doubles as "About me", so the landing link is labelled accordingly.
  { key: 'about', href: '/' },
  { key: 'experience', href: '/experience' },
  { key: 'projects', href: '/projects' },
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

      <NavbarContent className="hidden gap-1 sm:flex" justify="center">
        {NAV.map(({ key, href }) => {
          const active = isActive(href);
          return (
            <NavbarItem key={key}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={[
                  'relative rounded-lg px-3.5 py-1.5 text-sm transition-colors duration-300',
                  active
                    ? 'font-medium text-foreground'
                    : 'text-foreground/60 hover:bg-default-100/50 hover:text-foreground',
                ].join(' ')}
              >
                {/* Single shared pill that smoothly slides to the active item */}
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-lg border border-default-200 bg-default-100/70"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {t(key)}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2 sm:gap-3">
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
            variant="light"
            size="sm"
            startContent={<FileDown size={16} />}
            // Same translucent-rectangle look as the active navbar pill.
            className="rounded-lg border border-default-200 bg-default-100/70 text-foreground transition-colors data-[hover=true]:bg-default-100"
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

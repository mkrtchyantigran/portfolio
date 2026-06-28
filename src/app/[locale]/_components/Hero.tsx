'use client';

import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { profile } from '@/data/profile';
import { TechSphere } from './TechSphere';
import { Typewriter } from './Typewriter';

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative overflow-hidden">
      {/* Decorative gradient blobs — fade in with the content so the glow never
          appears on its own before the text/sphere (avoids a "blue flash"). */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-24 sm:pb-24 sm:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          >
        <motion.p variants={item} className="text-default-500">
          {t('greeting')}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-3 text-2xl font-semibold sm:text-3xl"
        >
          <Typewriter texts={[t('role')]} />
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-default-600"
        >
          {t('tagline')}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-default-600"
        >
          {t('tagline2')}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
          <Button
            as="a"
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            radius="full"
            size="lg"
            variant="bordered"
            className="h-14 border-2 border-foreground/70 px-8 text-base font-semibold text-foreground"
          >
            {t('ctaResume')}
          </Button>
          <Button
            as={Link}
            href="/contact"
            radius="full"
            size="lg"
            className="h-14 bg-foreground px-8 text-base font-semibold text-background"
          >
            {t('ctaContact')}
          </Button>
        </motion.div>
          </motion.div>

          <div className="w-full lg:justify-self-end">
            <TechSphere />
          </div>
        </div>
      </div>
    </section>
  );
}

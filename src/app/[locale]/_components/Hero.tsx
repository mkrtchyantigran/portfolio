'use client';

import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { ArrowRight, FileDown, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { profile } from '@/data/profile';

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
        className="mx-auto max-w-5xl px-6 pb-16 pt-24 sm:pb-24 sm:pt-32"
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
          className="mt-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl"
        >
          {t('role')}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-default-600"
        >
          {t('tagline')}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
          <Button
            as={Link}
            href="/projects"
            color="primary"
            size="lg"
            endContent={<ArrowRight size={18} />}
          >
            {t('ctaProjects')}
          </Button>
          <Button
            as={Link}
            href="/contact"
            variant="bordered"
            size="lg"
            startContent={<Mail size={18} />}
          >
            {t('ctaContact')}
          </Button>
          <Button
            as="a"
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            size="lg"
            startContent={<FileDown size={18} />}
          >
            {t('ctaResume')}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

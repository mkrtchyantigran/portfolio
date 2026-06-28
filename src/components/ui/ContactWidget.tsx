'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { Mail, MessageCircle, Send, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { profile } from '@/data/profile';

export function ContactWidget() {
  const t = useTranslations('Widget');
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);

  // Show a small teaser bubble shortly after load.
  useEffect(() => {
    const id = setTimeout(() => setTeaser(true), 1800);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-72 overflow-hidden rounded-2xl border border-default-200 bg-content1 shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-primary/10 px-4 py-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                  {profile.name.charAt(0)}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-content1 bg-success" />
              </div>
              <div>
                <p className="text-sm font-semibold">{profile.name}</p>
                <p className="flex items-center gap-1 text-xs text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  {t('online')}
                </p>
              </div>
            </div>

            <div className="px-4 py-3">
              <p className="text-sm text-default-600">{t('greeting')}</p>
              <div className="mt-3 flex flex-col gap-2">
                <Button
                  as={Link}
                  href="/contact"
                  color="primary"
                  size="sm"
                  startContent={<Send size={14} />}
                  onPress={() => setOpen(false)}
                >
                  {t('writeButton')}
                </Button>
                <Button
                  as="a"
                  href={`mailto:${profile.email}`}
                  variant="flat"
                  size="sm"
                  startContent={<Mail size={14} />}
                >
                  {t('emailButton')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teaser bubble (before the panel is opened) */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.button
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => {
              setOpen(true);
              setTeaser(false);
            }}
            className="max-w-[230px] rounded-2xl rounded-br-sm border border-default-200 bg-content1 px-3.5 py-2.5 text-left text-sm text-default-600 shadow-lg"
          >
            {t('teaser')}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <button
        type="button"
        aria-label={open ? t('close') : t('open')}
        onClick={() => {
          setOpen((o) => !o);
          setTeaser(false);
        }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-success" />
        )}
      </button>
    </div>
  );
}

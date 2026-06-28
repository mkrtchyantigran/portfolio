'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryShot {
  src: string;
  alt: string;
  caption: string;
}

export function ProjectGallery({
  shots,
  hint,
  aside,
  details,
}: {
  shots: GalleryShot[];
  /** Small hint line shown under the thumbnails. */
  hint?: string;
  /** Right rail, second row — e.g. the tech stack panel. */
  aside?: ReactNode;
  /** Left column, second row — e.g. the project description. */
  details?: ReactNode;
}) {
  const [active, setActive] = useState(0);

  if (shots.length === 0) return null;

  const shot = shots[active];
  const go = (dir: number) =>
    setActive((i) => (i + dir + shots.length) % shots.length);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
      {/* Row 1, left: active screenshot — cross-fades when switching */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-default-200 bg-default-100">
        <AnimatePresence>
          <motion.div
            key={shot.src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-contain"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Row 1, right: caption + switcher — stretched to the screenshot height */}
      <div className="flex flex-col rounded-2xl border border-default-200 bg-content1 p-5 lg:self-stretch">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              {active + 1} / {shots.length}
            </span>
            <p className="mt-3 leading-relaxed text-default-700">
              {shot.caption}
            </p>
          </motion.div>
        </AnimatePresence>

        {shots.length > 1 && (
          <div className="mt-auto flex gap-2 pt-5">
            <motion.button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-default-200 text-default-600 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screenshot"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-default-200 text-default-600 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Row 2, left: thumbnails + hint + description */}
      <div className="space-y-4">
        {shots.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {shots.map((s, i) => (
              <motion.button
                key={s.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View screenshot ${i + 1}`}
                aria-current={i === active}
                whileTap={{ scale: 0.94 }}
                className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  i === active
                    ? 'border-primary'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={s.src} alt="" fill sizes="96px" className="object-cover" />
              </motion.button>
            ))}
          </div>
        )}

        {hint && <p className="text-xs text-default-400">{hint}</p>}
        {details}
      </div>

      {/* Row 2, right: tech stack */}
      <div>{aside}</div>
    </div>
  );
}

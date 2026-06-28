'use client';

import { useEffect, useRef, useState } from 'react';

type TypewriterProps = {
  /** Phrases to cycle through (type → pause → erase → next). */
  texts: string[];
  /** Delay between typing each char (ms) */
  typeSpeed?: number;
  /** Delay between erasing each char (ms) */
  eraseSpeed?: number;
  /** Pause once fully typed before erasing (ms) */
  pauseAfterType?: number;
  /** Pause once fully erased before typing the next phrase (ms) */
  pauseAfterErase?: number;
  className?: string;
};

export function Typewriter({
  texts,
  typeSpeed = 90,
  eraseSpeed = 45,
  pauseAfterType = 1600,
  pauseAfterErase = 500,
  className,
}: TypewriterProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'erasing'>('typing');
  const [index, setIndex] = useState(0);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const current = texts[index] ?? '';

  useEffect(() => {
    // Respect users who don't want motion: show the first phrase, no loop.
    if (prefersReduced.current) {
      setCount(current.length);
      return;
    }

    let delay: number;
    if (phase === 'typing') {
      delay = count < current.length ? typeSpeed : pauseAfterType;
    } else {
      delay = count > 0 ? eraseSpeed : pauseAfterErase;
    }

    const timer = setTimeout(() => {
      if (phase === 'typing') {
        if (count < current.length) {
          setCount((c) => c + 1);
        } else {
          setPhase('erasing');
        }
      } else if (count > 0) {
        setCount((c) => c - 1);
      } else {
        // Fully erased — advance to the next phrase and type it.
        setIndex((i) => (i + 1) % texts.length);
        setPhase('typing');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [
    count,
    phase,
    current,
    texts.length,
    typeSpeed,
    eraseSpeed,
    pauseAfterType,
    pauseAfterErase,
  ]);

  return (
    <span className={className} aria-label={texts.join(', ')}>
      <span
        aria-hidden="true"
        className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        {current.slice(0, count)}
      </span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[2px] animate-pulse self-stretch bg-primary align-middle"
        style={{ height: '1em' }}
      />
    </span>
  );
}

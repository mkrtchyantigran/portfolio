'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Move3D } from 'lucide-react';

// Three.js / WebGL must run client-side only.
const TechSphereCanvas = dynamic(() => import('./TechSphereCanvas'), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export function TechSphere() {
  const t = useTranslations('Hero');

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Soft glow behind the sphere */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />

      <div className="absolute inset-0">
        <TechSphereCanvas />
      </div>

      <p className="pointer-events-none absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-xs text-default-400">
        <Move3D size={14} />
        {t('dragHint')}
      </p>
    </div>
  );
}

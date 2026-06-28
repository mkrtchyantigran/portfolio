import type { ReactNode } from 'react';

// A template re-mounts on every navigation. We intentionally keep it as a plain
// passthrough (no opacity/transform animation): a page-wide fade here replayed
// on every reload and navigation, briefly showing an empty/faded page before
// content settled. Per-section entrance animations (Hero, Reveal) handle polish.
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

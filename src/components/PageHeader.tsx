import { Reveal } from '@/components/Reveal';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Optional element rendered above the title (e.g. a back link). */
  eyebrow?: React.ReactNode;
}

/** Consistent heading block for inner pages. */
export function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <div className="mb-10">
      {eyebrow && <div className="mb-4">{eyebrow}</div>}
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.05}>
          <p className="mt-3 max-w-2xl text-lg text-default-500">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

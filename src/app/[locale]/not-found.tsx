import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <p className="text-default-500">This page could not be found.</p>
      <Link
        href="/"
        className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
      >
        Go home
      </Link>
    </div>
  );
}

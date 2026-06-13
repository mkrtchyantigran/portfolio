'use client';

import { useRef, type ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { makeStore, type AppStore } from '@/store';

export function Providers({ children }: { children: ReactNode }) {
  // Create the Redux store once per client.
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const router = useRouter();

  return (
    <ReduxProvider store={storeRef.current}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </ReduxProvider>
  );
}

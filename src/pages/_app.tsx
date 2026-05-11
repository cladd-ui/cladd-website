import { CladdProvider } from '@cladd-ui/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ThemeModeProvider, useThemeMode } from '@/components/ThemeMode';

import '@/styles/globals.css';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = 'G-BSM0796C9V';

function ThemedApp({ Component, pageProps }: AppProps) {
  const { theme } = useThemeMode();
  return (
    <CladdProvider theme={theme}>
      <Component {...pageProps} />
    </CladdProvider>
  );
}

export default function App(props: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag?.('config', GA_ID, { page_path: url });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeModeProvider>
      <ThemedApp {...props} />
    </ThemeModeProvider>
  );
}

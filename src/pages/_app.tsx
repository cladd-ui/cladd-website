import type { AppProps } from 'next/app';
import { UIProvider } from '@cladd-ui/react';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>
  );
}

import { UIProvider } from '@cladd-ui/react';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider theme="dark">
      <Component {...pageProps} />
    </UIProvider>
  );
}

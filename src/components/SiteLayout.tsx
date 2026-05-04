import Head from 'next/head';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface SiteLayoutProps {
  children: ReactNode;
  /** Full <title> string. Required so every page in the site has one. */
  title: string;
  /** Meta description. Required so every page is indexable / shareable. */
  description: string;
}

export function SiteLayout({ children, title, description }: SiteLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cladd" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div className="flex min-h-screen flex-col">
        <header className="flex h-14 items-center justify-between border-b border-cladd-outline px-6">
          <Link href="/" className="font-semibold">
            cladd
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/react/">Docs</Link>
            <Link href="/react/components/button/">Components</Link>
            <a
              href="https://github.com/cladd-ui/cladd"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-cladd-outline px-6 py-6 text-xs text-cladd-fg-soft">
          Built with cladd.
        </footer>
      </div>
    </>
  );
}

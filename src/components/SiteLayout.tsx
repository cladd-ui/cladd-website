import {
  Link,
  Segmented,
  SegmentedButton,
  Toolbar,
  ToolbarButton,
} from '@cladd-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

import { CladdLogo } from './CladdLogo';
import { MoonIcon } from './icons/MoonIcon';
import { MoonOutlineIcon } from './icons/MoonOutlineIcon';
import { SidebarIcon } from './icons/SidebarIcon';
import { SunIcon } from './icons/SunIcon';
import { SunOutlineIcon } from './icons/SunOutlineIcon';
import { SidebarProvider, useSidebar } from './SidebarContext';
import { useThemeMode } from './ThemeMode';

interface SiteLayoutProps {
  children: ReactNode;
  /** Full <title> string. Required so every page in the site has one. */
  title: string;
  /** Meta description. Required so every page is indexable / shareable. */
  description: string;
  withSidebar?: boolean;
}

function HeaderSidebarToggle() {
  const { toggle } = useSidebar();
  return (
    <Toolbar className="lg:hidden" size="sm">
      <ToolbarButton onClick={toggle}>
        <SidebarIcon />
      </ToolbarButton>
    </Toolbar>
  );
}

export function SiteLayout({
  children,
  title,
  description,
  withSidebar,
}: SiteLayoutProps) {
  const { theme, setTheme, toggleTheme } = useThemeMode();
  return (
    <SidebarProvider>
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
        <header className="flex h-14 items-center justify-start gap-4 border-b border-cladd-outline px-4 sm:px-6">
          {withSidebar && <HeaderSidebarToggle />}
          <Link
            as={NextLink}
            href="/"
            className="flex items-center gap-1 font-semibold hover:opacity-75"
          >
            <CladdLogo className="size-8 text-white light:text-black" />
            cladd
          </Link>
          <nav className="ml-auto flex items-center gap-4 text-sm sm:gap-6">
            <Link className="hover:opacity-75" as={NextLink} href="/react/">
              Docs
            </Link>
            <Link
              className="hidden hover:opacity-75 sm:block"
              as={NextLink}
              href="/react/components/button/"
            >
              Components
            </Link>
            <Link
              className="hover:opacity-75"
              as="a"
              href="https://github.com/cladd-ui/cladd"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
            <Toolbar size="sm">
              <ToolbarButton onClick={toggleTheme} className="sm:hidden">
                {theme === 'light' ? <SunIcon /> : <MoonIcon />}
              </ToolbarButton>
              <Segmented activeColor="neutral" className="hidden sm:flex">
                <SegmentedButton
                  active={theme === 'light'}
                  onClick={() => setTheme('light')}
                  aria-label="Light theme"
                >
                  {theme === 'light' ? <SunIcon /> : <SunOutlineIcon />}
                </SegmentedButton>
                <SegmentedButton
                  active={theme === 'dark'}
                  onClick={() => setTheme('dark')}
                  aria-label="Dark theme"
                >
                  {theme === 'dark' ? <MoonIcon /> : <MoonOutlineIcon />}
                </SegmentedButton>
              </Segmented>
            </Toolbar>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-cladd-outline px-4 py-6 text-xs text-cladd-fg-soft sm:px-6">
          Built with cladd.
        </footer>
      </div>
    </SidebarProvider>
  );
}

import {
  Button,
  Link,
  SearchIcon,
  SectionTitle,
  Shortcut,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from '@cladd-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

import { CladdLogo } from './CladdLogo';
import { GithubIcon } from './icons/GithubIcon';
import { LogoXIcon } from './icons/LogoXIcon';
import { MoonIcon } from './icons/MoonIcon';
import { SidebarIcon } from './icons/SidebarIcon';
import { SunIcon } from './icons/SunIcon';
import { SearchDialog } from './SearchDialog';
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
  const { theme, toggleTheme } = useThemeMode();
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K / Ctrl+K opens search from anywhere on the site. We don't bail out on
  // input focus — search shortcuts are global by convention (Stripe, Linear,
  // GitHub) and there's no editor surface here it could collide with.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <SidebarProvider>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cladd" />
        <meta property="og:image" content="https://cladd.io/share.jpg" />
        <meta property="og:image:width" content="2000" />
        <meta property="og:image:height" content="1000" />
        <meta
          property="og:image:alt"
          content="cladd — React UI kit for building actual apps."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://cladd.io/share.jpg" />
        <meta
          name="twitter:image:alt"
          content="cladd — React UI kit for building actual apps."
        />
      </Head>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-11 border-b border-cladd-outline bg-cladd-bg">
          <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-start gap-4 px-4 sm:px-6">
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
                <span className="sm:hidden">Docs</span>
                <span className="hidden sm:block">Documentation</span>
              </Link>
              <Link
                className="hidden hover:opacity-75 xs:block"
                as={NextLink}
                href="/react/components/"
              >
                Components
              </Link>
              <Link className="hover:opacity-75" as={NextLink} href="/mcp/">
                <span className="sm:hidden">MCP</span>
                <span className="hidden sm:block">MCP Server</span>
              </Link>
              <div className="flex items-center gap-2">
                <Button
                  rounded
                  size="lg"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search documentation"
                  className="hidden cursor-pointer justify-start gap-2 font-normal text-cladd-fg-soft sm:flex"
                >
                  <SearchIcon className="size-4" />
                  <span className="hidden lg:block">Search docs...</span>
                  <Shortcut size="sm" className="ml-auto">
                    cmd K
                  </Shortcut>
                </Button>

                <Toolbar size="sm">
                  <ToolbarButton
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search documentation"
                    className="sm:hidden"
                  >
                    <SearchIcon />
                  </ToolbarButton>
                  <ToolbarSeparator className="sm:hidden" />
                  <ToolbarButton
                    as="a"
                    href="https://github.com/cladd-ui/cladd"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon />
                  </ToolbarButton>
                  <ToolbarSeparator />
                  <ToolbarButton onClick={toggleTheme}>
                    {theme === 'light' ? <SunIcon /> : <MoonIcon />}
                  </ToolbarButton>
                </Toolbar>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        <footer className="border-t border-cladd-outline px-4 py-6 text-xs text-cladd-fg-soft sm:px-6">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-start gap-8 px-4 py-12 sm:px-6">
            <div className="grid grid-cols-2 flex-wrap items-start gap-8 xs:grid-cols-3 sm:grid-cols-4 md:flex md:gap-16">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-cladd-fg">
                  <CladdLogo className="size-8 rounded-lg border border-cladd-outline" />
                  <span className="text-sm font-semibold">cladd</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    href="https://x.com/startpage_hq"
                    as="a"
                    className="cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LogoXIcon className="size-4" />
                  </Button>
                  <Button
                    href="https://github.com/cladd-ui/cladd"
                    as="a"
                    className="cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-sm">
                <SectionTitle>Documentation</SectionTitle>
                <div className="flex flex-col gap-2">
                  <Link
                    as={NextLink}
                    href="/react/"
                    className="hover:text-cladd-fg"
                  >
                    Introduction
                  </Link>
                  <Link
                    as={NextLink}
                    href="/react/installation/"
                    className="hover:text-cladd-fg"
                  >
                    Installation
                  </Link>

                  <Link
                    as={NextLink}
                    href="/react/components/button/"
                    className="hover:text-cladd-fg"
                  >
                    Components
                  </Link>
                  <Link
                    as={NextLink}
                    href="/react/foundations/surfaces/"
                    className="hover:text-cladd-fg"
                  >
                    Foundations
                  </Link>
                  <Link
                    as={NextLink}
                    href="/react/hooks/use-theme/"
                    className="hover:text-cladd-fg"
                  >
                    Hooks
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-sm">
                <SectionTitle>Project</SectionTitle>
                <div className="flex flex-col gap-2">
                  <Link
                    as={NextLink}
                    href="/about/"
                    className="hover:text-cladd-fg"
                  >
                    About
                  </Link>
                  <Link
                    as={NextLink}
                    href="/changelog/"
                    className="hover:text-cladd-fg"
                  >
                    Changelog
                  </Link>
                  <Link
                    as={NextLink}
                    href="/mcp/"
                    className="hover:text-cladd-fg"
                  >
                    MCP server
                  </Link>
                  <Link
                    as="a"
                    href="/llms.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cladd-fg"
                  >
                    llms.txt
                  </Link>
                  <Link
                    as="a"
                    href="https://github.com/cladd-ui/cladd"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cladd-fg"
                  >
                    GitHub
                  </Link>
                  <Link
                    as="a"
                    href="https://github.com/cladd-ui/cladd/blob/master/LICENSE"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cladd-fg"
                  >
                    License
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div>
                Code licensed under{' '}
                <Link
                  as="a"
                  href="https://github.com/cladd-ui/cladd/blob/master/LICENSE"
                  target="_blank"
                  className="underline hover:no-underline"
                >
                  MIT
                </Link>
              </div>
              <div>
                Copyright © {new Date().getFullYear()} Built with cladd by{' '}
                <Link as="a" href="https://nolimits4web.com" target="_blank">
                  <img
                    src="/assets/products/logo-n4w.svg"
                    alt="nolimits4web"
                    className="inline size-6 border border-cladd-outline"
                  />
                </Link>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <a
                  title="Start Page HQ"
                  href="https://startpagehq.com"
                  target="_blank"
                  className="opacity-50 grayscale-100 hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    loading="lazy"
                    src="/assets/products/logo-startpagehq.svg"
                    alt="Start Page HQ"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="PaneFlow - Create Stunning Slideshows Visually. No Code Required"
                  href="https://paneflow.com"
                  target="_blank"
                  className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    loading="lazy"
                    src="/assets/products/logo-paneflow.svg"
                    alt="PaneFlow - Create Stunning Slideshows Visually. No Code Required"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="t0ggles - Your ultimate multiple projects management tool"
                  href="https://t0ggles.com"
                  target="_blank"
                  className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    loading="lazy"
                    src="/assets/products/logo-t0ggles.svg"
                    alt="t0ggles - Your ultimate multiple projects management tool"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="Swiper Studio - Create Beautiful And Responsive Sliders Without Writing Any Code"
                  href="https://studio.swiperjs.com"
                  target="_blank"
                  className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    loading="lazy"
                    src="/assets/products/logo-swiper-studio.svg"
                    alt="Swiper Studio - Create Beautiful And Responsive Sliders Without Writing Any Code"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="UI Initiative - Premium templates & plugins for Swiper and Framework7"
                  href="https://uiinitiative.com"
                  target="_blank"
                  className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    loading="lazy"
                    src="/assets/products/logo-uiinitiative.svg"
                    alt="UI Initiative - Premium templates & plugins for Swiper and Framework7"
                    className="inline-block size-6"
                  />
                </a>

                <a
                  title="Cladd - A React UI kit for building actual apps"
                  href="https://cladd.io"
                  target="_blank"
                  className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    loading="lazy"
                    src="/logo-icon.svg"
                    alt="Cladd - A React UI kit for building actual apps"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="Fisper - Local AI Voice Dictation for macOS"
                  href="https://fisper.app"
                  target="_blank"
                  className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    loading="lazy"
                    src="/assets/products/logo-fisper.png"
                    alt="Fisper - Local AI Voice Dictation for macOS"
                    className="inline-block size-6"
                  />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
}

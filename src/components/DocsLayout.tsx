import {
  ListButton,
  SectionTitle,
  Spinner,
  Surface,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
  Link,
} from '@cladd-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CheckIcon } from './icons/CheckIcon';
import { CopyIcon } from './icons/CopyIcon';
import { MarkdownIcon } from './icons/MarkdownIcon';
import { SidebarIcon } from './icons/SidebarIcon';
import { useSidebar } from './SidebarContext';
import { SiteLayout } from './SiteLayout';

interface DocsLayoutProps {
  children: ReactNode;
  /** Full <title> string. Forwarded to SiteLayout. */
  title: string;
  /** Meta description. Forwarded to SiteLayout. */
  description: string;
}

const componentNames = [
  'Backdrop',
  'Button',
  'Checkbox',
  'Chip',
  'Dialog',
  'Input',
  'Link',
  'List',
  'NumberField',
  'NumberScrubber',
  'OTPField',
  'Popover',
  'Popup',
  'Radio',
  'SearchField',
  'SectionTitle',
  'Segmented',
  'Select',
  'Shortcut',
  'Slider',
  'Spinner',
  'Surface',
  'SurfaceCut',
  'Switch',
  'Textarea',
  'Toast',
  'Toolbar',
  'Tooltip',
  'CladdProvider',
];

const hookNames = [
  'useTheme',
  'useAccentColor',
  'useSurface',
  'useDevice',
  'useDialog',
  'useToast',
];

function toKebab(s: string) {
  return s
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const foundationsLinks: { label: string; href: string }[] = [
  { label: 'Surfaces', href: '/react/foundations/surfaces/' },
  { label: 'Colors', href: '/react/foundations/colors/' },
  { label: 'Sizing', href: '/react/foundations/sizing/' },
];

// Per-framework install guides. Reached via the cards on /react/installation/
// — intentionally not surfaced in the sidebar, but they still participate in
// the prev/next chain so each leaf page gets sibling navigation and the
// "Copy as Markdown" toolbar.
const installSubpages: { label: string; href: string }[] = [
  { label: 'Install in Next.js', href: '/react/installation/next/' },
  { label: 'Install in Vite', href: '/react/installation/vite/' },
  {
    label: 'Install in TanStack Start',
    href: '/react/installation/tanstack-start/',
  },
  {
    label: 'Install in React Router',
    href: '/react/installation/react-router/',
  },
  { label: 'Install in Astro', href: '/react/installation/astro/' },
  { label: 'Manual install', href: '/react/installation/manual/' },
];

const sections: { title: string; links: { label: string; href: string }[] }[] =
  [
    {
      title: 'Getting started',
      links: [
        { label: 'Introduction', href: '/react/' },
        { label: 'Installation', href: '/react/installation/' },
        { label: 'TypeScript', href: '/react/typescript/' },
      ],
    },

    {
      title: 'Components',
      links: componentNames.map((name) => ({
        label: name,
        href: `/react/components/${toKebab(name)}/`,
      })),
    },
    {
      title: 'Hooks',
      links: hookNames.map((name) => ({
        label: name,
        href: `/react/hooks/${toKebab(name)}/`,
      })),
    },
    {
      title: 'Foundations',
      links: foundationsLinks,
    },
  ];

// Flatten sections for prev/next, then splice the install sub-pages in
// between Installation and TypeScript so the chain reads:
//   Introduction → Installation → Install in Next.js → … → Manual install → TypeScript → …
const allLinks = (() => {
  const flat = sections.flatMap((s) => s.links);
  const installIdx = flat.findIndex((l) => l.href === '/react/installation/');
  if (installIdx === -1) return [...flat, ...installSubpages];
  return [
    ...flat.slice(0, installIdx + 1),
    ...installSubpages,
    ...flat.slice(installIdx + 1),
  ];
})();

function getNeighbors(currentPath: string) {
  const i = allLinks.findIndex((l) => l.href === currentPath);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? allLinks[i - 1] : null,
    next: i < allLinks.length - 1 ? allLinks[i + 1] : null,
  };
}

// Map a doc route to its Markdown twin. The generator writes one .md file per
// MDX page (see scripts/generate-markdown-docs.mjs): trailing-slash routes
// become a sibling `<name>.md`, and `/react/` itself lands at /react/index.md.
function markdownHref(currentPath: string) {
  if (currentPath === '/react/' || currentPath === '/react') {
    return '/react/index.md';
  }
  return currentPath.replace(/\/$/, '') + '.md';
}

type CopyState = 'idle' | 'loading' | 'copied';

function MarkdownActions({ currentPath }: { currentPath: string }) {
  const [state, setState] = useState<CopyState>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const href = markdownHref(currentPath);

  // Reset to idle whenever the user navigates to a different page — keeps the
  // button from flashing a stale "copied" check on the new doc.
  useEffect(() => {
    setState('idle');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [currentPath]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = async () => {
    if (state === 'loading') return;
    setState('loading');
    try {
      const res = await fetch(href);
      if (!res.ok) throw new Error(`fetch ${href} → ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setState('copied');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setState('idle'), 1200);
    } catch (err) {
      console.error('[docs] failed to copy markdown', err);
      setState('idle');
    }
  };

  return (
    <>
      <Tooltip tooltip={state === 'copied' ? 'Copied!' : 'Copy as Markdown'}>
        <ToolbarButton
          onClick={copy}
          aria-label="Copy page as Markdown"
          className="cursor-pointer"
        >
          {state === 'loading' ? (
            <Spinner size="sm" />
          ) : state === 'copied' ? (
            <CheckIcon />
          ) : (
            <CopyIcon />
          )}
        </ToolbarButton>
      </Tooltip>
      <Tooltip tooltip="View as Markdown">
        <ToolbarButton
          as="a"
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Markdown source in a new tab"
          className="cursor-pointer"
        >
          <MarkdownIcon />
        </ToolbarButton>
      </Tooltip>
    </>
  );
}

function PrevNext({ currentPath }: { currentPath: string }) {
  const { prev, next } = getNeighbors(currentPath);
  if (!prev && !next) return null;
  return (
    <Toolbar size="sm" className="not-prose float-right ml-4">
      <MarkdownActions currentPath={currentPath} />
      <ToolbarSeparator />
      {prev ? (
        <ToolbarButton
          as={NextLink}
          href={prev.href}
          aria-label={`Previous: ${prev.label}`}
          className="cursor-pointer"
        >
          <ArrowLeftIcon />
        </ToolbarButton>
      ) : (
        <ToolbarButton disabled aria-label="No previous page">
          <ArrowLeftIcon />
        </ToolbarButton>
      )}
      {next ? (
        <ToolbarButton
          as={NextLink}
          href={next.href}
          aria-label={`Next: ${next.label}`}
          className="cursor-pointer"
        >
          <ArrowRightIcon />
        </ToolbarButton>
      ) : (
        <ToolbarButton disabled aria-label="No next page">
          <ArrowRightIcon />
        </ToolbarButton>
      )}
    </Toolbar>
  );
}

function PrevNextFooter({ currentPath }: { currentPath: string }) {
  const { prev, next } = getNeighbors(currentPath);
  if (!prev && !next) return null;
  return (
    <div className="not-prose mt-16 flex items-center justify-between">
      {prev ? (
        <Toolbar>
          <ToolbarButton
            as={NextLink}
            href={prev.href}
            className="cursor-pointer"
          >
            <ArrowLeftIcon />
            {prev.label}
          </ToolbarButton>
        </Toolbar>
      ) : (
        <span />
      )}
      {next ? (
        <Toolbar>
          <ToolbarButton
            as={NextLink}
            href={next.href}
            className="cursor-pointer"
          >
            {next.label}
            <ArrowRightIcon />
          </ToolbarButton>
        </Toolbar>
      ) : (
        <span />
      )}
    </div>
  );
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

function OnThisPage({ pageKey }: { pageKey: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector('article.prose');
    if (!article) return;
    const nodes = article.querySelectorAll<HTMLElement>('h2[id], h3[id]');
    const items: Heading[] = Array.from(nodes).map((n) => ({
      id: n.id,
      text: (n.textContent ?? '').trim(),
      level: Number(n.tagName[1]),
    }));
    setHeadings(items);
    setActiveId(items[0]?.id ?? null);
  }, [pageKey]);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-14 flex max-h-[calc(100vh-56px)] flex-col gap-2 overflow-auto px-2 py-12 text-sm">
      <SectionTitle>On this page</SectionTitle>
      <ul className="flex flex-col">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <Link
              as="a"
              href={`#${h.id}`}
              className={`block py-1 transition-colors ${
                activeId === h.id
                  ? 'text-cladd-primary'
                  : 'text-cladd-fg-softer hover:text-cladd-fg'
              }`}
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function DocsLayout({ children, title, description }: DocsLayoutProps) {
  const router = useRouter();
  const currentPath = router.asPath.split(/[?#]/)[0];
  return (
    <SiteLayout title={title} description={description} withSidebar>
      <DocsLayoutContent currentPath={currentPath}>
        {children}
      </DocsLayoutContent>
    </SiteLayout>
  );
}

function DocsLayoutContent({
  children,
  currentPath,
}: {
  children: ReactNode;
  currentPath: string;
}) {
  const { open, animating, toggle } = useSidebar();

  return (
    <div className="mx-auto max-w-[1440px] grid-cols-[220px_minmax(0,1fr)] gap-10 px-4 sm:px-6 lg:grid xl:grid-cols-[220px_minmax(0,1fr)_220px]">
      <div
        aria-hidden={!open}
        onClick={toggle}
        className={`fixed inset-0 z-9 bg-cladd-bg/50 lg:hidden ${
          animating ? 'transition-opacity duration-400' : ''
        } ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <Surface
        as="aside"
        outline
        variant="gradient"
        className={`fixed top-2 bottom-2 left-2 z-11 max-h-[calc(100vh-56px)] w-60 rounded-3xl lg:sticky lg:top-14 lg:bottom-0 lg:left-0 lg:z-0 lg:w-auto lg:translate-x-0 lg:shadow-none ${
          animating ? 'transition-transform duration-400' : ''
        } ${
          open ? 'translate-x-0 shadow-cladd-popover' : 'translate-x-[-110%]'
        }`}
        contentClassName="flex flex-col gap-6 overflow-auto pt-2 pb-12 lg:py-12 text-sm px-4 lg:px-2"
        bgClassName="lg:hidden"
      >
        <Toolbar size="sm" className="-mb-2 -ml-2 self-start lg:hidden">
          <ToolbarButton onClick={toggle}>
            <SidebarIcon />
          </ToolbarButton>
        </Toolbar>
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <SectionTitle>{section.title}</SectionTitle>
            <ul className="flex flex-col">
              {section.links.map((link) => (
                <li key={link.href}>
                  <ListButton
                    as={NextLink}
                    href={link.href}
                    selected={currentPath === link.href}
                    className="cursor-pointer"
                    contentClassName="font-normal text-sm"
                  >
                    {link.label}
                  </ListButton>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Surface>
      <article className="prose mx-auto w-full max-w-3xl min-w-0 py-12">
        <PrevNext currentPath={currentPath} />
        {children}
        <PrevNextFooter currentPath={currentPath} />
      </article>
      <aside className="hidden xl:block">
        <OnThisPage pageKey={currentPath} />
      </aside>
    </div>
  );
}

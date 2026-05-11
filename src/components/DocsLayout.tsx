import {
  ListButton,
  SectionTitle,
  Surface,
  Toolbar,
  ToolbarButton,
  Link,
} from '@cladd-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactNode } from 'react';

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

function toKebab(s: string) {
  return s
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const sections: { title: string; links: { label: string; href: string }[] }[] =
  [
    {
      title: 'Getting started',
      links: [
        { label: 'Introduction', href: '/react/' },
        { label: 'Installation', href: '/react/installation/' },
      ],
    },
    {
      title: 'Components',
      links: componentNames.map((name) => ({
        label: name,
        href: `/react/components/${toKebab(name)}/`,
      })),
    },
  ];

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
    <nav className="sticky top-0 flex max-h-screen flex-col gap-2 overflow-auto px-2 py-12 text-sm">
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
        className={`fixed top-2 bottom-2 left-2 z-10 max-h-screen w-60 rounded-3xl lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:w-auto lg:translate-x-0 lg:shadow-none ${
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
        {children}
      </article>
      <aside className="hidden xl:block">
        <OnThisPage pageKey={currentPath} />
      </aside>
    </div>
  );
}

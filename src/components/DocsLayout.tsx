import { SectionTitle } from '@cladd-ui/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { SiteLayout } from './SiteLayout';

interface DocsLayoutProps {
  children: ReactNode;
  /** Full <title> string. Forwarded to SiteLayout. */
  title: string;
  /** Meta description. Forwarded to SiteLayout. */
  description: string;
}

const sections: { title: string; links: { label: string; href: string }[] }[] =
  [
    {
      title: 'Getting started',
      links: [
        { label: 'Introduction', href: '/docs/' },
        { label: 'Installation', href: '/docs/installation/' },
      ],
    },
    {
      title: 'Components',
      links: [{ label: 'Button', href: '/docs/components/button/' }],
    },
  ];

export function DocsLayout({ children, title, description }: DocsLayoutProps) {
  return (
    <SiteLayout title={title} description={description}>
      <div className="mx-auto grid max-w-6xl grid-cols-[220px_1fr] gap-10 px-6 py-10">
        <aside className="flex flex-col gap-6 text-sm">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <SectionTitle>{section.title}</SectionTitle>
              <ul className="flex flex-col gap-1">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-1 hover:text-cladd-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
        <article className="prose max-w-none">{children}</article>
      </div>
    </SiteLayout>
  );
}

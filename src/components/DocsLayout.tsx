import Link from 'next/link';
import type { ReactNode } from 'react';

import { SiteLayout } from './SiteLayout';

interface DocsLayoutProps {
  children: ReactNode;
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

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <SiteLayout>
      <div className="grid grid-cols-[220px_1fr] gap-10 px-6 py-10 max-w-6xl mx-auto">
        <aside className="text-sm flex flex-col gap-6">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <div className="text-xs uppercase tracking-wide text-cladd-fg-2">
                {section.title}
              </div>
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

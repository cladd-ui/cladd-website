import type { ReactNode } from 'react';

import { SiteLayout } from './SiteLayout';

interface PageLayoutProps {
  children: ReactNode;
  /** Full <title> string. Forwarded to SiteLayout. */
  title: string;
  /** Meta description. Forwarded to SiteLayout. */
  description: string;
}

// Plain article wrapper for top-level static pages (Changelog, About, …) —
// the docs reading frame without the docs chrome (no sidebar, no "On this
// page", no copy-as-Markdown, no prev/next nav). Use DocsLayout when the
// page belongs to the /react/ section.
export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <SiteLayout title={title} description={description}>
      <div className="px-4 sm:px-6">
        <article className="prose mx-auto w-full max-w-3xl py-12">
          {children}
        </article>
      </div>
    </SiteLayout>
  );
}

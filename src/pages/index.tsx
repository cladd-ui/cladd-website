import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@cladd-ui/react';

import { SiteLayout } from '@/components/SiteLayout';

export default function HomePage() {
  return (
    <SiteLayout>
      <Head>
        <title>cladd — UI primitives</title>
        <meta
          name="description"
          content="cladd is an open-source React UI primitive library."
        />
      </Head>
      <section className="flex flex-col items-center text-center gap-6 px-6 py-24 max-w-3xl mx-auto">
        <h1 className="text-5xl font-semibold tracking-tight">
          UI primitives that get out of your way.
        </h1>
        <p className="text-lg text-cladd-fg-2 max-w-xl">
          cladd is a small set of React components and hooks for building
          polished, accessible interfaces — styled with Tailwind, themable, and
          stripped of opinions you don&apos;t need.
        </p>
        <div className="flex items-center gap-3">
          <Button as={Link} href="/docs/" color="brand" size="lg">
            Read the docs
          </Button>
          <Button
            as="a"
            href="https://github.com/nolimits4web/cladd-ui"
            target="_blank"
            rel="noreferrer"
            size="lg"
            variant="solid"
          >
            View on GitHub
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}

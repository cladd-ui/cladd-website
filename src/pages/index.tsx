import { Button } from '@cladd-ui/react';
import Link from 'next/link';

import { SiteLayout } from '@/components/SiteLayout';

export default function HomePage() {
  return (
    <SiteLayout
      title="Cladd — A React UI kit for building actual apps"
      description="Cladd is an opinionated React UI kit. A surface system, a sizing scale, and a complete set of application-grade components — already powering Swiper Studio, t0ggles, PaneFlow and more."
    >
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
        <h1 className="text-5xl font-semibold">
          A React UI kit for building actual apps.
        </h1>
        <p className="max-w-xl text-lg text-cladd-fg-soft">
          Cladd is opinionated. It comes with a surface system, a sizing scale,
          eleven accent colors, and the components you need to ship a real
          product — not a landing page.
        </p>
        <div className="flex items-center gap-4">
          <Button as={Link} href="/react/" color="brand" size="lg">
            Read the docs
          </Button>
          <Button
            as="a"
            href="https://github.com/cladd-ui/cladd"
            target="_blank"
            rel="noreferrer"
            size="lg"
            variant="solid"
          >
            View on GitHub
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <div className="mb-3 text-xs tracking-wide text-cladd-fg-soft uppercase">
          Built with cladd
        </div>
        <p className="text-cladd-fg-soft">
          Swiper Studio · t0ggles · PaneFlow · Start Page HQ
        </p>
      </section>
    </SiteLayout>
  );
}

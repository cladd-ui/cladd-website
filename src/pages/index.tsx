import { Button, Spinner, Surface } from '@cladd-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { SiteLayout } from '@/components/SiteLayout';

const DEMO_HEIGHT = 600;

function DesignToolDemoPlaceholder() {
  return (
    <Surface
      className="flex items-center justify-center"
      contentClassName="justify-center"
      style={{ height: DEMO_HEIGHT }}
    >
      <Spinner
        size="xl"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </Surface>
  );
}

const DesignToolDemo = dynamic(
  () =>
    import('@/components/home/DesignToolDemo').then((m) => ({
      default: m.DesignToolDemo,
    })),
  {
    ssr: false,
    loading: () => <DesignToolDemoPlaceholder />,
  },
);

export default function HomePage() {
  return (
    <SiteLayout
      title="Cladd — A React UI kit for building actual apps"
      description="Cladd is an opinionated React UI kit. A surface system, a sizing scale, and a complete set of application-grade components"
    >
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-24 pb-12 text-center">
        <h1 className="text-5xl font-semibold tracking-tight">
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

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div
          style={{ minHeight: DEMO_HEIGHT }}
          className="overflow-hidden rounded-xl outline outline-cladd-outline"
        >
          <DesignToolDemo />
        </div>
        <p className="mt-4 text-center text-sm text-cladd-fg-softer">
          This demo is built entirely from cladd primitives —{' '}
          <code className="font-mono">Surface</code>,{' '}
          <code className="font-mono">Toolbar</code>,{' '}
          <code className="font-mono">NumberField</code>,{' '}
          <code className="font-mono">Select</code>,{' '}
          <code className="font-mono">Slider</code>,{' '}
          <code className="font-mono">List</code>. Tweak the inspector; the
          canvas updates live.
        </p>
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

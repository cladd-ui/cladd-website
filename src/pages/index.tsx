import {
  Button,
  Segmented,
  SegmentedButton,
  Spinner,
  Surface,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
} from '@cladd-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';

import { CodePreviewPairs } from '@/components/home/CodePreviewPairs';
import { ComponentCatalog } from '@/components/home/ComponentCatalog';
import { InstallCTA } from '@/components/home/InstallCTA';
import { IsCladdForYou } from '@/components/home/IsCladdForYou';
import { LatestReleasePill } from '@/components/home/LatestReleasePill';
import { PitchGrid } from '@/components/home/PitchGrid';
import { ProductsStrip } from '@/components/home/ProductsStrip';
import { ExternalLinkIcon } from '@/components/icons/ExternalLinkIcon';
import { SiteLayout } from '@/components/SiteLayout';

const DEMO_HEIGHT = 600;

function DemoPlaceholder() {
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
    import('@/components/demos/DesignToolDemo').then((m) => ({
      default: m.DesignToolDemo,
    })),
  {
    ssr: false,
    loading: () => <DemoPlaceholder />,
  },
);

const KanbanDemo = dynamic(
  () =>
    import('@/components/demos/KanbanDemo').then((m) => ({
      default: m.KanbanDemo,
    })),
  {
    ssr: false,
    loading: () => <DemoPlaceholder />,
  },
);

const SettingsDemo = dynamic(
  () =>
    import('@/components/demos/SettingsDemo').then((m) => ({
      default: m.SettingsDemo,
    })),
  {
    ssr: false,
    loading: () => <DemoPlaceholder />,
  },
);

const CodeEditorDemo = dynamic(
  () =>
    import('@/components/demos/CodeEditorDemo').then((m) => ({
      default: m.CodeEditorDemo,
    })),
  {
    ssr: false,
    loading: () => <DemoPlaceholder />,
  },
);

type DemoView = 'design' | 'settings' | 'kanban' | 'editor';

const DEMO_ROUTES: Record<DemoView, string> = {
  design: '/demos/design-tool/',
  settings: '/demos/settings/',
  kanban: '/demos/kanban/',
  editor: '/demos/code-editor/',
};

function HomeDemo() {
  const [view, setView] = useState<DemoView>('design');
  return (
    <>
      <div className="mb-4 flex justify-center">
        <Toolbar>
          <Segmented>
            <SegmentedButton
              active={view === 'design'}
              onClick={() => setView('design')}
            >
              Design tool
            </SegmentedButton>
            <SegmentedButton
              active={view === 'settings'}
              onClick={() => setView('settings')}
            >
              Settings
            </SegmentedButton>
            <SegmentedButton
              active={view === 'kanban'}
              onClick={() => setView('kanban')}
            >
              Kanban <span className="hidden xs:inline">board</span>
            </SegmentedButton>
            <SegmentedButton
              active={view === 'editor'}
              onClick={() => setView('editor')}
            >
              Code editor
            </SegmentedButton>
          </Segmented>
          <ToolbarSeparator />
          <Tooltip tooltip="Open full screen">
            <ToolbarButton
              as="a"
              href={DEMO_ROUTES[view]}
              target="_blank"
              rel="noreferrer"
              aria-label="Open full screen"
            >
              <ExternalLinkIcon />
            </ToolbarButton>
          </Tooltip>
        </Toolbar>
      </div>
      <div
        style={{ height: DEMO_HEIGHT }}
        className="overflow-hidden rounded-2xl outline outline-cladd-outline"
      >
        {view === 'design' ? (
          <DesignToolDemo />
        ) : view === 'settings' ? (
          <SettingsDemo />
        ) : view === 'kanban' ? (
          <KanbanDemo />
        ) : (
          <CodeEditorDemo />
        )}
      </div>
      <p className="mt-4 text-center text-sm text-cladd-fg-softer">
        {view === 'design' ? (
          <>
            This demo is built entirely from cladd primitives —{' '}
            <code className="font-mono">Surface</code>,{' '}
            <code className="font-mono">Toolbar</code>,{' '}
            <code className="font-mono">Button</code>,{' '}
            <code className="font-mono">NumberField</code>,{' '}
            <code className="font-mono">NumberScrubber</code>,{' '}
            <code className="font-mono">Select</code>,{' '}
            <code className="font-mono">Slider</code>,{' '}
            <code className="font-mono">List</code>, etc.. Tweak the inspector;
            the canvas updates live.
          </>
        ) : view === 'settings' ? (
          <>
            Application-grade controls, packed tight — a settings pane built
            from <code className="font-mono">List</code>,{' '}
            <code className="font-mono">Segmented</code>,{' '}
            <code className="font-mono">Switch</code>,{' '}
            <code className="font-mono">Radio</code>,{' '}
            <code className="font-mono">Checkbox</code>,{' '}
            <code className="font-mono">Select</code>,{' '}
            <code className="font-mono">Slider</code>,{' '}
            <code className="font-mono">NumberField</code>,{' '}
            <code className="font-mono">SurfaceCut</code>. Change the accent and
            the preview surface updates live.
          </>
        ) : view === 'kanban' ? (
          <>
            Same kit, very different surface — a dense kanban built from{' '}
            <code className="font-mono">Surface</code>,{' '}
            <code className="font-mono">Toolbar</code>,{' '}
            <code className="font-mono">Segmented</code>,{' '}
            <code className="font-mono">Chip</code>,{' '}
            <code className="font-mono">SearchField</code>,{' '}
            <code className="font-mono">Shortcut</code>. Cards are{' '}
            <code className="font-mono">Surface</code>s with{' '}
            <code className="font-mono">hoverable</code> +{' '}
            <code className="font-mono">clickable</code>, so the nested action
            buttons stay legal.
          </>
        ) : (
          <>
            A code-editor shell — file tree, tabs, breadcrumb, status bar —
            stitched together from <code className="font-mono">List</code>,{' '}
            <code className="font-mono">ListButton</code>,{' '}
            <code className="font-mono">Toolbar</code>,{' '}
            <code className="font-mono">Chip</code>,{' '}
            <code className="font-mono">Shortcut</code>,{' '}
            <code className="font-mono">SectionTitle</code>, and{' '}
            <code className="font-mono">Tooltip</code>. Switch tabs and click a
            line to move the caret.
          </>
        )}
      </p>
    </>
  );
}

export default function HomePage() {
  return (
    <SiteLayout
      title="Cladd — A React UI kit for building actual apps"
      description="Cladd is an opinionated React UI kit with a surface system, a sizing scale, and a complete set of application-grade components for building real apps."
    >
      <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-4 pt-24 pb-12 text-center sm:px-6">
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white light:text-black">
          A React UI kit for building actual apps.
        </h1>
        <p className="max-w-xl text-lg text-cladd-fg-soft">
          Cladd is opinionated. It comes with a surface system, a sizing scale,
          eleven accent colors, and the components you need to ship a real
          product — not a landing page.
        </p>
        <div className="flex items-center gap-4">
          <Button
            as={Link}
            href="/react/"
            color="brand"
            size="2xl"
            rounded
            contentClassName="px-8 text-sm"
          >
            Get started
          </Button>
          <Button
            as="a"
            href="https://github.com/cladd-ui/cladd"
            target="_blank"
            rel="noreferrer"
            size="2xl"
            variant="solid"
            rounded
            contentClassName="px-8 text-sm"
          >
            View on GitHub
          </Button>
        </div>
        <LatestReleasePill />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <HomeDemo />
      </section>

      <ProductsStrip />

      <PitchGrid />

      <CodePreviewPairs />

      <ComponentCatalog />

      <IsCladdForYou />

      <InstallCTA />
    </SiteLayout>
  );
}

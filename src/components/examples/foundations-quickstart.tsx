import {
  Button,
  Chip,
  List,
  ListButton,
  ListTitle,
  Surface,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from '@cladd-ui/react';

import { Example } from '../Example';

// Read by extract-example-source.mjs — when an <Example source={NAME}> tag
// references an uppercase identifier, the extractor emits the matching
// top-level template literal as the displayed source. Used here because the
// runtime version below drops <CladdProvider> (already supplied by the docs
// site) and swaps h-screen for a fixed height that fits the Example preview
// rect — but the source the reader copies must show the canonical full-app
// shape, not the constrained docs-page version.
//
// Note: this template literal must not contain unescaped backticks — the
// extractor's non-greedy match would close on the first one and truncate
// the source. Class names in comments use plain unquoted text instead.
const APP_SHELL_SOURCE = `import {
  CladdProvider,
  Surface,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  List,
  ListButton,
  ListTitle,
  Chip,
  Button,
} from '@cladd-ui/react';

export default function App() {
  return (
    <CladdProvider>
      <div className="flex h-screen bg-cladd-bg text-xs text-cladd-fg">
        {/* Left rail — workspace navigation. A floating Surface inset
            with m-2 rounded-3xl is the cladd sidebar pattern; every
            region sits as a rounded panel on the page bg, never
            edge-to-edge. */}
        <Surface outline className="m-2 w-55 rounded-3xl">
          <List>
            <ListTitle>Workspace</ListTitle>
            <ListButton selected after={<Chip color="brand">12</Chip>}>
              Inbox
            </ListButton>
            <ListButton>Drafts</ListButton>
            <ListButton>Archive</ListButton>
          </List>
        </Surface>

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar — two Toolbars sharing one row. ml-auto on the
              second pushes it to the right edge; contextual actions on
              the left, chrome actions on the right, no custom flex
              layout needed. */}
          <div className="flex h-16 items-center gap-2 px-4">
            <Toolbar>
              <ToolbarButton>Compose</ToolbarButton>
              <ToolbarButton>Reply</ToolbarButton>
            </Toolbar>
            <Toolbar className="ml-auto">
              <ToolbarButton>Save</ToolbarButton>
              <ToolbarButton>Open</ToolbarButton>
              <ToolbarSeparator />
              <ToolbarButton color="brand" variant="gradient">
                Publish
              </ToolbarButton>
            </Toolbar>
          </div>

          {/* Main scroll region — a vertical stack of Surfaces, one per
              card. Each card is a real Surface, never a <div> styled
              to look like one. Add as many as your view needs. */}
          <main className="flex flex-1 flex-col gap-2 overflow-auto p-4">
            <Surface
              outline
              className="rounded-3xl"
              contentClassName="flex flex-col gap-4 p-4"
            >
              <h1 className="text-base">Inbox</h1>
              <p className="text-cladd-fg-soft">
                12 unread messages in your workspace.
              </p>
              <Button color="brand" rounded>
                Compose
              </Button>
            </Surface>
            <Surface
              outline
              className="rounded-3xl"
              contentClassName="flex flex-col gap-1 p-4"
            >
              <h2 className="text-sm">Anna Lindberg</h2>
              <p className="text-cladd-fg-soft">
                Quick question on the export pipeline
              </p>
              <p className="text-cladd-fg-softer">
                Staging run failed overnight — the schema validator is
                rejecting the new locale rows. Have you seen this on prod
                yet, or is it just the dev branch?
              </p>
            </Surface>
            <Surface
              outline
              className="rounded-3xl"
              contentClassName="flex flex-col gap-1 p-4"
            >
              <h2 className="text-sm">Marcus Webb</h2>
              <p className="text-cladd-fg-soft">
                Design review notes — week 18
              </p>
              <p className="text-cladd-fg-softer">
                Loved the new inspector layout. Two small notes on toolbar
                spacing and one question about how the accent ring renders
                in light mode — happy to walk through tomorrow.
              </p>
            </Surface>
          </main>
        </div>
      </div>
    </CladdProvider>
  );
}`;

export function AppShellExample() {
  return (
    <Example source={APP_SHELL_SOURCE} previewClassName="p-0">
      <div className="flex h-[520px] w-full overflow-hidden bg-cladd-bg text-xs text-cladd-fg">
        <Surface outline className="m-2 w-55 rounded-3xl">
          <List>
            <ListTitle>Workspace</ListTitle>
            <ListButton selected after={<Chip color="brand">12</Chip>}>
              Inbox
            </ListButton>
            <ListButton>Drafts</ListButton>
            <ListButton>Archive</ListButton>
          </List>
        </Surface>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex h-16 items-center gap-2 px-4">
            <Toolbar>
              <ToolbarButton>Compose</ToolbarButton>
              <ToolbarButton>Reply</ToolbarButton>
            </Toolbar>
            <Toolbar className="ml-auto">
              <ToolbarButton>Save</ToolbarButton>
              <ToolbarButton>Open</ToolbarButton>
              <ToolbarSeparator />
              <ToolbarButton color="brand" variant="gradient">
                Publish
              </ToolbarButton>
            </Toolbar>
          </div>

          <main className="flex flex-1 flex-col gap-2 overflow-auto p-4">
            <Surface
              outline
              className="rounded-3xl"
              contentClassName="flex flex-col gap-4 p-4"
            >
              <h1 className="text-base">Inbox</h1>
              <p className="text-cladd-fg-soft">
                12 unread messages in your workspace.
              </p>
              <Button color="brand" rounded>
                Compose
              </Button>
            </Surface>
            <Surface
              outline
              className="rounded-3xl"
              contentClassName="flex flex-col gap-1 p-4"
            >
              <h2 className="text-sm">Anna Lindberg</h2>
              <p className="text-cladd-fg-soft">
                Quick question on the export pipeline
              </p>
              <p className="text-cladd-fg-softer">
                Staging run failed overnight — the schema validator is rejecting
                the new locale rows. Have you seen this on prod yet, or is it
                just the dev branch?
              </p>
            </Surface>
            <Surface
              outline
              className="rounded-3xl"
              contentClassName="flex flex-col gap-1 p-4"
            >
              <h2 className="text-sm">Marcus Webb</h2>
              <p className="text-cladd-fg-soft">
                Design review notes — week 18
              </p>
              <p className="text-cladd-fg-softer">
                Loved the new inspector layout. Two small notes on toolbar
                spacing and one question about how the accent ring renders in
                light mode — happy to walk through tomorrow.
              </p>
            </Surface>
          </main>
        </div>
      </div>
    </Example>
  );
}

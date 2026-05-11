import {
  Button,
  Chip,
  Input,
  List,
  ListButton,
  ListItem,
  ListSeparator,
  Popup,
  PopupClose,
  PopupContent,
  PopupRoot,
  PopupTrigger,
  SectionTitle,
  Segmented,
  SegmentedButton,
  Switch,
  Textarea,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlVariant,
  ExampleToolbar,
  type SurfaceVariant,
} from '@/components/ExampleControls';
import { ArchiveIcon } from '@/components/icons/ArchiveIcon';
import { CopyIcon } from '@/components/icons/CopyIcon';
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon';
import { NoteIcon } from '@/components/icons/NoteIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/popup';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="min-h-90"
    >
      <PopupRoot>
        <PopupTrigger>
          <Button>Open task</Button>
        </PopupTrigger>
        <Popup
          headerLeft={
            <div className="flex items-center gap-2 px-2 pb-1">
              <NoteIcon className="size-4 text-cladd-fg-soft" />
              <span className="text-cladd-sm font-semibold">Cladd UI</span>
            </div>
          }
          headerRight={
            <ExampleToolbar rounded>
              <Button rounded variant="transparent" outline={false}>
                <EnvelopeIcon />
              </Button>
              <Button rounded variant="transparent" outline={false}>
                <ArchiveIcon />
              </Button>
              <Button rounded variant="transparent" outline={false}>
                <CopyIcon />
              </Button>
            </ExampleToolbar>
          }
        >
          <PopupContent>
            <div className="flex items-start justify-between gap-4">
              <span className="text-cladd-xs text-cladd-fg-soft uppercase">
                CLADD-5
              </span>
              <div className="flex items-center gap-2">
                <Chip color="green">In Progress</Chip>
                <Chip outline>0</Chip>
              </div>
            </div>
            <h2 className="text-cladd-lg mt-2 font-semibold">Website docs</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Input placeholder="Add tags" />
              <Input placeholder="Add priority" />
              <Input placeholder="Add start & due date" />
              <Input placeholder="Assign person" />
            </div>
          </PopupContent>
          <PopupContent>
            <SectionTitle>Description</SectionTitle>
            <div className="mt-2 flex flex-col gap-2 text-cladd-sm">
              <p>
                Documentation site for the cladd component library. Covers
                hooks, guides, and component reference pages with live examples.
              </p>
              <ul className="ml-4 list-disc text-cladd-fg-soft">
                <li>Hooks: useDevice, useTheme, useSurface, useToast</li>
                <li>Guides: Colors, Customization</li>
                <li>Components: Backdrop, Button, Chip, etc.</li>
              </ul>
            </div>
          </PopupContent>
        </Popup>
      </PopupRoot>
    </Example>
  );
}

export function CompoundExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.CompoundExample}
      previewClassName="min-h-60"
    >
      <PopupRoot>
        <PopupTrigger>
          <Button>Open popup</Button>
        </PopupTrigger>
        <Popup
          headerLeft={
            <span className="px-2 pb-1 text-cladd-sm font-semibold">
              Compound API
            </span>
          }
        >
          <PopupContent>
            <p className="text-cladd-sm">
              Trigger, popup, and close all sit inside PopupRoot. The root owns
              the open state and wires the parts together through context.
            </p>
            <PopupClose>
              <Button className="mt-4">Dismiss</Button>
            </PopupClose>
          </PopupContent>
        </Popup>
      </PopupRoot>
    </Example>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.ControlledExample}
      previewClassName="min-h-60"
    >
      <div className="flex items-center gap-2">
        <Button onClick={() => setOpen(true)}>Open from external state</Button>
        <Chip color={open ? 'green' : 'neutral'} outline>
          {open ? 'open' : 'closed'}
        </Chip>
      </div>
      <Popup
        open={open}
        onOpenChange={setOpen}
        headerLeft={
          <span className="px-2 pb-1 text-cladd-sm font-semibold">
            Controlled
          </span>
        }
      >
        <PopupContent>
          <p className="text-cladd-sm">
            open and onOpenChange come from the surrounding component — no
            PopupRoot needed.
          </p>
          <Button className="mt-4" onClick={() => setOpen(false)}>
            Close
          </Button>
        </PopupContent>
      </Popup>
    </Example>
  );
}

export function MultipleContentExample() {
  const [email, setEmail] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [digest, setDigest] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.MultipleContentExample}
      previewClassName="min-h-60"
    >
      <PopupRoot>
        <PopupTrigger>
          <Button>Open settings</Button>
        </PopupTrigger>
        <Popup
          headerLeft={
            <span className="px-2 pb-1 text-cladd-sm font-semibold">
              Workspace settings
            </span>
          }
        >
          <PopupContent>
            <SectionTitle>General</SectionTitle>
            <div className="mt-2 flex flex-col gap-2">
              <Input placeholder="Workspace name" />
              <Input placeholder="Slug" />
            </div>
          </PopupContent>
          <PopupContent>
            <SectionTitle>Notifications</SectionTitle>
            <div className="mt-2 flex flex-col gap-2 text-cladd-sm">
              <label className="flex items-center justify-between gap-4">
                <span>Email updates</span>
                <Switch as="div" checked={email} onChange={setEmail} />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>Mentions</span>
                <Switch as="div" checked={mentions} onChange={setMentions} />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>Weekly digest</span>
                <Switch as="div" checked={digest} onChange={setDigest} />
              </label>
            </div>
          </PopupContent>
          <PopupContent>
            <SectionTitle>Members</SectionTitle>
            <List className="-mx-4 mt-2">
              <ListItem>jamie@acme.studio</ListItem>
              <ListItem>sam@acme.studio</ListItem>
              <ListItem>alex@acme.studio</ListItem>
              <ListSeparator />
              <ListButton icon={<PlusIcon />}>Invite teammate</ListButton>
            </List>
          </PopupContent>
        </Popup>
      </PopupRoot>
    </Example>
  );
}

export function PopupContentVariantExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('solid');
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.PopupContentVariantExample}
      state={{ variant, color }}
      previewClassName="min-h-60"
      controls={
        <ExampleToolbar>
          <ExampleControlVariant value={variant} onChange={setVariant} />
          <ExampleControlColor value={color} onChange={setColor} />
        </ExampleToolbar>
      }
    >
      <PopupRoot>
        <PopupTrigger>
          <Button color={color}>Open popup</Button>
        </PopupTrigger>
        <Popup
          headerLeft={
            <span className="px-2 pb-1 text-cladd-sm font-semibold">
              PopupContent variant
            </span>
          }
          closeButtonColor={color}
        >
          <PopupContent variant={variant} className={`cladd-color-${color}`}>
            <p className="text-cladd-sm">
              PopupContent forwards <code>variant</code> to the underlying
              Surface — same set as Surface itself: transparent, solid,
              gradient, solid-fill, gradient-fill. Tint with a{' '}
              <code>cladd-color-*</code> class on the wrapper.
            </p>
          </PopupContent>
          <PopupContent
            variant={variant}
            className={`cladd-color-${color}`}
            surfaceLevel={2}
          >
            <p className="text-cladd-sm">
              <code>surfaceLevel</code> bumps the elevation step (default{' '}
              <code>1</code>) — same relative <code>"+1"</code>/
              <code>"-1"</code> syntax as Surface.
            </p>
          </PopupContent>
        </Popup>
      </PopupRoot>
    </Example>
  );
}

export function CustomCloseExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.CustomCloseExample}
      previewClassName="min-h-60"
    >
      <PopupRoot>
        <PopupTrigger>
          <Button>Open editor</Button>
        </PopupTrigger>
        <Popup
          headerLeft={
            <span className="px-2 pb-1 text-cladd-sm font-semibold">
              Edit task
            </span>
          }
          closeButton={false}
          headerRight={
            <ExampleToolbar>
              <PopupClose>
                <Button variant="transparent" rounded outline={false}>
                  Cancel
                </Button>
              </PopupClose>
              <PopupClose>
                <Button color="brand" variant="gradient" rounded>
                  Save
                </Button>
              </PopupClose>
            </ExampleToolbar>
          }
        >
          <PopupContent>
            <div className="flex flex-col gap-2">
              <Input placeholder="Task title" />
              <Textarea placeholder="Description" />
            </div>
          </PopupContent>
        </Popup>
      </PopupRoot>
    </Example>
  );
}

const SIZE_OPTIONS = [
  { id: 'narrow', label: 'narrow', className: 'max-w-96' },
  { id: 'default', label: 'default', className: '' },
  { id: 'wide', label: 'wide', className: 'max-w-240' },
] as const;
type SizeId = (typeof SIZE_OPTIONS)[number]['id'];

export function CustomSizeExample() {
  const [size, setSize] = useState<SizeId>('narrow');
  const active = SIZE_OPTIONS.find((s) => s.id === size)!;
  return (
    <Example
      source={EXAMPLE_SOURCE.CustomSizeExample}
      state={{ size }}
      previewClassName="min-h-60"
      controls={
        <ExampleToolbar>
          <Segmented>
            {SIZE_OPTIONS.map((s) => (
              <SegmentedButton
                key={s.id}
                active={size === s.id}
                onClick={() => setSize(s.id)}
              >
                {s.label}
              </SegmentedButton>
            ))}
          </Segmented>
        </ExampleToolbar>
      }
    >
      <PopupRoot>
        <PopupTrigger>
          <Button>Open {active.label} popup</Button>
        </PopupTrigger>
        <Popup
          contentClassName={active.className}
          headerLeft={
            <span className="px-2 pb-1 text-cladd-sm font-semibold">
              Custom size
            </span>
          }
        >
          <PopupContent>
            <p className="text-cladd-sm">
              The popup's content column defaults to <code>max-w-162</code>{' '}
              (~648px) — wide enough for a content, narrow enough to feel
              focused on a big monitor. Override with{' '}
              <code>contentClassName</code> when you want a tighter prompt or a
              wider workspace.
            </p>
          </PopupContent>
          <PopupContent>
            <p className="text-cladd-sm">
              Current size: <code>{active.id}</code>
              {active.className ? (
                <>
                  {' '}
                  · <code>{active.className}</code>
                </>
              ) : null}
            </p>
          </PopupContent>
        </Popup>
      </PopupRoot>
    </Example>
  );
}

export function ScrollableExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.ScrollableExample}
      previewClassName="min-h-60"
    >
      <PopupRoot>
        <PopupTrigger>
          <Button>Open changelog</Button>
        </PopupTrigger>
        <Popup
          headerLeft={
            <span className="px-2 pb-1 text-cladd-sm font-semibold">
              Changelog
            </span>
          }
        >
          {RELEASES.map((release) => (
            <PopupContent key={release.version}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-cladd-md font-semibold">
                  v{release.version}
                </h3>
                <Chip outline>{release.date}</Chip>
              </div>
              <p className="mt-2 text-cladd-sm text-cladd-fg-soft">
                {release.summary}
              </p>
              <ul className="mt-4 ml-4 flex list-disc flex-col gap-1 text-cladd-sm">
                {release.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </PopupContent>
          ))}
        </Popup>
      </PopupRoot>
    </Example>
  );
}

const RELEASES = [
  {
    version: '0.0.32',
    date: '2026-05-08',
    summary:
      'PopupContent variants land, Toolbar gets size context, and a handful of focus-trap fixes for nested overlays.',
    notes: [
      'PopupContent now forwards variant and outline to the underlying Surface.',
      'Toolbar exposes a size prop that propagates to ToolbarButton via context.',
      'Fixed focus trap escaping when a Popover opens inside a Popup.',
      'closeOnEscape now auto-suppresses when a nested overlay is open.',
      'Tightened the gradient seam on solid-fill surfaces in light theme.',
    ],
  },
  {
    version: '0.0.31',
    date: '2026-04-22',
    summary:
      'NumberField and OTPField round out the form-control set; Switch gets keyboard polish.',
    notes: [
      'New: NumberField with scrubber, clamp, step, and locale-aware formatting.',
      'New: OTPField + OTPFieldInput + OTPFieldSeparator for one-time-code flows.',
      'Switch now responds to Space/Enter when rendered without a native input.',
      'Slider snaps to step on keyboard arrows; PageUp/PageDown jump 10×.',
      'Input clear button can be themed via inputClearButtonColor.',
    ],
  },
  {
    version: '0.0.30',
    date: '2026-04-09',
    summary:
      'Dialog ships an imperative useDialog hook; Toast gains stacking and timeout controls.',
    notes: [
      'New: useDialog() returns { confirm, alert } for imperative confirms.',
      'New: requireConfirmText prop guards destructive actions.',
      'Toast stacks at the corner and dismisses independently.',
      'useToast() queues toasts via the CladdProvider portal.',
      'Backdrop accepts a transparent prop for click-capture without dim.',
    ],
  },
  {
    version: '0.0.29',
    date: '2026-03-27',
    summary:
      'Surface system gains levels 4 and 5 and a contextual useSurface hook.',
    notes: [
      'Surface accepts levels 1–5 with auto-nesting through useSurface.',
      'SurfaceCut renders the recessed/cut treatment used by code blocks.',
      'Color tokens cladd-color-* now propagate to color-aware children.',
      'Added eleven accent colors with transparent/solid/gradient variants.',
      'Removed the (rarely used) inline variant — fold it into solid + outline.',
    ],
  },
  {
    version: '0.0.28',
    date: '2026-03-12',
    summary:
      'Popover lands on CSS anchor positioning; PopoverRoot/Trigger/Close ship the compound API.',
    notes: [
      'Popover rewritten on top of CSS anchor-positioning with auto-flip fallbacks.',
      'New: PopoverRoot + PopoverTrigger + PopoverClose for trigger-bound popovers.',
      'offset accepts a [main, cross] tuple for two-axis nudges.',
      'anchorRect lets you anchor to a static pointer position (right-click menus).',
      'Backdrop adds a `transparent` mode for click-capture without the dim.',
    ],
  },
  {
    version: '0.0.27',
    date: '2026-02-26',
    summary:
      'Toolbar, Segmented, and Shortcut shipped as the application-shell control set.',
    notes: [
      'New: Toolbar with rounded pill container and ToolbarButton children.',
      'New: Segmented + SegmentedButton for inline tab-style switches.',
      'New: Shortcut renders kbd glyphs (⌘ ⌥ ⇧ ⌃) with size context.',
      'Button size context now flows through Toolbar → ToolbarButton automatically.',
      'Chip gains the same 2xs → 2xl size scale as Button and Shortcut.',
    ],
  },
  {
    version: '0.0.26',
    date: '2026-02-09',
    summary:
      'List system rebuilt around ListButton/ListItem/ListTitle/ListSeparator.',
    notes: [
      'New: List as the parent container with consistent gap + divider rules.',
      'ListButton supports `icon`, `after`, `selected`, and `color` props.',
      'ListTitle renders the uppercase eyebrow used in popovers and sidebars.',
      'ListSeparator paints a hairline that respects surrounding surface tint.',
      'ListButton size defaults to `lg` for sidebars — drop to `md`/`sm` in menus.',
    ],
  },
  {
    version: '0.0.25',
    date: '2026-01-22',
    summary:
      'Input, Textarea, and SearchField pick up the unified size scale and clear-button affordance.',
    notes: [
      'Input + Textarea + SearchField all accept sm/md/lg/xl/2xl sizes.',
      'New: SearchField with a built-in search glyph and clear button.',
      'Input gains a `displayValue` slot for formatted, readOnly previews.',
      'Textarea no longer stomps caret position on external value updates.',
      'Color tokens now tint the focus ring + clear button when supplied.',
    ],
  },
];

const PASSWORD_HINT_TEXT =
  'Use at least 12 characters with a mix of letters, numbers, and symbols. Avoid reusing passwords across services.';

export function NestedExample() {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openC, setOpenC] = useState(false);
  return (
    <Example source={EXAMPLE_SOURCE.NestedExample} previewClassName="min-h-60">
      <Button onClick={() => setOpenA(true)}>Open account settings</Button>

      <Popup
        open={openA}
        onOpenChange={setOpenA}
        headerLeft={
          <span className="px-2 pb-1 text-cladd-sm font-semibold">
            Account settings
          </span>
        }
      >
        <PopupContent>
          <p className="text-cladd-sm">
            Account-level preferences. Open the security panel to drill in
            further — the popup stack pushes this one back as you go.
          </p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setOpenB(true)}>Open security</Button>
          </div>
        </PopupContent>
      </Popup>

      <Popup
        open={openB}
        onOpenChange={setOpenB}
        headerLeft={
          <span className="px-2 pb-1 text-cladd-sm font-semibold">
            Security
          </span>
        }
      >
        <PopupContent>
          <p className="text-cladd-sm">
            Sessions, recovery codes, two-factor. Drill one more level to change
            your password.
          </p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setOpenC(true)}>Change password</Button>
          </div>
        </PopupContent>
      </Popup>

      <Popup
        open={openC}
        onOpenChange={setOpenC}
        headerLeft={
          <span className="px-2 pb-1 text-cladd-sm font-semibold">
            Change password
          </span>
        }
      >
        <PopupContent>
          <div className="flex flex-col gap-2">
            <Input placeholder="Current password" type="password" />
            <Input placeholder="New password" type="password" />
            <Input placeholder="Confirm new password" type="password" />
          </div>
          <p className="mt-4 text-cladd-sm text-cladd-fg-soft">
            {PASSWORD_HINT_TEXT}
          </p>
        </PopupContent>
      </Popup>
    </Example>
  );
}

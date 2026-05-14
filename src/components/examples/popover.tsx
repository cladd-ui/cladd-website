import {
  Button,
  Chip,
  List,
  ListButton,
  ListItem,
  ListSeparator,
  ListTitle,
  Popover,
  PopoverClose,
  PopoverRoot,
  PopoverTrigger,
  SectionTitle,
  Segmented,
  SegmentedButton,
  Shortcut,
  SurfaceCut,
  Switch,
  type Color,
} from '@cladd-ui/react';
import { useRef, useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSwitch,
  ExampleControlVariant,
  ExampleToolbar,
  type SurfaceVariant,
} from '@/components/ExampleControls';
import { ArchiveIcon } from '@/components/icons/ArchiveIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { CopyIcon } from '@/components/icons/CopyIcon';
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon';
import { NoteIcon } from '@/components/icons/NoteIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/popover';

import { Example } from '../Example';

type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
type PopoverAlignment = 'start' | 'center' | 'end';
type PopoverPosition =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end';

const SIDES: PopoverSide[] = ['top', 'bottom', 'left', 'right'];
const ALIGNMENTS: PopoverAlignment[] = ['start', 'center', 'end'];

function composePosition(
  side: PopoverSide,
  alignment: PopoverAlignment,
): PopoverPosition {
  return (
    alignment === 'center' ? side : `${side}-${alignment}`
  ) as PopoverPosition;
}

export function OverviewExample() {
  const [sort, setSort] = useState('updated');
  const OPTIONS = [
    { id: 'updated', label: 'Last updated' },
    { id: 'created', label: 'Date created' },
    { id: 'name', label: 'Name' },
    { id: 'size', label: 'Size' },
  ];
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <Button>Sort by</Button>
        </PopoverTrigger>
        <Popover className="w-56" offset={8}>
          <List>
            <ListTitle>Sort by</ListTitle>
            {OPTIONS.map((o) => (
              <ListButton
                key={o.id}
                size="md"
                selected={sort === o.id}
                onClick={() => setSort(o.id)}
                after={sort === o.id ? <CheckIcon /> : undefined}
              >
                {o.label}
              </ListButton>
            ))}
            <ListSeparator />
            <ListButton size="md" icon={<PlusIcon />}>
              Add custom sort
            </ListButton>
          </List>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

export function CompoundExample() {
  return (
    <Example source={EXAMPLE_SOURCE.CompoundExample}>
      <PopoverRoot>
        <PopoverTrigger>
          <Button>Open popover</Button>
        </PopoverTrigger>
        <Popover className="w-64" offset={8}>
          <div className="flex flex-col gap-2 p-4">
            <SectionTitle>Compound API</SectionTitle>
            <p className="text-sm">
              Trigger, popover, and close all live inside PopoverRoot. The root
              owns the open state and the anchor ref.
            </p>
            <PopoverClose>
              <Button size="sm" className="self-end">
                Got it
              </Button>
            </PopoverClose>
          </div>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <Example source={EXAMPLE_SOURCE.ControlledExample}>
      <div className="flex items-center gap-2">
        <Button ref={anchorRef} onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Open'} from external state
        </Button>
        <Chip color={open ? 'green' : 'neutral'}>
          {open ? 'open' : 'closed'}
        </Chip>
      </div>
      <Popover
        open={open}
        onOpenChange={setOpen}
        anchorRef={anchorRef}
        className="w-56"
        offset={8}
      >
        <div className="flex flex-col gap-2 p-4">
          <SectionTitle>Controlled</SectionTitle>
          <p className="text-sm">
            open, onOpenChange, and anchorRef come from the surrounding
            component — no PopoverRoot needed.
          </p>
          <Button size="sm" className="self-end" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </Popover>
    </Example>
  );
}

export function ContextMenuExample() {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  return (
    <Example
      source={EXAMPLE_SOURCE.ContextMenuExample}
      previewClassName="min-h-72"
    >
      <SurfaceCut
        onContextMenu={(e) => {
          e.preventDefault();
          setRect(new DOMRect(e.clientX, e.clientY, 0, 0));
          setOpen(true);
        }}
        className="w-full rounded-2xl"
        contentClassName="flex min-h-64 items-center justify-center select-none text-sm text-cladd-fg-softer"
      >
        Right-click anywhere in this area
      </SurfaceCut>
      <Popover
        open={open}
        onOpenChange={setOpen}
        anchorRect={rect ?? undefined}
        position="bottom-start"
        className="fixed! w-56"
      >
        <List>
          <ListButton
            icon={<CopyIcon />}
            after={<Shortcut size="sm">cmd c</Shortcut>}
          >
            Copy
          </ListButton>
          <ListButton
            icon={<PlusIcon />}
            after={<Shortcut size="sm">cmd d</Shortcut>}
          >
            Duplicate
          </ListButton>
          <ListButton icon={<EnvelopeIcon />}>Send to…</ListButton>
          <ListSeparator />
          <ListButton icon={<ArchiveIcon />}>Archive</ListButton>
          <ListButton color="red">Delete</ListButton>
        </List>
      </Popover>
    </Example>
  );
}

export function WithListExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.WithListExample}
      previewClassName="min-h-80"
    >
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <Button>Project actions</Button>
        </PopoverTrigger>
        <Popover className="w-64" offset={8}>
          <List>
            <ListTitle>Workspace</ListTitle>
            <ListButton
              size="md"
              icon={<EnvelopeIcon />}
              after={<Shortcut size="2xs">cmd 1</Shortcut>}
            >
              Inbox
            </ListButton>
            <ListButton
              size="md"
              icon={<NoteIcon />}
              after={<Shortcut size="2xs">cmd 2</Shortcut>}
            >
              Drafts
            </ListButton>
            <ListButton
              size="md"
              icon={<ArchiveIcon />}
              after={<Shortcut size="2xs">cmd 3</Shortcut>}
            >
              Archive
            </ListButton>
            <ListSeparator />
            <ListTitle>Actions</ListTitle>
            <ListButton
              size="md"
              icon={<CopyIcon />}
              after={<Shortcut size="2xs">cmd d</Shortcut>}
            >
              Duplicate
            </ListButton>
            <ListButton
              size="md"
              icon={<PlusIcon />}
              after={<Shortcut size="2xs">cmd n</Shortcut>}
            >
              New project
            </ListButton>
            <ListSeparator />
            <ListButton size="md" color="red">
              Delete project
            </ListButton>
          </List>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

export function RichContentExample() {
  const [notify, setNotify] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [digest, setDigest] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.RichContentExample}
      previewClassName="min-h-80"
    >
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <Button>Workspace settings</Button>
        </PopoverTrigger>
        <Popover className="w-72 text-sm" offset={8}>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
              <SectionTitle>Workspace</SectionTitle>
              <div className="flex items-center justify-between">
                <span className="font-medium">acme-marketing</span>
                <Chip color="brand">Pro</Chip>
              </div>
              <span className="text-cladd-fg-soft">
                8 members · 42 projects
              </span>
            </div>
            <SurfaceCut className="rounded-full" contentClassName="h-px" />
            <div className="flex flex-col gap-2">
              <SectionTitle>Notifications</SectionTitle>
              <label className="flex items-center justify-between gap-4">
                <span>Email updates</span>
                <Switch as="div" checked={notify} onChange={setNotify} />
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
          </div>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

const SIZE_OPTIONS = [
  { id: 'w-40', label: 'w-40' },
  { id: 'w-56', label: 'w-56' },
  { id: 'w-72', label: 'w-72' },
  { id: 'w-96', label: 'w-96' },
] as const;
type SizeId = (typeof SIZE_OPTIONS)[number]['id'];

export function SizeExample() {
  const [width, setWidth] = useState<SizeId>('w-56');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ width }}
      previewClassName="min-h-80"
      controls={
        <ExampleToolbar>
          <Segmented>
            {SIZE_OPTIONS.map((s) => (
              <SegmentedButton
                key={s.id}
                active={width === s.id}
                onClick={() => setWidth(s.id)}
              >
                {s.label}
              </SegmentedButton>
            ))}
          </Segmented>
        </ExampleToolbar>
      }
    >
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <Button>Open popover</Button>
        </PopoverTrigger>
        <Popover className={width} offset={8} closeOnBackdropClick={false}>
          <List>
            <ListTitle>Custom width</ListTitle>
            <ListItem>
              <span className="text-cladd-fg-soft">Width</span>
              <span className="ml-auto font-mono">{width}</span>
            </ListItem>
            <ListSeparator />
            <ListButton size="md" icon={<NoteIcon />}>
              The popover stretches to the className width
            </ListButton>
            <ListButton size="md" icon={<CheckIcon />}>
              Long rows wrap inside the surface
            </ListButton>
          </List>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

export function PositionExample() {
  const [side, setSide] = useState<PopoverSide>('bottom');
  const [alignment, setAlignment] = useState<PopoverAlignment>('center');
  const position = composePosition(side, alignment);
  return (
    <Example
      source={EXAMPLE_SOURCE.PositionExample}
      state={{ position }}
      previewClassName="min-h-96"
      controls={
        <>
          <ExampleToolbar>
            <Segmented>
              {SIDES.map((s) => (
                <SegmentedButton
                  key={s}
                  active={side === s}
                  onClick={() => setSide(s)}
                >
                  {s}
                </SegmentedButton>
              ))}
            </Segmented>
          </ExampleToolbar>
          <ExampleToolbar>
            <Segmented>
              {ALIGNMENTS.map((a) => (
                <SegmentedButton
                  key={a}
                  active={alignment === a}
                  onClick={() => setAlignment(a)}
                >
                  {a}
                </SegmentedButton>
              ))}
            </Segmented>
          </ExampleToolbar>
        </>
      }
    >
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <Button>Anchor</Button>
        </PopoverTrigger>
        <Popover
          className="w-48"
          offset={8}
          position={position}
          closeOnBackdropClick={false}
        >
          <div className="flex flex-col gap-1 p-3">
            <SectionTitle>Position</SectionTitle>
            <span className="font-mono text-sm">{position}</span>
          </div>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

const OFFSETS = [0, 4, 8, 16, 32] as const;
type OffsetValue = (typeof OFFSETS)[number];

export function OffsetExample() {
  const [offset, setOffset] = useState<OffsetValue>(8);
  return (
    <Example
      source={EXAMPLE_SOURCE.OffsetExample}
      state={{ offset }}
      previewClassName="min-h-80"
      controls={
        <ExampleToolbar>
          <Segmented>
            {OFFSETS.map((o) => (
              <SegmentedButton
                key={o}
                active={offset === o}
                onClick={() => setOffset(o)}
              >
                {o}px
              </SegmentedButton>
            ))}
          </Segmented>
        </ExampleToolbar>
      }
    >
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <Button>Anchor</Button>
        </PopoverTrigger>
        <Popover className="w-48" offset={offset} closeOnBackdropClick={false}>
          <div className="flex flex-col gap-1 p-3">
            <SectionTitle>Offset</SectionTitle>
            <span className="font-mono text-sm">{offset}px</span>
          </div>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

export function BackdropExample() {
  const [backdrop, setBackdrop] = useState(true);
  const [transparent, setTransparent] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.BackdropExample}
      state={{ backdrop, backdropTransparent: transparent }}
      controls={
        <ExampleToolbar>
          <ExampleControlSwitch
            label="Backdrop"
            checked={backdrop}
            onChange={setBackdrop}
          />
          <ExampleControlSwitch
            label="Transparent"
            checked={transparent}
            onChange={setTransparent}
          />
        </ExampleToolbar>
      }
    >
      <PopoverRoot>
        <PopoverTrigger>
          <Button>Open with backdrop</Button>
        </PopoverTrigger>
        <Popover
          className="w-64"
          offset={8}
          backdrop={backdrop}
          backdropTransparent={transparent}
        >
          <div className="flex flex-col gap-2 p-4">
            <SectionTitle>Backdrop</SectionTitle>
            <p className="text-sm">
              Click anywhere outside the popover to close it. The backdrop dims
              the page below — turn on transparent to keep the dismiss surface
              without the visual dim.
            </p>
          </div>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

export function ColorExample() {
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      state={{ color }}
      previewClassName="min-h-80"
      controls={
        <ExampleToolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </ExampleToolbar>
      }
    >
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <Button color={color}>Open {color} popover</Button>
        </PopoverTrigger>
        <Popover
          className="w-56"
          offset={8}
          color={color}
          closeOnBackdropClick={false}
        >
          <div className="flex flex-col gap-2 p-4">
            <SectionTitle>Accent color</SectionTitle>
            <p className="text-sm">
              color tints the surface, ring, and any cladd-color-aware children
              like Chips.
            </p>
            <div className="flex gap-1">
              <Chip color={color}>{color}</Chip>
              <Chip color={color}>chip</Chip>
            </div>
          </div>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

export function VariantExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  return (
    <Example
      source={EXAMPLE_SOURCE.VariantExample}
      state={{ variant }}
      previewClassName="min-h-80"
      controls={
        <ExampleToolbar>
          <ExampleControlVariant value={variant} onChange={setVariant} />
        </ExampleToolbar>
      }
    >
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <Button>Show popover</Button>
        </PopoverTrigger>
        <Popover
          className="w-64"
          offset={8}
          variant={variant}
          closeOnBackdropClick={false}
        >
          <div className="flex flex-col gap-2 p-4">
            <SectionTitle>Surface variant</SectionTitle>
            <p className="text-sm">
              The popover surface uses the "{variant}" variant. Fill variants
              flood the surface with the accent.
            </p>
          </div>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

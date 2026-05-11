import {
  Button,
  Segmented,
  SegmentedButton,
  Shortcut,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
  type Color,
  type TooltipPosition,
} from '@cladd-ui/react';
import { useRef, useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { BoldIcon } from '@/components/icons/BoldIcon';
import { CopyIcon } from '@/components/icons/CopyIcon';
import { ItalicIcon } from '@/components/icons/ItalicIcon';
import { UnderlineIcon } from '@/components/icons/UnderlineIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/tooltip';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <Toolbar>
        <Tooltip
          contentClassName="flex items-center gap-2"
          tooltip={
            <>
              Bold <Shortcut variant="gradient-fill">cmd B</Shortcut>
            </>
          }
        >
          <ToolbarButton aria-label="Bold">
            <BoldIcon />
          </ToolbarButton>
        </Tooltip>
        <Tooltip
          contentClassName="flex items-center gap-2"
          tooltip={
            <>
              Italic <Shortcut variant="gradient-fill">cmd I</Shortcut>
            </>
          }
        >
          <ToolbarButton aria-label="Italic">
            <ItalicIcon />
          </ToolbarButton>
        </Tooltip>
        <Tooltip
          contentClassName="flex items-center gap-2"
          tooltip={
            <>
              Underline <Shortcut variant="gradient-fill">cmd U</Shortcut>
            </>
          }
        >
          <ToolbarButton aria-label="Underline">
            <UnderlineIcon />
          </ToolbarButton>
        </Tooltip>
        <ToolbarSeparator />
        <Tooltip tooltip="Copy to clipboard" position="bottom" color="brand">
          <ToolbarButton aria-label="Copy">
            <CopyIcon />
          </ToolbarButton>
        </Tooltip>
      </Toolbar>
    </Example>
  );
}

export function WrapperExample() {
  return (
    <Example source={EXAMPLE_SOURCE.WrapperExample}>
      <Tooltip tooltip="Hover me — this is a tooltip">
        <Button>Hover the button</Button>
      </Tooltip>
    </Example>
  );
}

export function PositionExample() {
  const [position, setPosition] = useState<TooltipPosition>('top');
  const POSITIONS: TooltipPosition[] = ['top', 'bottom'];
  return (
    <Example
      source={EXAMPLE_SOURCE.PositionExample}
      state={{ position }}
      controls={
        <ExampleToolbar>
          <Segmented>
            {POSITIONS.map((p) => (
              <SegmentedButton
                key={p}
                active={p === position}
                onClick={() => setPosition(p)}
              >
                {p}
              </SegmentedButton>
            ))}
          </Segmented>
        </ExampleToolbar>
      }
    >
      <Tooltip tooltip="Hello from a tooltip" position={position}>
        <Button>Hover me</Button>
      </Tooltip>
    </Example>
  );
}

export function ColorExample() {
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      state={{ color }}
      controls={
        <ExampleToolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </ExampleToolbar>
      }
    >
      <Tooltip tooltip={color} color={color}>
        <Button color={color} variant="gradient">
          Hover me
        </Button>
      </Tooltip>
    </Example>
  );
}

export function TimeoutExample() {
  const [timeout, setTimeoutValue] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.TimeoutExample}
      state={{ timeout }}
      controls={
        <ExampleToolbar>
          <ExampleControlSwitch
            label="timeout"
            checked={timeout}
            onChange={setTimeoutValue}
          />
        </ExampleToolbar>
      }
    >
      <Tooltip
        tooltip={timeout ? 'Standard delay' : 'Appears instantly'}
        timeout={timeout}
      >
        <Button>Hover me</Button>
      </Tooltip>
    </Example>
  );
}

export function ShortcutExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.ShortcutExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Tooltip
        contentClassName="flex items-center gap-2"
        tooltip={
          <>
            Save document <Shortcut variant="gradient-fill">cmd S</Shortcut>
          </>
        }
      >
        <Button color="brand" variant="gradient">
          Save
        </Button>
      </Tooltip>
      <Tooltip
        contentClassName="flex items-center gap-2"
        tooltip={
          <>
            Undo <Shortcut variant="gradient-fill">cmd Z</Shortcut>
          </>
        }
      >
        <Button>Undo</Button>
      </Tooltip>
      <Tooltip
        contentClassName="flex items-center gap-2"
        tooltip={
          <>
            Quit <Shortcut variant="gradient-fill">cmd Q</Shortcut>
          </>
        }
      >
        <Button>Quit</Button>
      </Tooltip>
    </Example>
  );
}

export function RichContentExample() {
  return (
    <Example source={EXAMPLE_SOURCE.RichContentExample}>
      <Tooltip
        className="max-w-64"
        contentClassName="flex flex-col gap-1 px-4 py-2"
        tooltip={
          <>
            <span className="flex items-center justify-between gap-2 font-semibold">
              <span>Publish</span>
              <Shortcut variant="gradient-fill">cmd shift P</Shortcut>
            </span>
            <span className="text-cladd-fg-soft">
              Promote the current draft to production. Subscribers get notified
              within a few seconds.
            </span>
          </>
        }
      >
        <Button color="brand" variant="gradient">
          Publish
        </Button>
      </Tooltip>
    </Example>
  );
}

export function SizeExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Tooltip
        tooltip="Compact tooltip"
        className="text-cladd-2xs"
        contentClassName="px-1 py-1"
      >
        <Button size="xs">small</Button>
      </Tooltip>
      <Tooltip tooltip="Default tooltip">
        <Button>default</Button>
      </Tooltip>
      <Tooltip
        tooltip="Larger tooltip with more room to breathe"
        className="max-w-64 text-cladd-sm"
        contentClassName="px-4 py-2"
      >
        <Button size="lg">large</Button>
      </Tooltip>
    </Example>
  );
}

export function ControlledExample() {
  const anchorRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.ControlledExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Button ref={anchorRef}>External trigger</Button>
      <Button onClick={() => setOpen((o) => !o)} variant="gradient">
        {open ? 'Hide' : 'Show'} tooltip
      </Button>
      <Tooltip
        open={open}
        onOpenChange={setOpen}
        anchorRef={anchorRef}
        color="brand"
      >
        Controlled tooltip — toggled by an unrelated button
      </Tooltip>
    </Example>
  );
}

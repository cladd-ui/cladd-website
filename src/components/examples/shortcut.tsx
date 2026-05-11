import {
  Button,
  List,
  ListButton,
  ListSeparator,
  Shortcut,
  Surface,
  Tooltip,
  type ButtonSize,
  type Color,
  type ShortcutSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleControlVariant,
  ExampleToolbar,
  type SurfaceVariant,
} from '@/components/ExampleControls';
import { BoldIcon } from '@/components/icons/BoldIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { CopyIcon } from '@/components/icons/CopyIcon';
import { ItalicIcon } from '@/components/icons/ItalicIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { UnderlineIcon } from '@/components/icons/UnderlineIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/shortcut';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Shortcut>esc</Shortcut>
      <Shortcut>cmd s</Shortcut>
      <Shortcut>cmd shift p</Shortcut>
      <Shortcut>shift up</Shortcut>
      <Shortcut color="brand">enter</Shortcut>
      <Shortcut variant="transparent">alt tab</Shortcut>
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<ShortcutSize>('md');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize value={size} onChange={setSize} />
        </ExampleToolbar>
      }
    >
      <Shortcut size={size}>cmd shift k</Shortcut>
    </Example>
  );
}

export function InsideButtonExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  return (
    <Example
      source={EXAMPLE_SOURCE.InsideButtonExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize value={size} onChange={setSize} />
        </ExampleToolbar>
      }
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Button size={size}>
        Save
        <Shortcut size={size}>cmd s</Shortcut>
      </Button>
      <Button size={size} variant="transparent" outline>
        Search
        <Shortcut size={size}>cmd k</Shortcut>
      </Button>
    </Example>
  );
}

export function InsideTooltipExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.InsideTooltipExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Tooltip
        tooltip={
          <span className="flex items-center gap-2">
            Bold
            <Shortcut variant="solid-fill">cmd b</Shortcut>
          </span>
        }
      >
        <Button variant="transparent" outline aria-label="Bold">
          <BoldIcon />
        </Button>
      </Tooltip>
      <Tooltip
        tooltip={
          <span className="flex items-center gap-2">
            Italic
            <Shortcut variant="solid-fill">cmd i</Shortcut>
          </span>
        }
      >
        <Button variant="transparent" outline aria-label="Italic">
          <ItalicIcon />
        </Button>
      </Tooltip>
      <Tooltip
        tooltip={
          <span className="flex items-center gap-2">
            Underline
            <Shortcut variant="solid-fill">cmd u</Shortcut>
          </span>
        }
      >
        <Button variant="transparent" outline aria-label="Underline">
          <UnderlineIcon />
        </Button>
      </Tooltip>
    </Example>
  );
}

export function InsideListExample() {
  return (
    <Example source={EXAMPLE_SOURCE.InsideListExample}>
      <Surface outline className="w-72 rounded-2xl" wrapContent={false}>
        <List>
          <ListButton
            icon={<CopyIcon />}
            after={
              <Shortcut
                variant="transparent"
                keyClassName="font-normal text-cladd-fg-soft"
              >
                cmd c
              </Shortcut>
            }
          >
            Copy
          </ListButton>
          <ListButton
            icon={<PlusIcon />}
            after={
              <Shortcut
                variant="transparent"
                keyClassName="font-normal text-cladd-fg-soft"
              >
                cmd d
              </Shortcut>
            }
          >
            Duplicate
          </ListButton>
          <ListButton
            icon={<CheckIcon />}
            after={
              <Shortcut
                variant="transparent"
                keyClassName="font-normal text-cladd-fg-soft"
              >
                enter
              </Shortcut>
            }
          >
            Mark as done
          </ListButton>
          <ListSeparator />
          <ListButton
            color="red"
            after={
              <Shortcut variant="transparent" keyClassName="font-normal">
                backspace
              </Shortcut>
            }
          >
            Delete
          </ListButton>
        </List>
      </Surface>
    </Example>
  );
}

export function GlyphsExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.GlyphsExample}
      previewClassName="gap-2 flex-wrap content-center"
    >
      <Shortcut>cmd</Shortcut>
      <Shortcut>ctrl</Shortcut>
      <Shortcut>alt</Shortcut>
      <Shortcut>shift</Shortcut>
      <Shortcut>enter</Shortcut>
      <Shortcut>tab</Shortcut>
      <Shortcut>space</Shortcut>
      <Shortcut>esc</Shortcut>
      <Shortcut>backspace</Shortcut>
      <Shortcut>up</Shortcut>
      <Shortcut>down</Shortcut>
      <Shortcut>left</Shortcut>
      <Shortcut>right</Shortcut>
    </Example>
  );
}

export function VariantExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  return (
    <Example
      source={EXAMPLE_SOURCE.VariantExample}
      state={{ variant }}
      controls={
        <ExampleToolbar>
          <ExampleControlVariant value={variant} onChange={setVariant} />
        </ExampleToolbar>
      }
    >
      <Shortcut variant={variant}>cmd shift s</Shortcut>
    </Example>
  );
}

export function OutlineExample() {
  const [outline, setOutline] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.OutlineExample}
      state={{ outline }}
      controls={
        <ExampleToolbar>
          <ExampleControlSwitch
            label="outline"
            checked={outline}
            onChange={setOutline}
          />
        </ExampleToolbar>
      }
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Shortcut outline={outline}>cmd k</Shortcut>
      <Shortcut outline={outline} variant="transparent">
        cmd k
      </Shortcut>
      <Shortcut outline={outline} color="brand">
        enter
      </Shortcut>
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
      <Shortcut color={color}>cmd shift k</Shortcut>
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<ShortcutSize>('md');
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  const [color, setColor] = useState<Color>('brand');
  const [outline, setOutline] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, variant, color, outline }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="outline"
              checked={outline}
              onChange={setOutline}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlVariant value={variant} onChange={setVariant} />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      <Shortcut size={size} variant={variant} color={color} outline={outline}>
        cmd shift enter
      </Shortcut>
    </Example>
  );
}

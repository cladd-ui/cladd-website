import {
  ToggleButton,
  ToggleGroup,
  Toolbar,
  ToolbarSeparator,
  type ButtonSize,
  type Color,
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
import { AlignCenterIcon } from '@/components/icons/AlignCenterIcon';
import { AlignLeftIcon } from '@/components/icons/AlignLeftIcon';
import { AlignRightIcon } from '@/components/icons/AlignRightIcon';
import { BoldIcon } from '@/components/icons/BoldIcon';
import { ItalicIcon } from '@/components/icons/ItalicIcon';
import { UnderlineIcon } from '@/components/icons/UnderlineIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/toggle-group';

import { Example } from '../Example';

export function OverviewExample() {
  const [view, setView] = useState<string | string[] | undefined>('grid');
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <Toolbar>
        <ToggleGroup value={view} onValueChange={setView}>
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="board">Board</ToggleButton>
        </ToggleGroup>
      </Toolbar>
    </Example>
  );
}

export function MultipleExample() {
  const [marks, setMarks] = useState<string | string[] | undefined>(['bold']);
  return (
    <Example source={EXAMPLE_SOURCE.MultipleExample}>
      <Toolbar>
        <ToggleGroup multiple value={marks} onValueChange={setMarks}>
          <ToggleButton value="bold" aria-label="Bold">
            <BoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="Italic">
            <ItalicIcon />
          </ToggleButton>
          <ToggleButton value="underline" aria-label="Underline">
            <UnderlineIcon />
          </ToggleButton>
        </ToggleGroup>
      </Toolbar>
    </Example>
  );
}

export function StandaloneExample() {
  const [pinned, setPinned] = useState(false);
  return (
    <Example source={EXAMPLE_SOURCE.StandaloneExample} previewClassName="gap-4">
      <ToggleButton defaultSelected>Mute</ToggleButton>
      <ToggleButton selected={pinned} onChange={setPinned} activeColor="orange">
        {pinned ? 'Pinned' : 'Pin'}
      </ToggleButton>
    </Example>
  );
}

export function ColorExample() {
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      state={{ activeColor: color }}
      controls={
        <ExampleToolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </ExampleToolbar>
      }
    >
      <Toolbar>
        <ToggleGroup defaultValue="grid" activeColor={color}>
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="board">Board</ToggleButton>
        </ToggleGroup>
      </Toolbar>
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<ButtonSize>('md');
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
      <Toolbar size={size}>
        <ToggleGroup defaultValue="grid">
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="board">Board</ToggleButton>
        </ToggleGroup>
      </Toolbar>
    </Example>
  );
}

export function MultipleGroupsExample() {
  const [marks, setMarks] = useState<string | string[] | undefined>(['bold']);
  const [align, setAlign] = useState<string | string[] | undefined>('left');
  return (
    <Example source={EXAMPLE_SOURCE.MultipleGroupsExample}>
      <Toolbar>
        <ToggleGroup multiple value={marks} onValueChange={setMarks}>
          <ToggleButton value="bold" aria-label="Bold">
            <BoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="Italic">
            <ItalicIcon />
          </ToggleButton>
          <ToggleButton value="underline" aria-label="Underline">
            <UnderlineIcon />
          </ToggleButton>
        </ToggleGroup>
        <ToolbarSeparator />
        <ToggleGroup value={align} onValueChange={setAlign}>
          <ToggleButton value="left" aria-label="Align left">
            <AlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="Align center">
            <AlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" aria-label="Align right">
            <AlignRightIcon />
          </ToggleButton>
        </ToggleGroup>
      </Toolbar>
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [activeColor, setActiveColor] = useState<Color>('brand');
  const [activeVariant, setActiveVariant] =
    useState<SurfaceVariant>('gradient');
  const [multiple, setMultiple] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, activeColor, activeVariant, multiple }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlVariant
              value={activeVariant}
              onChange={setActiveVariant}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="multiple"
              checked={multiple}
              onChange={setMultiple}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor
              value={activeColor}
              onChange={setActiveColor}
            />
          </ExampleToolbar>
        </>
      }
    >
      <Toolbar size={size}>
        <ToggleGroup
          multiple={multiple}
          defaultValue={['grid']}
          activeColor={activeColor}
          activeVariant={activeVariant}
        >
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="board">Board</ToggleButton>
        </ToggleGroup>
      </Toolbar>
    </Example>
  );
}

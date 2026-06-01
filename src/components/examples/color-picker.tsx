import {
  Button,
  Chip,
  ColorPicker,
  SectionTitle,
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
  ExampleToolbar,
} from '@/components/ExampleControls';
import { Fill } from '@/components/icons/FillIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/color-picker';

import { Example } from '../Example';

const PICKER_SIZES: readonly ButtonSize[] = ['sm', 'md', 'lg'];

const PALETTE = [
  '#3b82f6',
  '#22c55e',
  '#ef4444',
  '#eab308',
  '#f97316',
  '#a855f7',
  '#ec4899',
  '#14b8a6',
];

export function OverviewExample() {
  const [value, setValue] = useState('#3b82f6');
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample} previewSurface>
      <ColorPicker
        value={value}
        onChange={(c) => setValue(c.hex)}
        className="w-48"
      />
    </Example>
  );
}

export function EmptyExample() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Example source={EXAMPLE_SOURCE.EmptyExample} previewSurface>
      <ColorPicker
        value={value}
        placeholder="No fill"
        onChange={(c) => setValue(c.hex)}
        className="w-48"
      />
    </Example>
  );
}

export function GradientExample() {
  const [value, setValue] = useState(
    'linear-gradient(90deg, #3b82f6, #a855f7)',
  );
  return (
    <Example source={EXAMPLE_SOURCE.GradientExample} previewSurface>
      <ColorPicker
        gradient
        value={value}
        swatches={PALETTE}
        onChange={(c) => setValue(c.css)}
        className="w-48"
      />
    </Example>
  );
}

export function CustomValueExample() {
  const [value, setValue] = useState('#22c55e');
  return (
    <Example source={EXAMPLE_SOURCE.CustomValueExample} previewSurface>
      <ColorPicker
        value={value}
        onChange={(c) => setValue(c.hex)}
        icon={<Fill className="size-4" />}
        className="w-56"
      >
        <span className="flex w-full items-center gap-2">
          <span className="font-mono uppercase">{value}</span>
          <span className="ml-auto text-cladd-fg-softer">Fill</span>
        </span>
      </ColorPicker>
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [value, setValue] = useState('#f97316');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      previewSurface
      previewClassName="gap-8"
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={PICKER_SIZES}
          />
        </ExampleToolbar>
      }
    >
      <ColorPicker
        size={size}
        value={value}
        onChange={(c) => setValue(c.hex)}
        className="w-40"
      />
      <ColorPicker
        size={size}
        rounded
        outline
        value={value}
        onChange={(c) => setValue(c.hex)}
        className="w-40"
      />
    </Example>
  );
}

export function InToolbarExample() {
  const [fill, setFill] = useState('#3b82f6');
  const [stroke, setStroke] = useState('#0f172a');
  return (
    <Example source={EXAMPLE_SOURCE.InToolbarExample} previewSurface>
      <Toolbar aria-label="Shape style">
        <span className="px-2 text-xs font-semibold text-cladd-fg-soft">
          Fill
        </span>
        <ColorPicker
          rounded
          value={fill}
          onChange={(c) => setFill(c.hex)}
          className="w-32"
        />
        <ToolbarSeparator />
        <span className="px-2 text-xs font-semibold text-cladd-fg-soft">
          Stroke
        </span>
        <ColorPicker
          rounded
          value={stroke}
          onChange={(c) => setStroke(c.hex)}
          className="w-32"
        />
      </Toolbar>
    </Example>
  );
}

export function HeaderFooterExample() {
  const [value, setValue] = useState('#7c3aed');
  const [open, setOpen] = useState(false);
  return (
    <Example source={EXAMPLE_SOURCE.HeaderFooterExample} previewSurface>
      <ColorPicker
        value={value}
        onChange={(c) => setValue(c.hex)}
        swatches={PALETTE}
        className="w-48"
        popoverState={open}
        onPopoverState={setOpen}
        header={
          <div className="mb-2 flex items-center justify-between gap-2">
            <SectionTitle>Fill</SectionTitle>
            <Chip
              size="md"
              className="font-mono font-medium"
              contentClassName="text-xs"
            >
              {value}
            </Chip>
          </div>
        }
        footer={
          <Button
            color="brand"
            size="md"
            rounded
            className="mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            Apply fill
          </Button>
        }
      />
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [color, setColor] = useState<Color>('brand');
  const [rounded, setRounded] = useState(false);
  const [outline, setOutline] = useState(false);
  const [gradient, setGradient] = useState(false);
  const [solid, setSolid] = useState('#3b82f6');
  const [grad, setGrad] = useState('linear-gradient(90deg, #3b82f6, #a855f7)');
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, color, rounded, outline, gradient }}
      previewSurface
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={PICKER_SIZES}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="rounded"
              checked={rounded}
              onChange={setRounded}
            />
            <ExampleControlSwitch
              label="outline"
              checked={outline}
              onChange={setOutline}
            />
            <ExampleControlSwitch
              label="gradient"
              checked={gradient}
              onChange={setGradient}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      {gradient ? (
        <ColorPicker
          gradient
          size={size}
          color={color}
          rounded={rounded}
          outline={outline}
          swatches={PALETTE}
          value={grad}
          onChange={(c) => setGrad(c.css)}
          className="w-48"
        />
      ) : (
        <ColorPicker
          size={size}
          color={color}
          rounded={rounded}
          outline={outline}
          swatches={PALETTE}
          value={solid}
          onChange={(c) => setSolid(c.hex)}
          className="w-48"
        />
      )}
    </Example>
  );
}

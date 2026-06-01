import {
  Button,
  Chip,
  ColorEditor,
  SectionTitle,
  Surface,
  type Color,
  type ColorEditorControlSize,
  type ColorEditorFormat,
  type ColorEditorValue,
  type ColorValue,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/color-editor';

import { Example } from '../Example';

const CONTROL_SIZES: readonly ColorEditorControlSize[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

const FORMATS: readonly ColorEditorFormat[] = ['rgb', 'hsl', 'hsb'];

// Solid preset thumbs — clicking one applies it to the color (or the
// selected gradient stop). Swatches are solid colors only.
const PALETTE = [
  '#2f6bff',
  '#0ea5e9',
  '#22c55e',
  '#eab308',
  '#f97316',
  '#ef4444',
  '#ec4899',
  '#a855f7',
  '#64748b',
  '#0f172a',
];

export function OverviewExample() {
  const [color, setColor] = useState('#2f6bff');
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewSurface
      previewClassName="content-center"
    >
      <div className="w-56">
        <ColorEditor
          value={color}
          onChange={(c: ColorValue) => setColor(c.hex)}
          swatches={PALETTE}
        />
      </div>
    </Example>
  );
}

export function FormatExample() {
  const [color, setColor] = useState('#a855f7');
  const [format, setFormat] = useState<ColorEditorFormat>('rgb');
  return (
    <Example
      source={EXAMPLE_SOURCE.FormatExample}
      previewSurface
      state={{ format }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={format}
            onChange={setFormat}
            sizes={FORMATS}
          />
        </ExampleToolbar>
      }
      previewClassName="content-center"
    >
      <div className="w-56">
        <ColorEditor
          value={color}
          onChange={(c: ColorValue) => setColor(c.hex)}
          format={format}
        />
      </div>
    </Example>
  );
}

export function GradientExample() {
  const [css, setCss] = useState(
    'linear-gradient(90deg, #2f6bff 0%, #ec4899 100%)',
  );
  return (
    <Example
      source={EXAMPLE_SOURCE.GradientExample}
      previewSurface
      previewClassName="content-center"
    >
      <div className="w-64">
        <ColorEditor
          gradient
          value={css}
          onChange={(c: ColorEditorValue) => setCss(c.css)}
          swatches={PALETTE}
        />
      </div>
    </Example>
  );
}

export function AngleButtonExample() {
  const [css, setCss] = useState(
    'linear-gradient(45deg, #22c55e 0%, #0ea5e9 100%)',
  );
  return (
    <Example
      source={EXAMPLE_SOURCE.AngleButtonExample}
      previewSurface
      previewClassName="content-center"
    >
      <div className="w-64">
        <ColorEditor
          gradient
          angleControl="button"
          value={css}
          onChange={(c: ColorEditorValue) => setCss(c.css)}
        />
      </div>
    </Example>
  );
}

export function CompactExample() {
  const [color, setColor] = useState('#f97316');
  return (
    <Example
      source={EXAMPLE_SOURCE.CompactExample}
      previewClassName="content-center"
    >
      <Surface outline className="w-56 rounded-3xl" contentClassName="p-4">
        <ColorEditor
          value={color}
          onChange={(c: ColorValue) => setColor(c.hex)}
          alpha={false}
          inputs={false}
          hexInput={false}
          areaClassName="h-24"
        />
      </Surface>
    </Example>
  );
}

export function ControlSizeExample() {
  const [color, setColor] = useState('#0ea5e9');
  const [controlSize, setControlSize] = useState<ColorEditorControlSize>('md');
  return (
    <Example
      source={EXAMPLE_SOURCE.ControlSizeExample}
      previewSurface
      state={{ controlSize }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={controlSize}
            onChange={setControlSize}
            sizes={CONTROL_SIZES}
          />
        </ExampleToolbar>
      }
      previewClassName="content-center"
    >
      <div className="w-64">
        <ColorEditor
          value={color}
          onChange={(c: ColorValue) => setColor(c.hex)}
          controlSize={controlSize}
        />
      </div>
    </Example>
  );
}

export function ControlOutlineExample() {
  const [color, setColor] = useState('#22c55e');
  const [controlOutline, setControlOutline] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.ControlOutlineExample}
      previewSurface
      state={{ controlOutline }}
      controls={
        <ExampleToolbar>
          <ExampleControlSwitch
            label="controlOutline"
            checked={controlOutline}
            onChange={setControlOutline}
          />
        </ExampleToolbar>
      }
      previewClassName="content-center"
    >
      <div className="w-64">
        <ColorEditor
          value={color}
          onChange={(c: ColorValue) => setColor(c.hex)}
          controlOutline={controlOutline}
        />
      </div>
    </Example>
  );
}

export function HeaderFooterExample() {
  const [color, setColor] = useState('#7c3aed');
  return (
    <Example
      source={EXAMPLE_SOURCE.HeaderFooterExample}
      previewClassName="content-center"
    >
      <Surface outline className="w-64 rounded-3xl" contentClassName="p-4">
        <ColorEditor
          value={color}
          onChange={(c: ColorValue) => setColor(c.hex)}
          swatches={PALETTE}
          header={
            <div className="flex items-center justify-between gap-2">
              <SectionTitle>Fill</SectionTitle>
              <Chip
                size="md"
                className="font-mono font-medium"
                contentClassName="text-xs"
              >
                {color}
              </Chip>
            </div>
          }
          footer={
            <Button color="brand" size="md" rounded className="mt-2 w-full">
              Apply fill
            </Button>
          }
        />
      </Surface>
    </Example>
  );
}

export function PlaygroundExample() {
  const [color, setColor] = useState('#2f6bff');
  const [css, setCss] = useState(
    'linear-gradient(90deg, #2f6bff 0%, #a855f7 100%)',
  );
  const [accent, setAccent] = useState<Color>('brand');
  const [controlSize, setControlSize] = useState<ColorEditorControlSize>('md');
  const [format, setFormat] = useState<ColorEditorFormat>('rgb');
  const [alpha, setAlpha] = useState(true);
  const [inputs, setInputs] = useState(true);
  const [hexInput, setHexInput] = useState(true);
  const [controlOutline, setControlOutline] = useState(true);
  const [gradient, setGradient] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{
        controlSize,
        format,
        alpha,
        inputs,
        hexInput,
        controlOutline,
        gradient,
      }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize
              value={controlSize}
              onChange={setControlSize}
              sizes={CONTROL_SIZES}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSize
              value={format}
              onChange={setFormat}
              sizes={FORMATS}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="gradient"
              checked={gradient}
              onChange={setGradient}
            />
            <ExampleControlSwitch
              label="alpha"
              checked={alpha}
              onChange={setAlpha}
            />
            <ExampleControlSwitch
              label="inputs"
              checked={inputs}
              onChange={setInputs}
            />
            <ExampleControlSwitch
              label="hexInput"
              checked={hexInput}
              onChange={setHexInput}
            />
            <ExampleControlSwitch
              label="controlOutline"
              checked={controlOutline}
              onChange={setControlOutline}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={accent} onChange={setAccent} />
          </ExampleToolbar>
        </>
      }
      previewClassName="content-center"
    >
      <Surface
        outline
        color={accent}
        className="w-72 rounded-3xl"
        contentClassName="p-4"
      >
        {gradient ? (
          <ColorEditor
            gradient
            value={css}
            onChange={(c: ColorEditorValue) => setCss(c.css)}
            controlSize={controlSize}
            format={format}
            alpha={alpha}
            inputs={inputs}
            hexInput={hexInput}
            controlOutline={controlOutline}
            swatches={PALETTE}
          />
        ) : (
          <ColorEditor
            value={color}
            onChange={(c: ColorValue) => setColor(c.hex)}
            controlSize={controlSize}
            format={format}
            alpha={alpha}
            inputs={inputs}
            hexInput={hexInput}
            controlOutline={controlOutline}
            swatches={PALETTE}
          />
        )}
      </Surface>
    </Example>
  );
}

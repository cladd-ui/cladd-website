import {
  NumberScrubber,
  SectionTitle,
  Surface,
  Toolbar,
  type Color,
  type NumberScrubberSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleControlVariant,
  type SurfaceVariant,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/number-scrubber';

import { Example } from '../Example';

const SCRUBBER_SIZES: readonly NumberScrubberSize[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

export function OverviewExample() {
  const [opacity, setOpacity] = useState(85);
  const [fontSize, setFontSize] = useState(14);
  const [tracking, setTracking] = useState(0);
  const [rotation, setRotation] = useState(0);
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewSurface
      previewClassName="!p-0"
    >
      <Surface
        outline
        variant="solid"
        className="w-72 rounded-2xl"
        contentClassName="flex flex-col gap-2 p-4"
      >
        <SectionTitle>Type</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          <NumberScrubber
            value={fontSize}
            onChange={setFontSize}
            min={8}
            max={120}
            displayValue={(v) => `${v}px`}
          />
          <NumberScrubber
            value={tracking}
            onChange={setTracking}
            min={-20}
            max={200}
            step={1}
            displayValue={(v) => `${v > 0 ? '+' : ''}${v}`}
          />
        </div>
        <SectionTitle className="mt-2">Layer</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          <NumberScrubber
            value={opacity}
            onChange={setOpacity}
            min={0}
            max={100}
            displayValue={(v) => `${v}%`}
          />
          <NumberScrubber
            value={rotation}
            onChange={setRotation}
            min={-360}
            max={360}
            displayValue={(v) => `${v}°`}
          />
        </div>
      </Surface>
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<NumberScrubberSize>('md');
  const [value, setValue] = useState(16);
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      previewSurface
      controls={
        <Toolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={SCRUBBER_SIZES}
          />
        </Toolbar>
      }
    >
      <NumberScrubber
        size={size}
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        displayValue={(v) => `${v}px`}
        className="w-28"
      />
    </Example>
  );
}

export function ScrubAndEditExample() {
  const [value, setValue] = useState(24);
  return (
    <Example source={EXAMPLE_SOURCE.ScrubAndEditExample} previewSurface>
      <NumberScrubber
        value={value}
        onChange={setValue}
        min={0}
        max={200}
        displayValue={(v) => `${v}px`}
        className="w-32"
      />
    </Example>
  );
}

export function DisplayValueExample() {
  const [percent, setPercent] = useState(72);
  const [duration, setDuration] = useState(320);
  const [tracking, setTracking] = useState(-5);
  const [count, setCount] = useState(1284);
  return (
    <Example
      source={EXAMPLE_SOURCE.DisplayValueExample}
      previewSurface
      previewClassName="flex-wrap gap-2"
    >
      <NumberScrubber
        value={percent}
        onChange={setPercent}
        min={0}
        max={100}
        displayValue={(v) => `${v}%`}
        className="w-28"
      />
      <NumberScrubber
        value={duration}
        onChange={setDuration}
        min={0}
        max={2000}
        step={10}
        displayValue={(v) => `${v}ms`}
        className="w-28"
      />
      <NumberScrubber
        value={tracking}
        onChange={setTracking}
        min={-20}
        max={20}
        displayValue={(v) => `${v > 0 ? '+' : ''}${v}`}
        className="w-28"
      />
      <NumberScrubber
        value={count}
        onChange={setCount}
        min={0}
        max={1000000}
        step={1}
        displayValue={(v) => v.toLocaleString('en-US')}
        className="w-32"
      />
    </Example>
  );
}

export function RangeStepExample() {
  const [coarse, setCoarse] = useState(50);
  const [fine, setFine] = useState(0.5);
  return (
    <Example
      source={EXAMPLE_SOURCE.RangeStepExample}
      previewSurface
      previewClassName="flex-col gap-3"
    >
      <NumberScrubber
        value={coarse}
        onChange={setCoarse}
        min={0}
        max={100}
        step={5}
        dragStep={1}
        altDragStep={0.25}
        displayValue={(v) => `${v}%`}
        className="w-32"
      />
      <NumberScrubber
        value={fine}
        onChange={setFine}
        min={0}
        max={5}
        step={0.05}
        dragStep={0.01}
        altDragStep={0.5}
        displayValue={(v) => v.toFixed(2)}
        className="w-32"
      />
    </Example>
  );
}

export function TemporaryChangeExample() {
  const [committed, setCommitted] = useState(40);
  const [preview, setPreview] = useState(40);
  return (
    <Example
      source={EXAMPLE_SOURCE.TemporaryChangeExample}
      previewSurface
      previewClassName="flex-col gap-4"
    >
      <NumberScrubber
        value={committed}
        onTemporaryChange={setPreview}
        onChange={(v) => {
          setCommitted(v);
          setPreview(v);
        }}
        min={0}
        max={128}
        displayValue={(v) => `${v}px`}
        className="w-32"
      />
      <span
        className="cladd-color-brand block h-2 self-start rounded-lg bg-cladd-primary"
        style={{ width: preview }}
      />
      <div className="flex items-center gap-3 font-mono text-cladd-fg-softer">
        <span className="w-25 text-right">preview: {preview}</span>
      </div>
      <div className="font-mono text-cladd-fg-softer">
        committed: {committed}
      </div>
    </Example>
  );
}

export function StatesExample() {
  const [scrubberIcon, setScrubberIcon] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [disabled, setDisabled] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.StatesExample}
      state={{ scrubberIcon, readOnly, disabled }}
      previewSurface
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="scrubberIcon"
            checked={scrubberIcon}
            onChange={setScrubberIcon}
          />
          <ExampleControlSwitch
            label="readOnly"
            checked={readOnly}
            onChange={(v) => {
              setReadOnly(v);
              if (v) setDisabled(false);
            }}
          />
          <ExampleControlSwitch
            label="disabled"
            checked={disabled}
            onChange={(v) => {
              setDisabled(v);
              if (v) setReadOnly(false);
            }}
          />
        </Toolbar>
      }
    >
      <NumberScrubber
        value={48}
        onChange={() => {}}
        min={0}
        max={200}
        scrubberIcon={scrubberIcon}
        readOnly={readOnly}
        disabled={disabled}
        displayValue={(v) => `${v}px`}
        className="w-32"
      />
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<NumberScrubberSize>('md');
  const [color, setColor] = useState<Color>('brand');
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  const [outline, setOutline] = useState(true);
  const [rounded, setRounded] = useState(false);
  const [scrubberIcon, setScrubberIcon] = useState(true);
  const [value, setValue] = useState(32);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, color, variant, outline, rounded, scrubberIcon }}
      previewSurface
      controls={
        <>
          <Toolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={SCRUBBER_SIZES}
            />
          </Toolbar>
          <Toolbar>
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
              label="scrubberIcon"
              checked={scrubberIcon}
              onChange={setScrubberIcon}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlVariant value={variant} onChange={setVariant} />
          </Toolbar>
          <Toolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </Toolbar>
        </>
      }
    >
      <NumberScrubber
        size={size}
        color={color}
        variant={variant}
        outline={outline}
        rounded={rounded}
        scrubberIcon={scrubberIcon}
        value={value}
        onChange={setValue}
        min={0}
        max={200}
        displayValue={(v) => `${v}px`}
        className="w-32"
      />
    </Example>
  );
}

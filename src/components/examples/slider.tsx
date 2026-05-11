import {
  SectionTitle,
  Slider,
  type Color,
  type SliderSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/slider';

import { Example } from '../Example';

const SLIDER_SIZES: readonly SliderSize[] = ['sm', 'md'];

export function OverviewExample() {
  const [volume, setVolume] = useState(64);
  const [bright, setBright] = useState(40);
  const [opacity, setOpacity] = useState(0.75);
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewSurface
      previewClassName="flex-col gap-8 content-center"
    >
      <Slider value={volume} onChange={setVolume} className="w-72" />
      <Slider
        value={bright}
        onChange={setBright}
        color="yellow"
        size="md"
        className="w-72"
      />
      <Slider
        value={opacity}
        onChange={setOpacity}
        min={0}
        max={1}
        step={0.01}
        color="purple"
        className="w-72"
      />
    </Example>
  );
}

export function SizeExample() {
  const [a, setA] = useState(35);
  const [b, setB] = useState(70);
  const [size, setSize] = useState<SliderSize>('md');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      previewSurface
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={SLIDER_SIZES}
          />
        </ExampleToolbar>
      }
      previewClassName="flex-col gap-8 content-center"
    >
      <Slider size={size} value={a} onChange={setA} className="w-72" />
      <Slider size={size} value={b} onChange={setB} className="w-72" />
    </Example>
  );
}

export function ColorExample() {
  const [value, setValue] = useState(60);
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      previewSurface
      state={{ color }}
      controls={
        <ExampleToolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </ExampleToolbar>
      }
      previewClassName="content-center"
    >
      <Slider
        color={color}
        value={value}
        onChange={setValue}
        className="w-72"
      />
    </Example>
  );
}

export function MinMaxStepExample() {
  const [pct, setPct] = useState(40);
  const [opacity, setOpacity] = useState(0.6);
  const [zoom, setZoom] = useState(125);
  return (
    <Example
      source={EXAMPLE_SOURCE.MinMaxStepExample}
      previewSurface
      previewClassName="flex-col gap-8 content-center"
    >
      <Slider value={pct} onChange={setPct} step={5} className="w-72" />
      <Slider
        value={opacity}
        onChange={setOpacity}
        min={0}
        max={1}
        step={0.01}
        color="purple"
        className="w-72"
      />
      <Slider
        value={zoom}
        onChange={setZoom}
        min={25}
        max={400}
        step={25}
        color="cyan"
        className="w-72"
      />
    </Example>
  );
}

export function ValueDisplayExample() {
  const [volume, setVolume] = useState(48);
  const [opacity, setOpacity] = useState(0.7);
  return (
    <Example
      source={EXAMPLE_SOURCE.ValueDisplayExample}
      previewSurface
      previewClassName="content-center"
    >
      <div className="flex w-72 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <SectionTitle>Volume</SectionTitle>
            <span className="text-cladd-fg-soft tabular-nums">{volume}</span>
          </div>
          <Slider value={volume} onChange={setVolume} color="brand" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <SectionTitle>Opacity</SectionTitle>
            <span className="text-cladd-fg-soft tabular-nums">
              {Math.round(opacity * 100)}%
            </span>
          </div>
          <Slider
            value={opacity}
            onChange={setOpacity}
            min={0}
            max={1}
            step={0.01}
            color="purple"
          />
        </div>
      </div>
    </Example>
  );
}

export function DebounceExample() {
  const [immediate, setImmediate] = useState(40);
  const [debounced, setDebounced] = useState(60);
  return (
    <Example
      source={EXAMPLE_SOURCE.DebounceExample}
      previewSurface
      previewClassName="content-center"
    >
      <div className="flex w-72 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <SectionTitle>Immediate</SectionTitle>
            <span className="text-cladd-fg-soft tabular-nums">{immediate}</span>
          </div>
          <Slider value={immediate} onChange={setImmediate} color="brand" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <SectionTitle>Debounced 400ms</SectionTitle>
            <span className="text-cladd-fg-soft tabular-nums">{debounced}</span>
          </div>
          <Slider
            defaultValue={debounced}
            onChange={setDebounced}
            debounce={400}
            color="orange"
          />
        </div>
      </div>
    </Example>
  );
}

export function StatesExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.StatesExample}
      previewSurface
      previewClassName="flex-col gap-8 content-center"
    >
      <div className="flex w-72 flex-col gap-2">
        <SectionTitle>Disabled</SectionTitle>
        <Slider defaultValue={30} disabled />
      </div>
      <div className="flex w-72 flex-col gap-2">
        <SectionTitle>Read-only</SectionTitle>
        <Slider defaultValue={70} readOnly color="red" />
      </div>
    </Example>
  );
}

export function InspectorExample() {
  const [fontSize, setFontSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [letter, setLetter] = useState(0);
  return (
    <Example
      source={EXAMPLE_SOURCE.InspectorExample}
      previewSurface
      previewClassName="content-center"
    >
      <div className="flex w-72 flex-col gap-2">
        <SectionTitle>Typography</SectionTitle>
        <div className="grid grid-cols-[6rem_1fr_3rem] items-center gap-2">
          <span className="text-cladd-fg-soft">Size</span>
          <Slider
            value={fontSize}
            onChange={setFontSize}
            min={8}
            max={64}
            color="brand"
          />
          <span className="text-right text-cladd-fg-soft tabular-nums">
            {fontSize}px
          </span>
          <span className="text-cladd-fg-soft">Line height</span>
          <Slider
            value={lineHeight}
            onChange={setLineHeight}
            min={1}
            max={2}
            step={0.05}
            color="brand"
          />
          <span className="text-right text-cladd-fg-soft tabular-nums">
            {lineHeight.toFixed(2)}
          </span>
          <span className="text-cladd-fg-soft">Letter spacing</span>
          <Slider
            value={letter}
            onChange={setLetter}
            min={-2}
            max={8}
            step={0.1}
            color="brand"
          />
          <span className="text-right text-cladd-fg-soft tabular-nums">
            {letter.toFixed(1)}
          </span>
        </div>
      </div>
    </Example>
  );
}

export function PlaygroundExample() {
  const [value, setValue] = useState(50);
  const [size, setSize] = useState<SliderSize>('md');
  const [color, setColor] = useState<Color>('brand');
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      previewSurface
      state={{ size, color, disabled, readOnly }}
      previewClassName="content-center"
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={SLIDER_SIZES}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="disabled"
              checked={disabled}
              onChange={(v) => {
                setDisabled(v);
                if (v) setReadOnly(false);
              }}
            />
            <ExampleControlSwitch
              label="readOnly"
              checked={readOnly}
              onChange={(v) => {
                setReadOnly(v);
                if (v) setDisabled(false);
              }}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      <Slider
        value={value}
        onChange={setValue}
        size={size}
        color={color}
        disabled={disabled}
        readOnly={readOnly}
        className="w-72"
      />
    </Example>
  );
}

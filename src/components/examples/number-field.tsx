import {
  NumberField,
  Toolbar,
  type Color,
  type NumberFieldSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleControlVariant,
  type SurfaceVariant,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/number-field';

import { Example } from '../Example';

const NUMBER_FIELD_SIZES: readonly NumberFieldSize[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

export function OverviewExample() {
  const [qty, setQty] = useState(2);
  const [tip, setTip] = useState(15);
  const [zoom, setZoom] = useState(100);
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="flex-col gap-4"
    >
      <NumberField value={qty} onChange={setQty} min={1} max={99} />
      <NumberField
        value={tip}
        onChange={setTip}
        min={0}
        max={100}
        step={5}
        color="brand"
        size="lg"
      />
      <NumberField
        value={zoom}
        onChange={setZoom}
        input={false}
        min={25}
        max={400}
        step={25}
        rounded={false}
      />
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<NumberFieldSize>('md');
  const [value, setValue] = useState(3);
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      controls={
        <Toolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={NUMBER_FIELD_SIZES}
          />
        </Toolbar>
      }
    >
      <NumberField size={size} value={value} onChange={setValue} />
    </Example>
  );
}

export function VariantExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  const [value, setValue] = useState(4);
  return (
    <Example
      source={EXAMPLE_SOURCE.VariantExample}
      state={{ variant }}
      controls={
        <Toolbar>
          <ExampleControlVariant value={variant} onChange={setVariant} />
        </Toolbar>
      }
    >
      <NumberField variant={variant} value={value} onChange={setValue} />
    </Example>
  );
}

export function ButtonVariantExample() {
  const [buttonVariant, setButtonVariant] =
    useState<SurfaceVariant>('gradient-fill');
  const [buttonOutline, setButtonOutline] = useState(false);
  const [value, setValue] = useState(7);
  return (
    <Example
      source={EXAMPLE_SOURCE.ButtonVariantExample}
      state={{ buttonVariant, buttonOutline }}
      controls={
        <>
          <Toolbar>
            <ExampleControlVariant
              value={buttonVariant}
              onChange={setButtonVariant}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="buttonOutline"
              checked={buttonOutline}
              onChange={setButtonOutline}
            />
          </Toolbar>
        </>
      }
    >
      <NumberField
        value={value}
        onChange={setValue}
        buttonVariant={buttonVariant}
        buttonOutline={buttonOutline}
      />
    </Example>
  );
}

export function InputModeExample() {
  const [editable, setEditable] = useState(4);
  const [chip, setChip] = useState(150);
  return (
    <Example
      source={EXAMPLE_SOURCE.InputModeExample}
      previewClassName="flex-col gap-4"
    >
      <NumberField value={editable} onChange={setEditable} />
      <NumberField value={chip} onChange={setChip} input={false} step={25} />
    </Example>
  );
}

export function MinMaxStepExample() {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(20);
  return (
    <Example
      source={EXAMPLE_SOURCE.MinMaxStepExample}
      previewClassName="flex-col gap-4"
    >
      <NumberField value={qty} onChange={setQty} min={1} max={5} />
      <NumberField
        value={price}
        onChange={setPrice}
        min={0}
        max={100}
        step={10}
        color="green"
      />
    </Example>
  );
}

export function RoundedExample() {
  const [rounded, setRounded] = useState(true);
  const [valueRounded, setValueRounded] = useState(false);
  const [value, setValue] = useState(8);
  return (
    <Example
      source={EXAMPLE_SOURCE.RoundedExample}
      state={{ rounded, valueRounded }}
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="rounded"
            checked={rounded}
            onChange={setRounded}
          />
          <ExampleControlSwitch
            label="valueRounded"
            checked={valueRounded}
            onChange={setValueRounded}
          />
        </Toolbar>
      }
    >
      <NumberField
        rounded={rounded}
        valueRounded={valueRounded}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
}

export function StatesExample() {
  const [readOnly, setReadOnly] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(3);
  return (
    <Example
      source={EXAMPLE_SOURCE.StatesExample}
      state={{ readOnly, disabled }}
      controls={
        <Toolbar>
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
      <NumberField
        value={value}
        onChange={setValue}
        readOnly={readOnly}
        disabled={disabled}
      />
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<NumberFieldSize>('md');
  const [color, setColor] = useState<Color>('brand');
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  const [rounded, setRounded] = useState(true);
  const [input, setInput] = useState(true);
  const [value, setValue] = useState(5);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, color, variant, rounded, input }}
      previewSurface
      controls={
        <>
          <Toolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={NUMBER_FIELD_SIZES}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlVariant value={variant} onChange={setVariant} />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="rounded"
              checked={rounded}
              onChange={setRounded}
            />
            <ExampleControlSwitch
              label="input"
              checked={input}
              onChange={setInput}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </Toolbar>
        </>
      }
    >
      <NumberField
        size={size}
        color={color}
        variant={variant}
        rounded={rounded}
        input={input}
        value={value}
        onChange={setValue}
        min={0}
        max={100}
      />
    </Example>
  );
}

import { type ButtonSize, type Color } from '@cladd-ui/react';
import { DatePicker, type DateRange } from '@cladd-ui/react/calendar';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/date-picker';

import { Example } from '../Example';

const DATE_PICKER_SIZES: readonly ButtonSize[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

export function OverviewExample() {
  const [value, setValue] = useState<Date | undefined>();
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample} previewSurface>
      <DatePicker value={value} onChange={setValue} outline className="w-56" />
    </Example>
  );
}

export function SizeExample() {
  const [value, setValue] = useState<Date | undefined>();
  const [size, setSize] = useState<ButtonSize>('md');
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
            sizes={DATE_PICKER_SIZES}
          />
        </ExampleToolbar>
      }
    >
      <DatePicker
        value={value}
        onChange={setValue}
        size={size}
        outline
        className="w-56"
      />
    </Example>
  );
}

export function ColorExample() {
  const [value, setValue] = useState<Date | undefined>(new Date());
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
    >
      <DatePicker
        value={value}
        onChange={setValue}
        color={color}
        className="w-56"
      />
    </Example>
  );
}

export function RangeExample() {
  const [value, setValue] = useState<DateRange | undefined>();
  return (
    <Example source={EXAMPLE_SOURCE.RangeExample} previewSurface>
      <DatePicker
        mode="range"
        value={value}
        onChange={setValue}
        placeholder="Select range"
        calendarProps={{ numberOfMonths: 2 }}
        outline
        className="w-64"
      />
    </Example>
  );
}

export function MultipleExample() {
  const [value, setValue] = useState<Date[]>([]);
  return (
    <Example source={EXAMPLE_SOURCE.MultipleExample} previewSurface>
      <DatePicker
        mode="multiple"
        value={value}
        onChange={setValue}
        placeholder="Select dates"
        outline
        className="w-72"
      />
    </Example>
  );
}

export function FormatExample() {
  const [value, setValue] = useState<Date | undefined>(new Date());
  return (
    <Example source={EXAMPLE_SOURCE.FormatExample} previewSurface>
      <DatePicker
        value={value}
        onChange={setValue}
        format={(date) =>
          new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)
        }
        outline
        className="w-64"
      />
    </Example>
  );
}

export function RoundedExample() {
  const [value, setValue] = useState<Date | undefined>();
  return (
    <Example source={EXAMPLE_SOURCE.RoundedExample} previewSurface>
      <DatePicker
        value={value}
        onChange={setValue}
        rounded
        outline
        className="w-56"
      />
    </Example>
  );
}

export function PlaygroundExample() {
  const [value, setValue] = useState<Date | undefined>();
  const [size, setSize] = useState<ButtonSize>('md');
  const [color, setColor] = useState<Color>('brand');
  const [rounded, setRounded] = useState(false);
  const [outline, setOutline] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      previewSurface
      state={{ size, color, rounded, outline }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={DATE_PICKER_SIZES}
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
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      <DatePicker
        value={value}
        onChange={setValue}
        size={size}
        color={color}
        rounded={rounded}
        outline={outline}
        className="w-56"
      />
    </Example>
  );
}

import {
  Chip,
  SectionTitle,
  Segmented,
  SegmentedButton,
  type Color,
} from '@cladd-ui/react';
import {
  Calendar,
  type CalendarSize,
  type DateRange,
} from '@cladd-ui/react/calendar';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/calendar';

import { Example } from '../Example';

const CALENDAR_SIZES: readonly CalendarSize[] = ['sm', 'md', 'lg', 'xl', '2xl'];

const MODES = ['single', 'multiple', 'range'] as const;
type Mode = (typeof MODES)[number];

export function OverviewExample() {
  const [selected, setSelected] = useState<Date | undefined>(() => new Date());
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample} previewSurface>
      <Calendar mode="single" selected={selected} onSelect={setSelected} />
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<CalendarSize>('md');
  const [selected, setSelected] = useState<Date | undefined>(() => new Date());
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      previewSurface
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={CALENDAR_SIZES}
          />
        </ExampleToolbar>
      }
    >
      <Calendar
        size={size}
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    </Example>
  );
}

export function ColorExample() {
  const [color, setColor] = useState<Color>('purple');
  const [selected, setSelected] = useState<Date | undefined>(() => new Date());
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      state={{ color }}
      previewSurface
      controls={
        <ExampleToolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </ExampleToolbar>
      }
    >
      <Calendar
        color={color}
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    </Example>
  );
}

export function RangeExample() {
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + 6);
    return { from, to };
  });
  return (
    <Example source={EXAMPLE_SOURCE.RangeExample} previewSurface>
      <Calendar
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
      />
    </Example>
  );
}

export function MultipleExample() {
  const [days, setDays] = useState<Date[] | undefined>(() => [new Date()]);
  return (
    <Example source={EXAMPLE_SOURCE.MultipleExample} previewSurface>
      <Calendar mode="multiple" selected={days} onSelect={setDays} />
    </Example>
  );
}

export function DropdownExample() {
  const [selected, setSelected] = useState<Date | undefined>(() => new Date());
  return (
    <Example source={EXAMPLE_SOURCE.DropdownExample} previewSurface>
      <Calendar
        mode="single"
        captionLayout="dropdown"
        selected={selected}
        onSelect={setSelected}
      />
    </Example>
  );
}

export function HeaderFooterExample() {
  const [selected, setSelected] = useState<Date | undefined>(() => new Date());
  return (
    <Example source={EXAMPLE_SOURCE.HeaderFooterExample} previewSurface>
      <Calendar
        mode="single"
        color="brand"
        selected={selected}
        onSelect={setSelected}
        header={<SectionTitle>Pick a date</SectionTitle>}
        footer={
          selected ? (
            <Chip color="brand">
              {selected.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Chip>
          ) : (
            <span className="text-cladd-fg-softer">No date selected</span>
          )
        }
      />
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<CalendarSize>('md');
  const [color, setColor] = useState<Color>('brand');
  const [mode, setMode] = useState<Mode>('single');
  const [single, setSingle] = useState<Date | undefined>(() => new Date());
  const [days, setDays] = useState<Date[] | undefined>(() => [new Date()]);
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + 6);
    return { from, to };
  });
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, color }}
      previewSurface
      controls={
        <>
          <ExampleToolbar>
            <Segmented>
              {MODES.map((m) => (
                <SegmentedButton
                  key={m}
                  active={m === mode}
                  onClick={() => setMode(m)}
                >
                  {m}
                </SegmentedButton>
              ))}
            </Segmented>
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={CALENDAR_SIZES}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      {mode === 'range' ? (
        <Calendar
          size={size}
          color={color}
          mode="range"
          numberOfMonths={2}
          selected={range}
          onSelect={setRange}
        />
      ) : mode === 'multiple' ? (
        <Calendar
          size={size}
          color={color}
          mode="multiple"
          selected={days}
          onSelect={setDays}
        />
      ) : (
        <Calendar
          size={size}
          color={color}
          mode="single"
          selected={single}
          onSelect={setSingle}
        />
      )}
    </Example>
  );
}

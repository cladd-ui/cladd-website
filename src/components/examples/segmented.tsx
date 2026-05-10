import {
  Segmented,
  SegmentedButton,
  Surface,
  Toolbar,
  type ButtonSize,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleControlVariant,
  type SurfaceVariant,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/segmented';

import { Example } from '../Example';

const VIEWS = ['List', 'Grid', 'Calendar'] as const;
type View = (typeof VIEWS)[number];

const DENSITIES = ['Compact', 'Cozy', 'Comfortable'] as const;
type Density = (typeof DENSITIES)[number];

export function OverviewExample() {
  const [view, setView] = useState<View>('Grid');
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <Toolbar>
        <Segmented>
          {VIEWS.map((v) => (
            <SegmentedButton
              key={v}
              active={v === view}
              onClick={() => setView(v)}
            >
              {v}
            </SegmentedButton>
          ))}
        </Segmented>
      </Toolbar>
    </Example>
  );
}

export function ContainerExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.ContainerExample}
      previewClassName="flex-col gap-8"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-cladd-fg-softer">bare</span>
        <Segmented>
          <SegmentedButton active>List</SegmentedButton>
          <SegmentedButton>Grid</SegmentedButton>
          <SegmentedButton>Calendar</SegmentedButton>
        </Segmented>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-cladd-fg-softer">
          inside &lt;Toolbar&gt;
        </span>
        <Toolbar>
          <Segmented>
            <SegmentedButton active>List</SegmentedButton>
            <SegmentedButton>Grid</SegmentedButton>
            <SegmentedButton>Calendar</SegmentedButton>
          </Segmented>
        </Toolbar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-cladd-fg-softer">
          inside &lt;Surface&gt;
        </span>
        <Surface outline className="rounded-full" contentClassName="p-1">
          <Segmented>
            <SegmentedButton active>List</SegmentedButton>
            <SegmentedButton>Grid</SegmentedButton>
            <SegmentedButton>Calendar</SegmentedButton>
          </Segmented>
        </Surface>
      </div>
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [view, setView] = useState<View>('Grid');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      controls={
        <Toolbar>
          <ExampleControlSize value={size} onChange={setSize} />
        </Toolbar>
      }
    >
      <Toolbar>
        <Segmented size={size}>
          {VIEWS.map((v) => (
            <SegmentedButton
              key={v}
              active={v === view}
              onClick={() => setView(v)}
            >
              {v}
            </SegmentedButton>
          ))}
        </Segmented>
      </Toolbar>
    </Example>
  );
}

export function ActiveStyleExample() {
  const [activeVariant, setActiveVariant] =
    useState<SurfaceVariant>('gradient');
  const [activeColor, setActiveColor] = useState<Color>('brand');
  const [view, setView] = useState<View>('Grid');
  return (
    <Example
      source={EXAMPLE_SOURCE.ActiveStyleExample}
      state={{ activeVariant, activeColor }}
      controls={
        <>
          <Toolbar>
            <ExampleControlVariant
              value={activeVariant}
              onChange={setActiveVariant}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlColor
              value={activeColor}
              onChange={setActiveColor}
            />
          </Toolbar>
        </>
      }
    >
      <Toolbar>
        <Segmented activeVariant={activeVariant} activeColor={activeColor}>
          {VIEWS.map((v) => (
            <SegmentedButton
              key={v}
              active={v === view}
              onClick={() => setView(v)}
            >
              {v}
            </SegmentedButton>
          ))}
        </Segmented>
      </Toolbar>
    </Example>
  );
}

export function InactiveStyleExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('transparent');
  const [color, setColor] = useState<Color>('neutral');
  const [outline, setOutline] = useState(false);
  const [density, setDensity] = useState<Density>('Cozy');
  return (
    <Example
      source={EXAMPLE_SOURCE.InactiveStyleExample}
      state={{ variant, color, outline }}
      controls={
        <>
          <Toolbar>
            <ExampleControlVariant value={variant} onChange={setVariant} />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="outline"
              checked={outline}
              onChange={setOutline}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </Toolbar>
        </>
      }
    >
      <Toolbar>
        <Segmented variant={variant} color={color} outline={outline}>
          {DENSITIES.map((d) => (
            <SegmentedButton
              key={d}
              active={d === density}
              onClick={() => setDensity(d)}
            >
              {d}
            </SegmentedButton>
          ))}
        </Segmented>
      </Toolbar>
    </Example>
  );
}

export function RoundedExample() {
  const [rounded, setRounded] = useState(true);
  const [view, setView] = useState<View>('Grid');
  return (
    <Example
      source={EXAMPLE_SOURCE.RoundedExample}
      state={{ rounded }}
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="rounded"
            checked={rounded}
            onChange={setRounded}
          />
        </Toolbar>
      }
    >
      <Toolbar rounded={rounded}>
        <Segmented rounded={rounded}>
          {VIEWS.map((v) => (
            <SegmentedButton
              key={v}
              active={v === view}
              onClick={() => setView(v)}
            >
              {v}
            </SegmentedButton>
          ))}
        </Segmented>
      </Toolbar>
    </Example>
  );
}

export function DisabledExample() {
  const [disabled, setDisabled] = useState(true);
  const [view, setView] = useState<View>('Grid');
  return (
    <Example
      source={EXAMPLE_SOURCE.DisabledExample}
      state={{ disabled }}
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="disabled"
            checked={disabled}
            onChange={setDisabled}
          />
        </Toolbar>
      }
    >
      <Toolbar>
        <Segmented disabled={disabled}>
          {VIEWS.map((v) => (
            <SegmentedButton
              key={v}
              active={v === view}
              onClick={() => setView(v)}
            >
              {v}
            </SegmentedButton>
          ))}
        </Segmented>
      </Toolbar>
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [activeVariant, setActiveVariant] =
    useState<SurfaceVariant>('gradient');
  const [activeColor, setActiveColor] = useState<Color>('brand');
  const [variant, setVariant] = useState<SurfaceVariant>('transparent');
  const [color, setColor] = useState<Color>('neutral');
  const [rounded, setRounded] = useState(true);
  const [view, setView] = useState<View>('Grid');
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{
        size,
        activeVariant,
        activeColor,
        variant,
        color,
        rounded,
      }}
      controls={
        <>
          <Toolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="rounded"
              checked={rounded}
              onChange={setRounded}
            />
          </Toolbar>
          <div className="flex flex-wrap justify-center gap-2">
            <Surface
              className="w-fit rounded-2xl"
              contentClassName="flex flex-col items-center justify-center gap-1 p-2"
              outline
            >
              <span className="font-mono text-xs text-cladd-fg-soft">
                active
              </span>
              <Toolbar>
                <ExampleControlVariant
                  value={activeVariant}
                  onChange={setActiveVariant}
                />
              </Toolbar>
              <Toolbar>
                <ExampleControlColor
                  value={activeColor}
                  onChange={setActiveColor}
                />
              </Toolbar>
            </Surface>
            <Surface
              className="w-fit rounded-2xl"
              contentClassName="flex flex-col items-center justify-center gap-1 p-2"
              outline
            >
              <span className="font-mono text-xs text-cladd-fg-soft">
                inactive
              </span>
              <Toolbar>
                <ExampleControlVariant value={variant} onChange={setVariant} />
              </Toolbar>
              <Toolbar>
                <ExampleControlColor value={color} onChange={setColor} />
              </Toolbar>
            </Surface>
          </div>
        </>
      }
    >
      <Toolbar rounded={rounded}>
        <Segmented
          size={size}
          activeVariant={activeVariant}
          activeColor={activeColor}
          variant={variant}
          color={color}
          rounded={rounded}
        >
          {VIEWS.map((v) => (
            <SegmentedButton
              key={v}
              active={v === view}
              onClick={() => setView(v)}
            >
              {v}
            </SegmentedButton>
          ))}
        </Segmented>
      </Toolbar>
    </Example>
  );
}

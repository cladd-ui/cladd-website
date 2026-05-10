import {
  Button,
  Spinner,
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
import { PlusIcon } from '@/components/icons/PlusIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/button';

import { Example } from '../Example';
import { CheckIcon } from '../icons/CheckIcon';

export function OverviewExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Button color="brand">Save changes</Button>
      <Button>Cancel</Button>
      <Button variant="solid" color="red">
        Delete
      </Button>
      <Button variant="transparent" outline={false}>
        Ghost
      </Button>
      <Button rounded color="green" size="sm">
        <PlusIcon />
        Add
      </Button>
      <Button color="orange" size="sm" outline={false}>
        Done
        <CheckIcon />
      </Button>
      <Button rounded color="brand" size="sm">
        <PlusIcon />
      </Button>
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
        <Toolbar>
          <ExampleControlSize value={size} onChange={setSize} />
        </Toolbar>
      }
    >
      <Button size={size} color="brand">
        Save changes
      </Button>
    </Example>
  );
}

export function WithSpinnerExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [loading, setLoading] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.WithSpinnerExample}
      state={{ size, loading }}
      controls={
        <>
          <Toolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="loading"
              checked={loading}
              onChange={setLoading}
            />
          </Toolbar>
        </>
      }
    >
      <Button size={size} color="brand" readOnly={loading}>
        {loading ? <Spinner size={size} /> : null}
        {loading ? 'Saving' : 'Save changes'}
      </Button>
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
        <Toolbar>
          <ExampleControlVariant value={variant} onChange={setVariant} />
        </Toolbar>
      }
    >
      <Button variant={variant} color="brand" className="w-32">
        {variant}
      </Button>
    </Example>
  );
}

export function ColorExample() {
  const [color, setColor] = useState<Color>('brand');
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      state={{ color, variant }}
      controls={
        <>
          <Toolbar>
            <ExampleControlVariant value={variant} onChange={setVariant} />
          </Toolbar>
          <Toolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </Toolbar>
        </>
      }
    >
      <Button variant={variant} color={color} className="w-32">
        {color}
      </Button>
    </Example>
  );
}

export function MultilineExample() {
  const [multiline, setMultiline] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.MultilineExample}
      state={{ multiline }}
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="multiline"
            checked={multiline}
            onChange={setMultiline}
          />
        </Toolbar>
      }
    >
      <Button multiline={multiline} color="brand" className="max-w-64">
        Approve and merge this very long pending change request
      </Button>
    </Example>
  );
}

export function RoundedExample() {
  const [rounded, setRounded] = useState(true);
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
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button rounded={rounded} color="brand">
          Save changes
        </Button>
        <Button rounded={rounded} variant="solid">
          Edit
        </Button>
        <Button rounded={rounded} variant="transparent" outline={false}>
          Ghost
        </Button>
      </div>
    </Example>
  );
}

export function DisabledExample() {
  const [disabled, setDisabled] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <Example
      source={EXAMPLE_SOURCE.DisabledExample}
      state={{ disabled }}
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="disabled"
            checked={disabled}
            onChange={(v) => {
              setDisabled(v);
              setCount(0);
            }}
          />
        </Toolbar>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <Button
          disabled={disabled}
          color="brand"
          onClick={() => setCount((c) => c + 1)}
        >
          Save changes
        </Button>
        <span className="font-mono text-cladd-fg-softer">clicks: {count}</span>
      </div>
    </Example>
  );
}

export function ReadOnlyExample() {
  const [readOnly, setReadOnly] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <Example
      source={EXAMPLE_SOURCE.ReadOnlyExample}
      state={{ readOnly }}
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="readOnly"
            checked={readOnly}
            onChange={(v) => {
              setReadOnly(v);
              setCount(0);
            }}
          />
        </Toolbar>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <Button
          readOnly={readOnly}
          color="brand"
          onClick={() => setCount((c) => c + 1)}
        >
          Save changes
        </Button>
        <span className="font-mono text-cladd-fg-softer">clicks: {count}</span>
      </div>
    </Example>
  );
}

export function PlaygroundExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  const [color, setColor] = useState<Color>('brand');
  const [size, setSize] = useState<ButtonSize>('md');
  const [outline, setOutline] = useState(true);
  const [rounded, setRounded] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ variant, color, size, outline, rounded }}
      controls={
        <>
          <Toolbar>
            <ExampleControlVariant value={variant} onChange={setVariant} />
          </Toolbar>
          <Toolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="outline"
              checked={outline}
              onChange={setOutline}
            />
            <ExampleControlSwitch
              label="rounded"
              checked={rounded}
              onChange={setRounded}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </Toolbar>
        </>
      }
    >
      <Button
        variant={variant}
        color={color}
        size={size}
        outline={outline}
        rounded={rounded}
      >
        Save changes
      </Button>
    </Example>
  );
}

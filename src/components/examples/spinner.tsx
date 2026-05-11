import {
  Button,
  Chip,
  Input,
  Segmented,
  SegmentedButton,
  Spinner,
  Surface,
  Toast,
  ToastRoot,
  ToastTrigger,
  useToast,
  type Color,
  type InputSize,
  type SpinnerSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/spinner';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="gap-8 flex-wrap content-center"
    >
      <Spinner size="2xs" />
      <Spinner size="xs" color="brand" />
      <Spinner size="sm" color="green" />
      <Spinner size="md" color="red" />
      <Spinner size="lg" color="purple" />
      <Spinner size="xl" color="cyan" />
      <Spinner size="2xl" color="yellow" />
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<SpinnerSize>('lg');
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
      <Spinner size={size} color="brand" />
    </Example>
  );
}

export function ColorExample() {
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      state={{ color }}
      controls={
        <ExampleToolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </ExampleToolbar>
      }
    >
      <Spinner size="xl" color={color} />
    </Example>
  );
}

export function InsideButtonExample() {
  const [size, setSize] = useState<SpinnerSize>('md');
  const [loading, setLoading] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.InsideButtonExample}
      state={{ size, loading }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="loading"
              checked={loading}
              onChange={setLoading}
            />
          </ExampleToolbar>
        </>
      }
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Button size={size} color="brand" readOnly={loading}>
        {loading ? <Spinner size={size} /> : null}
        {loading ? 'Saving' : 'Save changes'}
      </Button>
      <Button size={size} variant="solid" readOnly={loading}>
        {loading ? 'Loading' : 'Refresh'}
        {loading ? <Spinner size={size} /> : null}
      </Button>
    </Example>
  );
}

const SMALLER_SIZE: Record<SpinnerSize, SpinnerSize> = {
  '2xs': '2xs',
  xs: '2xs',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
  '2xl': 'xl',
};

export function InsideChipExample() {
  const [size, setSize] = useState<SpinnerSize>('md');
  const spinnerSize = SMALLER_SIZE[size];
  return (
    <Example
      source={EXAMPLE_SOURCE.InsideChipExample}
      state={{ size, spinnerSize }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize value={size} onChange={setSize} />
        </ExampleToolbar>
      }
      previewClassName="gap-2 flex-wrap content-center"
    >
      <Chip
        size={size}
        color="brand"
        outline
        icon={Spinner}
        iconProps={{ size: spinnerSize, color: 'brand' }}
      >
        Deploying
      </Chip>
      <Chip
        size={size}
        color="yellow"
        outline
        icon={Spinner}
        iconProps={{ size: spinnerSize, color: 'yellow' }}
      >
        Indexing
      </Chip>
    </Example>
  );
}

const INPUT_SIZES: InputSize[] = ['sm', 'md', 'lg', 'xl', '2xl'];

export function InsideInputExample() {
  const [size, setSize] = useState<InputSize>('md');
  const [value, setValue] = useState('cladd');
  const [checking, setChecking] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.InsideInputExample}
      state={{ size, checking }}
      controls={
        <>
          <ExampleToolbar>
            <Segmented>
              {INPUT_SIZES.map((s) => (
                <SegmentedButton
                  key={s}
                  active={size === s}
                  onClick={() => setSize(s)}
                >
                  {s}
                </SegmentedButton>
              ))}
            </Segmented>
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="checking"
              checked={checking}
              onChange={setChecking}
            />
          </ExampleToolbar>
        </>
      }
    >
      <Input
        size={size}
        className="w-72"
        value={value}
        onChange={(next) => setValue(next)}
        placeholder="Pick a username"
        prefix={<span className="ml-2 text-cladd-fg-softer">@</span>}
        suffix={checking ? <Spinner size={size} className="mr-2" /> : null}
      />
    </Example>
  );
}

export function InsideToastExample() {
  const toast = useToast();
  return (
    <Example
      source={EXAMPLE_SOURCE.InsideToastExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <ToastRoot>
        <ToastTrigger>
          <Button>Upload file</Button>
        </ToastTrigger>
        <Toast
          icon={Spinner}
          iconProps={{ color: 'brand' }}
          title="Uploading hero.png"
          text="This shouldn’t take long."
          timeout={0}
        />
      </ToastRoot>
      <Button
        color="brand"
        variant="gradient"
        onClick={() =>
          toast({
            icon: Spinner,
            iconProps: { color: 'brand' },
            title: 'Syncing workspace',
            text: 'Pulling the latest from origin/main.',
            timeout: 0,
          })
        }
      >
        Sync (useToast)
      </Button>
    </Example>
  );
}

export function InsideSurfaceExample() {
  return (
    <Example source={EXAMPLE_SOURCE.InsideSurfaceExample}>
      <Surface
        outline
        className="w-72 rounded-2xl"
        contentClassName="flex flex-col items-center justify-center gap-4 p-8"
      >
        <Spinner size="xl" color="brand" />
        <span className="text-cladd-fg-soft">Fetching data…</span>
      </Surface>
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<SpinnerSize>('xl');
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, color }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      <Spinner size={size} color={color} />
    </Example>
  );
}

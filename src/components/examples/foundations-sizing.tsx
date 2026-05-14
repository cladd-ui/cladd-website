import {
  Button,
  Checkbox,
  Chip,
  Input,
  Radio,
  Shortcut,
  Slider,
  Spinner,
  Switch,
  type ButtonSize,
} from '@cladd-ui/react';

import { EXAMPLE_SOURCE } from '@/generated/example-source/foundations-sizing';

import { Example } from '../Example';

const ALL_SIZES: ButtonSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export function SizeScaleStripExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeScaleStripExample}
      previewClassName="flex-wrap items-end justify-center gap-2 content-center"
    >
      {ALL_SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Button size={size} className="w-12">
            {size}
          </Button>
          <span className="font-mono text-xs text-cladd-fg-soft">{size}</span>
        </div>
      ))}
    </Example>
  );
}

export function RootVsNestedExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.RootVsNestedExample}
      previewClassName="flex-col items-stretch gap-4 content-center"
    >
      {(['sm', 'md', 'lg', 'xl'] as ButtonSize[]).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-12 font-mono text-xs text-cladd-fg-soft">
            {size}
          </span>
          <Button size={size}>Button</Button>
          <Chip size={size}>Chip</Chip>
          <Shortcut size={size}>cmd K</Shortcut>
          <Spinner size={size} />
        </div>
      ))}
    </Example>
  );
}

export function NestedInsideButtonExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.NestedInsideButtonExample}
      previewClassName="flex-col items-stretch gap-3 content-center"
    >
      <div className="flex items-center gap-3">
        <span className="w-12 font-mono text-xs text-cladd-fg-soft">md</span>
        <Button size="md">
          Save
          <Chip size="md" color="green">
            12
          </Chip>
          <Shortcut size="md">cmd S</Shortcut>
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12 font-mono text-xs text-cladd-fg-soft">lg</span>
        <Button size="lg">
          Save
          <Chip size="lg" color="green">
            12
          </Chip>
          <Shortcut size="lg">cmd S</Shortcut>
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12 font-mono text-xs text-cladd-fg-soft">xl</span>
        <Button size="xl">
          Save
          <Chip size="xl" color="green">
            12
          </Chip>
          <Shortcut size="xl">cmd S</Shortcut>
        </Button>
      </div>
    </Example>
  );
}

export function DenseRowExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.DenseRowExample}
      previewSurface
      previewClassName="items-center justify-center"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Button size="md">Save</Button>
        <Input size="md" placeholder="Title" className="w-40" />
        <Chip size="md" color="blue">
          Draft
        </Chip>
        <Shortcut size="md">cmd S</Shortcut>
        <Spinner size="md" />
      </div>
    </Example>
  );
}

export function InputDefaultExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.InputDefaultExample}
      previewSurface
      previewClassName="flex-col items-stretch gap-4 content-center"
    >
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-12 font-mono text-xs text-cladd-fg-soft">
            {size}
          </span>
          <Input size={size} placeholder={`Input size="${size}"`} />
        </div>
      ))}
    </Example>
  );
}

export function TwoSizePrimitivesExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.TwoSizePrimitivesExample}
      previewSurface
      previewClassName="flex-col items-stretch gap-4 content-center"
    >
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-6 font-mono text-xs text-cladd-fg-softer">
            {size}
          </span>
          <Checkbox size={size} defaultChecked />
          <Radio size={size} defaultChecked name={`docs-radio-${size}`} />
          <Switch size={size} defaultChecked />
          <Slider size={size} defaultValue={40} className="w-32" />
        </div>
      ))}
    </Example>
  );
}

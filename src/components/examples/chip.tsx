import {
  Button,
  Chip,
  Surface,
  type ButtonSize,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleControlVariant,
  ExampleToolbar,
  type SurfaceVariant,
} from '@/components/ExampleControls';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/chip';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="gap-2 flex-wrap content-center"
    >
      <Chip color="green">Active</Chip>
      <Chip color="yellow">Pending</Chip>
      <Chip color="red">Failed</Chip>
      <Chip icon={CheckIcon} color="green">
        Verified
      </Chip>
      <Chip color="brand" rounded>
        v1.2.3
      </Chip>
      <Chip as="button" size="lg" icon={PlusIcon}>
        Add tag
      </Chip>
      <Chip size="sm" color="red">
        12
      </Chip>
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
        <ExampleToolbar>
          <ExampleControlSize value={size} onChange={setSize} />
        </ExampleToolbar>
      }
    >
      <Chip size={size} color="brand" icon={CheckIcon}>
        Active
      </Chip>
    </Example>
  );
}

export function InsideButtonExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  return (
    <Example
      source={EXAMPLE_SOURCE.InsideButtonExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize value={size} onChange={setSize} />
        </ExampleToolbar>
      }
    >
      <Button size={size}>
        Deployments
        <Chip size={size} color="green">
          3 live
        </Chip>
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
        <ExampleToolbar>
          <ExampleControlVariant value={variant} onChange={setVariant} />
        </ExampleToolbar>
      }
    >
      <Chip variant={variant} color="brand">
        {variant}
      </Chip>
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
          <ExampleToolbar>
            <ExampleControlVariant value={variant} onChange={setVariant} />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      <Chip variant={variant} color={color}>
        {color}
      </Chip>
    </Example>
  );
}

export function OutlineExample() {
  const [outline, setOutline] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.OutlineExample}
      state={{ outline }}
      controls={
        <ExampleToolbar>
          <ExampleControlSwitch
            label="outline"
            checked={outline}
            onChange={setOutline}
          />
        </ExampleToolbar>
      }
      previewClassName="gap-2 flex-wrap content-center"
    >
      <Chip outline={outline}>Default</Chip>
      <Chip outline={outline} color="brand">
        Brand
      </Chip>
      <Chip outline={outline} color="green">
        Active
      </Chip>
      <Chip outline={outline} color="red">
        Error
      </Chip>
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
        <ExampleToolbar>
          <ExampleControlSwitch
            label="rounded"
            checked={rounded}
            onChange={setRounded}
          />
        </ExampleToolbar>
      }
      previewClassName="gap-2 flex-wrap content-center"
    >
      <Chip rounded={rounded} color="brand" outline>
        Brand
      </Chip>
      <Chip rounded={rounded} color="green" icon={CheckIcon}>
        Verified
      </Chip>
      <Chip rounded={rounded} size="lg" color="purple" outline>
        Premium
      </Chip>
    </Example>
  );
}

export function IconExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.IconExample}
      previewClassName="gap-2 flex-wrap content-center"
    >
      <Chip icon={CheckIcon} color="green">
        Verified
      </Chip>
      <Chip icon={PlusIcon} as="button" outline>
        New
      </Chip>
      <Chip icon={CheckIcon} color="brand" rounded outline>
        Subscribed
      </Chip>
      <Chip
        icon={PlusIcon}
        iconProps={{ className: 'rotate-45' }}
        color="red"
        outline
      >
        Remove
      </Chip>
    </Example>
  );
}

export function ClickableExample() {
  const TAGS = ['design', 'engineering', 'product', 'ops'];
  const [selected, setSelected] = useState<string[]>(['design', 'engineering']);
  const toggle = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  return (
    <Example
      source={EXAMPLE_SOURCE.ClickableExample}
      previewClassName="gap-2 flex-wrap content-center"
    >
      {TAGS.map((tag) => {
        const active = selected.includes(tag);
        return (
          <Chip
            key={tag}
            as="button"
            color={active ? 'brand' : 'neutral'}
            outline={!active}
            icon={active ? CheckIcon : undefined}
            onClick={() => toggle(tag)}
          >
            {tag}
          </Chip>
        );
      })}
    </Example>
  );
}

export function PolymorphicExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.PolymorphicExample}
      previewClassName="gap-2 flex-wrap content-center"
    >
      <Chip color="green" outline>
        span (default)
      </Chip>
      <Chip as="button" color="brand" outline>
        button
      </Chip>
      <Chip
        as="a"
        href="https://cladd.io/"
        target="_blank"
        rel="noreferrer"
        color="cyan"
        outline
      >
        anchor
      </Chip>
    </Example>
  );
}

export function SurfaceLevelExample() {
  return (
    <Example source={EXAMPLE_SOURCE.SurfaceLevelExample}>
      <Surface
        outline
        className="w-80 rounded-2xl"
        contentClassName="flex flex-col gap-4 p-4"
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold">Deployment</span>
          <Chip color="green">Live</Chip>
        </div>
        <Surface
          outline
          className="rounded-xl"
          contentClassName="flex items-center justify-between px-4 py-2"
        >
          <span className="text-cladd-fg-soft">api/v2</span>
          <div className="flex gap-1">
            <Chip color="neutral" outline>
              prod
            </Chip>
            <Chip color="brand" outline>
              v1.4.2
            </Chip>
          </div>
        </Surface>
      </Surface>
    </Example>
  );
}

export function PlaygroundExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  const [color, setColor] = useState<Color>('brand');
  const [size, setSize] = useState<ButtonSize>('md');
  const [outline, setOutline] = useState(true);
  const [rounded, setRounded] = useState(false);
  const [withIcon, setWithIcon] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ variant, color, size, outline, rounded }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlVariant value={variant} onChange={setVariant} />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </ExampleToolbar>
          <ExampleToolbar>
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
            <ExampleControlSwitch
              label="icon"
              checked={withIcon}
              onChange={setWithIcon}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      <Chip
        variant={variant}
        color={color}
        size={size}
        outline={outline}
        rounded={rounded}
        icon={withIcon ? CheckIcon : undefined}
      >
        {color}
      </Chip>
    </Example>
  );
}

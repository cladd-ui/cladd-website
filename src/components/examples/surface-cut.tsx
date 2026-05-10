import {
  Surface,
  SurfaceCut,
  SurfaceCutContent,
  Toolbar,
  ToolbarButton,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSwitch,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/surface-cut';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <Surface
        outline
        className="w-80 rounded-2xl"
        contentClassName="flex flex-col gap-4 p-4"
      >
        <div className="flex flex-col gap-1">
          <div className="font-semibold">SurfaceCut</div>
          <div className="text-cladd-fg-soft">
            The recessed counterpart to Surface — for inset slots, fields, and
            wells.
          </div>
        </div>
        <SurfaceCut
          className="rounded-xl"
          contentClassName="flex items-center justify-between px-4 py-2"
        >
          <span className="font-mono text-cladd-fg-soft">PORT</span>
          <span className="font-mono">3000</span>
        </SurfaceCut>
      </Surface>
    </Example>
  );
}

export function SurfaceVsCutExample() {
  return (
    <Example source={EXAMPLE_SOURCE.SurfaceVsCutExample}>
      <Surface
        outline
        className="w-96 rounded-2xl"
        contentClassName="grid grid-cols-2 gap-4 p-4"
      >
        <Surface
          outline
          className="rounded-xl"
          contentClassName="flex items-center justify-center px-4 py-6 font-medium"
        >
          Surface
        </Surface>
        <SurfaceCut
          className="rounded-xl"
          contentClassName="flex items-center justify-center px-4 py-6 font-medium"
        >
          SurfaceCut
        </SurfaceCut>
      </Surface>
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
        <Toolbar>
          <ExampleControlSwitch
            label="outline"
            checked={outline}
            onChange={setOutline}
          />
        </Toolbar>
      }
    >
      <Surface outline className="rounded-2xl" contentClassName="p-4">
        <SurfaceCut
          outline={outline}
          className="rounded-xl"
          contentClassName="px-10 py-8 font-medium"
        >
          SurfaceCut
        </SurfaceCut>
      </Surface>
    </Example>
  );
}

export function ColorsExample() {
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorsExample}
      state={{ color }}
      controls={
        <Toolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </Toolbar>
      }
    >
      <Surface
        color={color}
        outline
        className="rounded-2xl"
        contentClassName="p-4"
      >
        <SurfaceCut
          as="button"
          hoverable
          clickable
          className="rounded-xl"
          contentClassName="px-10 py-8 font-medium"
        >
          Hover me
        </SurfaceCut>
      </Surface>
    </Example>
  );
}

export function InteractiveExample() {
  const [clickable, setClickable] = useState(true);
  const [hoverable, setHoverable] = useState(true);
  const [pressed, setPressed] = useState(false);

  const toggle = (v: boolean) => !v;

  return (
    <Example
      source={EXAMPLE_SOURCE.InteractiveExample}
      state={{ clickable, hoverable, pressed }}
      controls={
        <Toolbar>
          <ToolbarButton
            variant={clickable ? 'gradient' : 'transparent'}
            outline={clickable}
            color={clickable ? 'brand' : undefined}
            onClick={() => setClickable(toggle)}
          >
            clickable
          </ToolbarButton>
          <ToolbarButton
            variant={hoverable ? 'gradient' : 'transparent'}
            outline={hoverable}
            color={hoverable ? 'brand' : undefined}
            onClick={() => setHoverable(toggle)}
          >
            hoverable
          </ToolbarButton>
          <ToolbarButton
            variant={pressed ? 'gradient' : 'transparent'}
            outline={pressed}
            color={pressed ? 'brand' : undefined}
            onClick={() => setPressed(toggle)}
          >
            pressed
          </ToolbarButton>
        </Toolbar>
      }
    >
      <Surface outline className="rounded-2xl" contentClassName="p-4">
        <SurfaceCut
          as="button"
          clickable={clickable}
          hoverable={hoverable}
          pressed={pressed}
          className="rounded-xl"
          contentClassName="px-10 py-8 font-medium"
        >
          Try me
        </SurfaceCut>
      </Surface>
    </Example>
  );
}

export function PolymorphicExample() {
  return (
    <Example source={EXAMPLE_SOURCE.PolymorphicExample}>
      <Surface outline className="rounded-2xl" contentClassName="p-4">
        <SurfaceCut
          as="a"
          href="https://github.com/cladd-ui"
          target="_blank"
          rel="noreferrer"
          clickable
          hoverable
          className="rounded-xl text-cladd-primary"
          contentClassName="px-8 py-4 font-medium"
        >
          Open the cladd repo →
        </SurfaceCut>
      </Surface>
    </Example>
  );
}

export function FullHeightExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.FullHeightExample}
      previewClassName="gap-4 flex-wrap"
    >
      <Surface
        outline
        className="h-40 w-72 rounded-2xl"
        contentClassName="flex h-full gap-4 p-4"
      >
        <SurfaceCut
          className="flex-1 rounded-xl"
          contentClassName="flex items-center justify-center text-cladd-fg-soft"
        >
          fullHeight
        </SurfaceCut>
        <SurfaceCut className="flex-1 rounded-xl" wrapContent={false} as="div">
          <SurfaceCutContent
            fullHeight={false}
            className="m-4 px-4 py-2 text-cladd-fg-soft"
          >
            intrinsic
          </SurfaceCutContent>
        </SurfaceCut>
      </Surface>
    </Example>
  );
}

export function FieldExample() {
  return (
    <Example source={EXAMPLE_SOURCE.FieldExample}>
      <Surface
        outline
        className="w-80 rounded-2xl"
        contentClassName="flex flex-col gap-4 p-4"
      >
        <SurfaceCut
          className="rounded-lg"
          contentClassName="flex items-center gap-2 px-4 py-2 text-cladd-fg-soft"
        >
          <span className="font-mono text-xs uppercase">scheme</span>
          <span className="ml-auto font-mono text-cladd-fg">https://</span>
        </SurfaceCut>
        <SurfaceCut
          className="rounded-lg"
          contentClassName="flex items-center gap-2 px-4 py-2 text-cladd-fg-soft"
        >
          <span className="font-mono text-xs uppercase">host</span>
          <span className="ml-auto font-mono text-cladd-fg">cladd.io</span>
        </SurfaceCut>
        <SurfaceCut
          className="rounded-lg"
          contentClassName="flex items-center gap-2 px-4 py-2 text-cladd-fg-soft"
        >
          <span className="font-mono text-xs uppercase">port</span>
          <span className="ml-auto font-mono text-cladd-fg">443</span>
        </SurfaceCut>
      </Surface>
    </Example>
  );
}

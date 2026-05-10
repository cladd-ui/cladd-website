import {
  Segmented,
  SegmentedButton,
  Surface,
  SurfaceContent,
  Switch,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import { Example } from '../Example';

type SurfaceVariant =
  | 'transparent'
  | 'solid'
  | 'gradient'
  | 'solid-fill'
  | 'gradient-fill';

const VARIANTS: SurfaceVariant[] = [
  'transparent',
  'solid',
  'gradient',
  'solid-fill',
  'gradient-fill',
];

const COLORS: Color[] = [
  'neutral',
  'brand',
  'red',
  'pink',
  'purple',
  'blue',
  'cyan',
  'lime',
  'green',
  'yellow',
  'orange',
];

function PreviewCard(props: React.ComponentProps<typeof Surface>) {
  return (
    <Surface
      outline
      className="rounded-xl"
      contentClassName="px-10 py-8 font-medium"
      {...props}
    />
  );
}

export function OverviewExample() {
  return (
    <Example>
      <Surface
        outline
        className="w-80 rounded-2xl"
        contentClassName="flex flex-col gap-3 p-5"
      >
        <div className="flex flex-col gap-1">
          <div className="font-semibold">Surface</div>
          <div className="text-cladd-fg-soft">
            Foundational container — carries depth, variant, and accent color.
          </div>
        </div>
        <Surface
          outline
          className="rounded-xl"
          contentClassName="flex items-center justify-between px-3 py-2"
        >
          <span className="text-cladd-fg-soft">Nested surface</span>
          <span className="text-cladd-fg-softer">level +1</span>
        </Surface>
      </Surface>
    </Example>
  );
}

export function VariantsExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('solid');
  return (
    <Example
      controls={
        <Toolbar>
          <Segmented>
            {VARIANTS.map((v) => (
              <SegmentedButton
                key={v}
                active={variant === v}
                onClick={() => setVariant(v)}
              >
                {v}
              </SegmentedButton>
            ))}
          </Segmented>
        </Toolbar>
      }
    >
      <PreviewCard variant={variant}>{variant}</PreviewCard>
    </Example>
  );
}

export function ColorsExample() {
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      controls={
        <Toolbar>
          <Segmented activeColor={color}>
            {COLORS.map((c) => (
              <Tooltip key={c} tooltip={c}>
                <SegmentedButton
                  active={color === c}
                  onClick={() => setColor(c)}
                  aria-label={c}
                >
                  <span
                    className={`size-3 rounded-full bg-cladd-primary cladd-color-${c}`}
                  />
                </SegmentedButton>
              </Tooltip>
            ))}
          </Segmented>
        </Toolbar>
      }
    >
      <PreviewCard color={color} variant="gradient-fill">
        {color}
      </PreviewCard>
    </Example>
  );
}

export function OutlineExample() {
  const [outline, setOutline] = useState(true);
  return (
    <Example
      controls={
        <label className="flex cursor-pointer items-center gap-2">
          <Switch checked={outline} onChange={setOutline} />
          <span>outline</span>
        </label>
      }
    >
      <PreviewCard outline={outline} variant="solid">
        Surface
      </PreviewCard>
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
      <PreviewCard
        as="button"
        clickable={clickable}
        hoverable={hoverable}
        pressed={pressed}
        variant="solid"
      >
        Try me
      </PreviewCard>
    </Example>
  );
}

export function PlaygroundExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  const [color, setColor] = useState<Color>('brand');
  const [outline, setOutline] = useState(true);
  return (
    <Example
      controls={
        <div className="flex flex-col items-center gap-2">
          <Toolbar>
            <Segmented>
              {VARIANTS.map((v) => (
                <SegmentedButton
                  key={v}
                  active={variant === v}
                  onClick={() => setVariant(v)}
                >
                  {v}
                </SegmentedButton>
              ))}
            </Segmented>
          </Toolbar>
          <Toolbar>
            <Segmented activeColor={color}>
              {COLORS.map((c) => (
                <Tooltip key={c} tooltip={c}>
                  <SegmentedButton
                    active={color === c}
                    onClick={() => setColor(c)}
                    aria-label={c}
                  >
                    <span
                      className={`size-3 rounded-full bg-cladd-primary cladd-color-${c}`}
                    />
                  </SegmentedButton>
                </Tooltip>
              ))}
            </Segmented>
            <ToolbarSeparator />
            <label className="flex cursor-pointer items-center gap-2 px-2">
              <Switch checked={outline} onChange={setOutline} />
              <span>outline</span>
            </label>
          </Toolbar>
        </div>
      }
    >
      <Surface
        variant={variant}
        color={color}
        outline={outline}
        className="w-80 rounded-2xl"
        contentClassName="flex flex-col gap-3 p-4"
      >
        <div className="font-semibold capitalize">
          {variant} · {color}
        </div>
        <div className="text-cladd-fg-soft">
          Each nested surface auto-bumps one level deeper.
        </div>
        <Surface
          variant={variant}
          outline={outline}
          className="rounded-xl"
          contentClassName="flex flex-col gap-4 p-4"
        >
          <span>level 2</span>
          <Surface
            variant={variant}
            outline={outline}
            className="rounded-lg"
            contentClassName="flex flex-col gap-4 p-4"
          >
            <span>level 3</span>
            <Surface
              variant={variant}
              outline={outline}
              className="rounded-md"
              contentClassName="flex flex-col gap-4 p-4"
            >
              <span>level 4</span>
              <Surface
                variant={variant}
                outline={outline}
                className="rounded-md"
                contentClassName="p-4"
              >
                <span>level 5</span>
              </Surface>
            </Surface>
          </Surface>
        </Surface>
      </Surface>
    </Example>
  );
}

export function PolymorphicExample() {
  return (
    <Example>
      <Surface
        as="a"
        href="https://github.com/cladd-ui"
        target="_blank"
        rel="noreferrer"
        clickable
        hoverable
        outline
        className="rounded-xl text-cladd-primary"
        contentClassName="px-8 py-4 font-medium"
      >
        Open the cladd repo →
      </Surface>
    </Example>
  );
}

export function LevelsGridExample() {
  return (
    <Example previewClassName="min-h-40 gap-4 p-4 flex-wrap">
      {[1, 2, 3, 4, 5].map((level) => (
        <Surface
          key={level}
          level={level}
          outline
          className="rounded-lg"
          contentClassName="p-4 text-cladd-fg"
        >
          Level {level}
        </Surface>
      ))}
    </Example>
  );
}

export function NestedLevelsExample() {
  return (
    <Example>
      <Surface
        outline
        className="rounded-2xl"
        contentClassName="p-4 flex flex-col gap-4 font-mono"
      >
        <span>Level 1</span>
        <Surface
          outline
          className="rounded-xl"
          contentClassName="p-4 flex flex-col gap-4"
        >
          <span>Level 2</span>
          <Surface
            outline
            className="rounded-lg"
            contentClassName="p-4 flex flex-col gap-4"
          >
            <span>Level 3</span>
            <Surface
              outline
              className="rounded-md"
              contentClassName="p-4 flex flex-col gap-4"
            >
              <span>Level 4</span>
              <Surface outline className="rounded-md" contentClassName="p-4">
                <span>Level 5</span>
              </Surface>
            </Surface>
          </Surface>
        </Surface>
      </Surface>
    </Example>
  );
}

export function RelativeLevelsExample() {
  return (
    <Example>
      <Surface
        level={3}
        outline
        className="rounded-2xl"
        contentClassName="p-4 flex flex-col gap-4 font-mono text-cladd-fg-soft"
      >
        <span>level={'{3}'}</span>
        <div className="flex flex-wrap gap-4">
          <Surface
            level="-1"
            outline
            className="rounded-lg"
            contentClassName="p-4"
          >
            level=&quot;-1&quot; → 2
          </Surface>
          <Surface outline className="rounded-lg" contentClassName="p-4">
            (default) → 4
          </Surface>
          <Surface
            level="+2"
            outline
            className="rounded-lg"
            contentClassName="p-4"
          >
            level=&quot;+2&quot; → 5
          </Surface>
        </div>
      </Surface>
    </Example>
  );
}

export function TransparentNestingExample() {
  return (
    <Example>
      <Surface
        level={2}
        outline
        className="rounded-2xl"
        contentClassName="p-4 flex flex-col gap-4"
      >
        <span className="text-cladd-fg-soft">Parent (level 2)</span>
        <Surface
          variant="transparent"
          className="rounded-xl border border-dashed border-cladd-outline"
          contentClassName="p-4 flex flex-col gap-4"
        >
          <span>transparent wrapper</span>
          <Surface outline className="rounded-lg" contentClassName="p-4">
            Child Surface — still level 2
          </Surface>
        </Surface>
      </Surface>
    </Example>
  );
}

export function CompositionExample() {
  return (
    <Example>
      <Surface outline className="w-72 rounded-2xl" wrapContent={false}>
        <SurfaceContent className="flex items-center justify-between p-4 text-cladd-fg-soft">
          <span>Header</span>
          <span className="font-mono">3 items</span>
        </SurfaceContent>
        <div className="relative border-t border-cladd-outline" />
        <SurfaceContent className="p-4 leading-relaxed">
          With <code>wrapContent={'{false}'}</code> you compose{' '}
          <code>SurfaceContent</code> slots yourself.
        </SurfaceContent>
      </Surface>
    </Example>
  );
}

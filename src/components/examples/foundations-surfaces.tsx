import { Button, Chip, Surface, SurfaceCut } from '@cladd-ui/react';
import type { CSSProperties } from 'react';

import { EXAMPLE_SOURCE } from '@/generated/example-source/foundations-surfaces';

import { Example } from '../Example';

export function LevelsStackExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.LevelsStackExample}
      previewClassName="items-center justify-center"
    >
      <Surface level={1} outline className="rounded-cladd-lg p-3">
        <span className="font-mono text-xs text-cladd-fg-soft">level 1</span>
        <Surface outline className="mt-2 rounded-cladd-md p-3">
          <span className="font-mono text-xs text-cladd-fg-soft">level 2</span>
          <Surface outline className="mt-2 rounded-cladd-md p-3">
            <span className="font-mono text-xs text-cladd-fg-soft">
              level 3
            </span>
            <Surface outline className="mt-2 rounded-cladd-md p-3">
              <span className="font-mono text-xs text-cladd-fg-soft">
                level 4
              </span>
              <Surface outline className="mt-2 rounded-cladd-md p-3">
                <span className="font-mono text-xs text-cladd-fg-soft">
                  level 5
                </span>
              </Surface>
            </Surface>
          </Surface>
        </Surface>
      </Surface>
    </Example>
  );
}

export function ExtendLevelsExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.ExtendLevelsExample}
      previewClassName="flex-col items-stretch gap-2 content-center"
    >
      <div className="flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((level) => (
          <div
            key={level}
            className={`flex h-16 w-20 items-center justify-center rounded-cladd-md bg-cladd-surface shadow-cladd-outline cladd-surface-level-${level}`}
            style={
              {
                '--cladd-surface-multiplier': level - 1,
              } as CSSProperties
            }
          >
            <span className="font-mono text-xs text-cladd-fg-soft">
              L{level}
            </span>
          </div>
        ))}
      </div>
    </Example>
  );
}

export function ToneDeltaExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.ToneDeltaExample}
      previewClassName="items-stretch justify-center gap-4 content-center"
    >
      <div className="flex flex-1 flex-col gap-2">
        <span className="font-mono text-xs text-cladd-fg-soft">
          Default (6% / 4%)
        </span>
        <div className="cladd-surface-level-1 flex h-12 items-center justify-center rounded-cladd-sm bg-cladd-surface shadow-cladd-outline">
          <span className="font-mono text-xs text-cladd-fg-soft">L1</span>
        </div>
        <div
          className="cladd-surface-level-2 flex h-12 items-center justify-center rounded-cladd-sm bg-cladd-surface shadow-cladd-outline"
          style={{ '--cladd-surface-multiplier': 1 } as CSSProperties}
        >
          <span className="font-mono text-xs text-cladd-fg-soft">L2</span>
        </div>
        <div
          className="cladd-surface-level-3 flex h-12 items-center justify-center rounded-cladd-sm bg-cladd-surface shadow-cladd-outline"
          style={{ '--cladd-surface-multiplier': 2 } as CSSProperties}
        >
          <span className="font-mono text-xs text-cladd-fg-soft">L3</span>
        </div>
        <div
          className="cladd-surface-level-4 flex h-12 items-center justify-center rounded-cladd-sm bg-cladd-surface shadow-cladd-outline"
          style={{ '--cladd-surface-multiplier': 3 } as CSSProperties}
        >
          <span className="font-mono text-xs text-cladd-fg-soft">L4</span>
        </div>
      </div>
      <div
        className="flex flex-1 flex-col gap-2"
        style={{ '--cladd-surface-mix-amount': '14%' } as CSSProperties}
      >
        <span className="font-mono text-xs text-cladd-fg-soft">
          Tuned (14%)
        </span>
        <div className="cladd-surface-level-1 flex h-12 items-center justify-center rounded-cladd-sm bg-cladd-surface shadow-cladd-outline">
          <span className="font-mono text-xs text-cladd-fg-soft">L1</span>
        </div>
        <div
          className="cladd-surface-level-2 flex h-12 items-center justify-center rounded-cladd-sm bg-cladd-surface shadow-cladd-outline"
          style={{ '--cladd-surface-multiplier': 1 } as CSSProperties}
        >
          <span className="font-mono text-xs text-cladd-fg-soft">L2</span>
        </div>
        <div
          className="cladd-surface-level-3 flex h-12 items-center justify-center rounded-cladd-sm bg-cladd-surface shadow-cladd-outline"
          style={{ '--cladd-surface-multiplier': 2 } as CSSProperties}
        >
          <span className="font-mono text-xs text-cladd-fg-soft">L3</span>
        </div>
        <div
          className="cladd-surface-level-4 flex h-12 items-center justify-center rounded-cladd-sm bg-cladd-surface shadow-cladd-outline"
          style={{ '--cladd-surface-multiplier': 3 } as CSSProperties}
        >
          <span className="font-mono text-xs text-cladd-fg-soft">L4</span>
        </div>
      </div>
    </Example>
  );
}

export function SurfaceTokensExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.SurfaceTokensExample}
      previewClassName="items-stretch justify-center"
    >
      <Surface
        level={3}
        contentClassName="flex flex-col gap-2"
        className="rounded-2xl p-4"
        outline
        variant="solid"
      >
        <span className="font-mono text-xs">Surface Level 3</span>
        <span className="bg-cladd-surface-prev px-4 py-2 font-mono">
          bg-cladd-surface-prev
        </span>
        <span className="bg-cladd-surface-minus px-4 py-2 font-mono">
          bg-cladd-surface-minus
        </span>
        <span className="bg-cladd-surface px-4 py-2 font-mono">
          bg-cladd-surface
        </span>
        <span className="bg-cladd-surface-plus px-4 py-2 font-mono">
          bg-cladd-surface-plus
        </span>
        <span className="bg-cladd-surface-next px-4 py-2 font-mono">
          bg-cladd-surface-next
        </span>
        <span className="bg-cladd-surface-cut px-4 py-2 font-mono">
          bg-cladd-surface-cut
        </span>
        <span className="bg-cladd-surface-highlight px-4 py-2 font-mono">
          bg-cladd-surface-highlight
        </span>
      </Surface>
    </Example>
  );
}

export function CustomSurfaceElementExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.CustomSurfaceElementExample}
      previewClassName="items-center justify-center gap-4"
    >
      <Surface level={3} outline className="rounded-cladd-md">
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="font-mono text-xs text-cladd-fg-soft">
            &lt;Surface level=&#123;3&#125; outline&gt;
          </span>
        </div>
      </Surface>
      <div className="cladd-surface-level-3 rounded-cladd-md bg-cladd-surface shadow-cladd-outline">
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="font-mono text-xs text-cladd-fg-soft">
            cladd-surface-level-3 + bg-cladd-surface
          </span>
        </div>
      </div>
    </Example>
  );
}

export function WrapContentWrongExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.WrapContentWrongExample}
      previewClassName="flex-col items-stretch gap-4 content-center"
    >
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-cladd-fg-soft">
          Don&apos;t — flex/padding on className
        </span>
        <Surface
          outline
          className="flex items-center gap-3 rounded-cladd-md p-4"
        >
          <Chip color="red" outline>
            Status
          </Chip>
          <span className="text-sm">Layout doesn&apos;t apply to children</span>
        </Surface>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-cladd-fg-soft">
          Do — flex/padding on contentClassName
        </span>
        <Surface
          outline
          className="rounded-cladd-md"
          contentClassName="flex items-center gap-3 p-4"
        >
          <Chip color="green" outline>
            Status
          </Chip>
          <span className="text-sm">Children laid out correctly</span>
        </Surface>
      </div>
    </Example>
  );
}

export function WrapContentBypassExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.WrapContentBypassExample}
      previewClassName="items-stretch justify-center"
    >
      <Surface outline className="w-full rounded-cladd-md" wrapContent={false}>
        <div className="relative border-b border-cladd-outline px-4 py-2">
          <span className="font-mono text-xs text-cladd-fg-softer">Header</span>
        </div>
        <div className="relative flex items-center gap-3 px-4 py-3">
          <Chip color="blue" outline>
            Body
          </Chip>
          <span className="text-sm">
            Stacked sections with their own padding
          </span>
        </div>
      </Surface>
    </Example>
  );
}

export function CutVsSurfaceExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.CutVsSurfaceExample}
      previewClassName="items-stretch justify-center"
    >
      <Surface
        outline
        level={2}
        className="w-full rounded-cladd-lg"
        contentClassName="flex flex-col gap-3 p-4"
      >
        <span className="font-mono text-xs text-cladd-fg-soft">
          Surface L2 (outer)
        </span>
        <Surface
          outline
          className="rounded-cladd-md"
          contentClassName="p-4 text-sm"
        >
          Nested Surface — auto-bumps to L3
        </Surface>
        <SurfaceCut
          outline
          className="rounded-cladd-md"
          contentClassName="flex flex-col gap-4 p-4 text-sm"
        >
          <span>Nested SurfaceCut (recessed)</span>
          <Surface
            outline
            className="rounded-cladd-sm"
            contentClassName="p-4 text-sm"
          >
            Surface inside Cut — back to L2
          </Surface>
        </SurfaceCut>
        <div className="flex items-center gap-2">
          <Button>Save</Button>
          <Button surface="cut">Cancel</Button>
        </div>
      </Surface>
    </Example>
  );
}

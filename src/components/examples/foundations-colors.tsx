import {
  Button,
  Chip,
  SectionTitle,
  Surface,
  type Color,
} from '@cladd-ui/react';
import type { CSSProperties } from 'react';

import { EXAMPLE_SOURCE } from '@/generated/example-source/foundations-colors';

import { Example } from '../Example';

const ACCENT_COLORS: Color[] = [
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

export function AccentPaletteExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.AccentPaletteExample}
      previewClassName="flex-wrap gap-2 content-center"
    >
      {ACCENT_COLORS.map((color) => (
        <Chip key={color} color={color} outline size="md">
          {color}
        </Chip>
      ))}
    </Example>
  );
}

export function AccentOnRegionExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.AccentOnRegionExample}
      previewClassName="flex-wrap gap-3 content-center"
    >
      <div className="cladd-color-purple flex items-center gap-2">
        <Button>Save</Button>
        <Chip outline>Live</Chip>
      </div>
      <div className="cladd-color-orange flex items-center gap-2">
        <Button>Save</Button>
        <Chip outline>Live</Chip>
      </div>
    </Example>
  );
}

export function CustomAccentExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.CustomAccentExample}
      previewClassName="flex-wrap gap-3 content-center"
    >
      <div
        className="cladd-color-magenta flex items-center gap-2"
        style={{ '--cladd-theme': '#ff00cc' } as CSSProperties}
      >
        <Button>Save</Button>
        <Chip outline>Magenta</Chip>
        <Button variant="solid-fill">Filled</Button>
      </div>
    </Example>
  );
}

export function TuningExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.TuningExample}
      previewClassName="flex-col gap-4 items-stretch content-center"
    >
      <div className="cladd-color-blue flex items-center gap-3">
        <span className="w-32 text-xs text-cladd-fg-soft">Default</span>
        <Button>Primary</Button>
        <Chip outline>Tag</Chip>
        <span className="text-cladd-primary text-sm font-semibold">
          Primary text
        </span>
      </div>
      <div
        className="cladd-color-blue flex items-center gap-3"
        style={
          {
            '--cladd-dark-primary-lightness': '0.75',
            '--cladd-dark-primary-chroma': '0.22',
            '--cladd-light-primary-lightness': '0.4',
            '--cladd-light-primary-chroma': '0.22',
          } as CSSProperties
        }
      >
        <span className="w-32 text-xs text-cladd-fg-soft">Tuned</span>
        <Button>Primary</Button>
        <Chip outline>Tag</Chip>
        <span className="text-cladd-primary text-sm font-semibold">
          Primary text
        </span>
      </div>
    </Example>
  );
}

export function TextColorsExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.TextColorsExample}
      previewClassName="flex-col items-start gap-2 content-center"
    >
      <p className="text-cladd-fg">
        <span className="font-mono text-xs text-cladd-fg-softer">
          text-cladd-fg
        </span>{' '}
        — body text. Default for prose, labels, and most UI copy.
      </p>
      <p className="text-cladd-fg-soft">
        <span className="font-mono text-xs text-cladd-fg-softer">
          text-cladd-fg-soft
        </span>{' '}
        — secondary copy. Captions, helper lines, value tags.
      </p>
      <p className="text-cladd-fg-softer">
        <span className="font-mono text-xs text-cladd-fg-softer">
          text-cladd-fg-softer
        </span>{' '}
        — tertiary copy. Inactive labels, breadcrumbs, hints.
      </p>
      <p className="text-cladd-fg-softest">
        <span className="font-mono text-xs text-cladd-fg-softer">
          text-cladd-fg-softest
        </span>{' '}
        — quietest. Placeholders and decorative metadata.
      </p>
      <p className="text-cladd-primary">
        <span className="font-mono text-xs text-cladd-fg-softer">
          text-cladd-primary
        </span>{' '}
        — accent-tinted text. Picks up the surrounding{' '}
        <code>cladd-color-&#123;name&#125;</code>.
      </p>
    </Example>
  );
}

export function OnPrimaryExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.OnPrimaryExample}
      previewClassName="flex-wrap gap-3 content-center"
    >
      <Button color="lime" variant="gradient-fill">
        Built-in
      </Button>
      <Surface
        variant="solid-fill"
        color="lime"
        outline
        className="rounded-cladd-md"
        contentClassName="px-3 py-1.5"
      >
        <span className="text-sm font-semibold">Auto-inverted</span>
      </Surface>
      <div className="cladd-color-lime flex items-center rounded-cladd-md bg-cladd-primary px-3 py-1.5">
        <span className="text-sm font-semibold text-cladd-on-primary">
          Manual element
        </span>
      </div>
    </Example>
  );
}

export function BgAndOutlineExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.BgAndOutlineExample}
      previewClassName="flex-col gap-3 content-center"
    >
      <div className="bg-cladd-bg flex items-center gap-2 rounded-cladd-md border border-cladd-bg-outline px-3 py-2">
        <span className="text-xs font-mono text-cladd-fg-softer">
          bg-cladd-bg + border-cladd-bg-outline
        </span>
      </div>
      <Surface
        outline
        variant="solid"
        className="rounded-cladd-md"
        contentClassName="px-3 py-2 flex flex-col gap-2"
      >
        <span className="text-xs font-mono text-cladd-fg-softer">
          Inside a Surface
        </span>
        <div className="rounded-cladd-sm border border-cladd-outline px-2 py-1 text-xs">
          <span className="font-mono text-cladd-fg-softer">
            border-cladd-outline
          </span>{' '}
          — divides regions on a surface
        </div>
      </Surface>
    </Example>
  );
}

export function FgRampAcrossAccentsExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.FgRampAcrossAccentsExample}
      previewClassName="flex-col items-stretch gap-2 content-center"
    >
      <SectionTitle>Across accent regions</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {(['neutral', 'blue', 'orange'] as Color[]).map((color) => (
          <div
            key={color}
            className={`cladd-color-${color} flex flex-col gap-1 rounded-cladd-md bg-cladd-surface px-2 py-2`}
          >
            <span className="text-cladd-fg text-xs font-semibold">{color}</span>
            <span className="text-cladd-fg-soft text-xs">soft</span>
            <span className="text-cladd-fg-softer text-xs">softer</span>
            <span className="text-cladd-fg-softest text-xs">softest</span>
            <span className="text-cladd-primary text-xs font-semibold">
              primary
            </span>
          </div>
        ))}
      </div>
    </Example>
  );
}

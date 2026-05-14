import {
  Button,
  Chip,
  cn,
  type Color,
  Link,
  NumberField,
  Segmented,
  SegmentedButton,
  Select,
  Shortcut,
  Surface,
  SurfaceCut,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from '@cladd-ui/react';
import NextLink from 'next/link';
import { type ReactNode, useState } from 'react';

import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { BoldIcon } from '../icons/BoldIcon';
import { ItalicIcon } from '../icons/ItalicIcon';
import { UnderlineIcon } from '../icons/UnderlineIcon';
import { MarketingKicker, MarketingTitle } from '../Marketing';

interface PanelProps {
  title: string;
  pitch: string;
  docHref: string;
  docLabel: string;
  children: ReactNode;
  previewClassName?: string;
}

function Panel({
  title,
  pitch,
  docHref,
  docLabel,
  children,
  previewClassName,
}: PanelProps) {
  return (
    <Surface
      outline
      variant="gradient"
      className="group rounded-2xl"
      contentClassName="flex flex-col gap-4 p-4 sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-base font-semibold tracking-tight text-cladd-fg">
          {title}
        </h3>
        <Link
          as={NextLink}
          href={docHref}
          className="flex items-center gap-1 text-sm text-cladd-fg-softer hover:text-cladd-fg"
        >
          {docLabel}
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
      <p className="max-w-md text-sm leading-snug text-cladd-fg-soft">
        {pitch}
      </p>
      <div
        className={cn(
          'mt-2 flex flex-1 items-center justify-center',
          previewClassName,
        )}
      >
        {children}
      </div>
    </Surface>
  );
}

function SurfacesPreview() {
  return (
    <Surface
      level={2}
      outline
      className="w-full max-w-sm rounded-cladd-2xl"
      contentClassName="flex flex-col gap-2 p-4"
    >
      <span className="text-xs text-cladd-fg-soft">level 2</span>
      <Surface
        outline
        className="rounded-cladd-xl"
        contentClassName="flex flex-col gap-2 p-4"
      >
        <span className="text-xs text-cladd-fg-soft">level 3</span>
        <Surface outline className="rounded-cladd-lg" contentClassName="p-4">
          <span className="text-xs text-cladd-fg-soft">level 4</span>
        </Surface>
      </Surface>
      <SurfaceCut outline className="rounded-cladd-xl" contentClassName="p-4">
        <span className="text-xs text-cladd-fg-soft">recessed cut</span>
      </SurfaceCut>
    </Surface>
  );
}

const SIZES = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

function SizingPreview() {
  return (
    <div className="flex w-full flex-col items-stretch gap-4">
      <div className="flex flex-wrap items-end justify-center gap-2">
        {SIZES.map((s) => (
          <Button key={s} size={s}>
            {s}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 border-t border-cladd-outline pt-4">
        <span className="font-mono text-xs text-cladd-fg-softer">
          nests auto-shrink
        </span>
        <Button size="lg">
          Save
          <Chip size="lg" color="green">
            12
          </Chip>
          <Shortcut size="lg">cmd S</Shortcut>
        </Button>
      </div>
    </div>
  );
}

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

function AccentsPreview() {
  const [accent, setAccent] = useState<Color>('purple');
  return (
    <div className="flex w-full flex-col items-stretch gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {ACCENT_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setAccent(c)}
            className={cn(
              `cladd-color-${c} size-7 cursor-pointer rounded-cladd-md ring-1 ring-cladd-outline transition ring-inset`,
              accent === c
                ? 'ring-2 ring-cladd-fg/50'
                : 'hover:ring-cladd-fg-softer',
            )}
            style={{ background: 'var(--cladd-theme)' }}
            aria-label={c}
            title={c}
          />
        ))}
      </div>
      <div
        className={`cladd-color-${accent} flex flex-wrap items-center justify-center gap-2 border-t border-cladd-outline pt-4`}
      >
        <Button color={accent} variant="gradient-fill">
          Primary
        </Button>
        <Button color={accent}>Secondary</Button>
        <Chip color={accent}>{accent}</Chip>
      </div>
    </div>
  );
}

type TextStyle = 'paragraph' | 'h1' | 'h2' | 'h3';

const TEXT_STYLE_LABEL: Record<TextStyle, string> = {
  paragraph: 'Paragraph',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
};

function ControlsPreview() {
  const [view, setView] = useState<'list' | 'grid' | 'split'>('grid');
  const [count, setCount] = useState(12);
  const [style, setStyle] = useState<TextStyle>('paragraph');
  return (
    <div className="flex w-full flex-col items-stretch gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Select<TextStyle>
          value={style}
          rounded
          size="lg"
          options={['paragraph', 'h1', 'h2', 'h3']}
          onChange={(v) => setStyle(v as TextStyle)}
          renderOption={({ value }) => <span>{TEXT_STYLE_LABEL[value]}</span>}
          className="w-32"
        >
          {TEXT_STYLE_LABEL[style]}
        </Select>
        <Toolbar size="sm">
          <ToolbarButton>
            <BoldIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton>
            <ItalicIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton>
            <UnderlineIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton color="brand" variant="gradient" outline>
            Save
          </ToolbarButton>
        </Toolbar>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 border-t border-cladd-outline pt-4">
        <Segmented size="sm">
          <SegmentedButton
            active={view === 'list'}
            onClick={() => setView('list')}
          >
            List
          </SegmentedButton>
          <SegmentedButton
            active={view === 'grid'}
            onClick={() => setView('grid')}
          >
            Grid
          </SegmentedButton>
          <SegmentedButton
            active={view === 'split'}
            onClick={() => setView('split')}
          >
            Split
          </SegmentedButton>
        </Segmented>
        <NumberField
          size="sm"
          value={count}
          onChange={setCount}
          min={0}
          max={99}
          className="w-32"
        />
        <Shortcut size="sm">cmd K</Shortcut>
      </div>
    </div>
  );
}

export function PitchGrid() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <MarketingKicker>What's in the box</MarketingKicker>
        <MarketingTitle>
          Four things you won't find in a primitives library.
        </MarketingTitle>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel
          title="Surface system"
          pitch="Depth levels 1–5 plus recessed cuts. Every panel knows where it sits — nest one inside another, and the next surface auto-bumps."
          docHref="/react/foundations/surfaces/"
          docLabel="Surfaces"
        >
          <SurfacesPreview />
        </Panel>
        <Panel
          title="Sizing scale"
          pitch="One scale — 2xs through 2xl — that every interactive control respects. Drop a chip into a button and it auto-shrinks 8px."
          docHref="/react/foundations/sizing/"
          docLabel="Sizing"
        >
          <SizingPreview />
        </Panel>
        <Panel
          title="Eleven accents"
          pitch="Eleven named accent colors × five variants, all built on one OKLCH theme variable. Re-skin a region with one className."
          docHref="/react/foundations/colors/"
          docLabel="Colors"
        >
          <AccentsPreview />
        </Panel>
        <Panel
          title="App-grade controls"
          pitch="The boring app-shell parts ship in the box — Toolbar, Segmented, Select, NumberField, Shortcut. Wire them up, ship faster."
          docHref="/react/components/button/"
          docLabel="Components"
        >
          <ControlsPreview />
        </Panel>
      </div>
    </section>
  );
}

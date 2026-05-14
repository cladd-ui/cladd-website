import {
  Chip,
  cn,
  List,
  ListButton,
  ListSeparator,
  ListTitle,
  NumberField,
  NumberScrubber,
  Segmented,
  SegmentedButton,
  Select,
  Shortcut,
  Slider,
  Surface,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  type Color,
} from '@cladd-ui/react';
import { type SVGProps, useMemo, useState } from 'react';

import { CladdLogo } from '../CladdLogo';
import { SidebarIcon } from '../icons/SidebarIcon';

type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten';

const BLEND_LABEL: Record<BlendMode, string> = {
  normal: 'Normal',
  multiply: 'Multiply',
  screen: 'Screen',
  overlay: 'Overlay',
  darken: 'Darken',
  lighten: 'Lighten',
};

const BLEND_OPTIONS: BlendMode[] = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
];

const FILL_COLORS: Color[] = [
  'blue',
  'cyan',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'neutral',
];

const FILL_LABEL: Record<string, string> = {
  blue: 'Blue',
  cyan: 'Cyan',
  purple: 'Purple',
  pink: 'Pink',
  red: 'Red',
  orange: 'Orange',
  yellow: 'Yellow',
  lime: 'Lime',
  green: 'Green',
  neutral: 'Neutral',
};

interface Layer {
  id: string;
  name: string;
  kind: 'card' | 'badge';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  stroke: number;
  strokeColor: Color;
  radius: number;
  opacity: number;
  blend: BlendMode;
}

const CANVAS_W = 560;
const CANVAS_H = 360;

const INITIAL_LAYERS: Layer[] = [
  {
    id: 'card',
    name: 'Card',
    kind: 'card',
    x: 120,
    y: 70,
    width: 320,
    height: 220,
    fill: 'blue',
    stroke: 0,
    strokeColor: 'neutral',
    radius: 24,
    opacity: 100,
    blend: 'normal',
  },
  {
    id: 'badge',
    name: 'Badge',
    kind: 'badge',
    x: 380,
    y: 50,
    width: 64,
    height: 64,
    fill: 'orange',
    stroke: 2,
    strokeColor: 'neutral',
    radius: 32,
    opacity: 100,
    blend: 'normal',
  },
];

function CursorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" {...props}>
      <path d="M15.554,5.748L3.724,1.367c-.679-.251-1.423-.09-1.935,.423-.513,.513-.674,1.253-.422,1.933L5.748,15.553c.27,.728,.944,1.197,1.72,1.197h.01c.778-.004,1.452-.48,1.716-1.213l1.626-4.517c.033-.093,.106-.167,.201-.201l4.517-1.626c.733-.264,1.209-.938,1.213-1.717,.004-.779-.466-1.458-1.196-1.728Z" />
    </svg>
  );
}
function FrameIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" />
    </svg>
  );
}

function ShapeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <rect x="2" y="2" width="12" height="12" rx="2.5" />
    </svg>
  );
}

function CircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <circle cx="8" cy="8" r="6" />
    </svg>
  );
}

function TextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M2 2.5h12v2.25h-1.5V4H8.75v9h1.25v1.5H6v-1.5h1.25V4H3.5v.75H2V2.5z" />
    </svg>
  );
}

function HandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path
        d="M5 7V3.5a1 1 0 1 1 2 0V7m0 0V2.5a1 1 0 1 1 2 0V7m0 0V3a1 1 0 1 1 2 0v4m0 0V4.5a1 1 0 1 1 2 0V10c0 2.5-1.5 4.5-4 4.5S5 12.5 5 10V7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 6l4 4 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function UndoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 6h6a3 3 0 0 1 0 6H6M4 6l2.5-2.5M4 6l2.5 2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function RedoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 6H6a3 3 0 0 0 0 6h4M12 6L9.5 3.5M12 6L9.5 8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CommentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path
        d="M3 3.5h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8l-3 2.5V11.5H3a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <rect x="3.5" y="7.5" width="9" height="6" rx="1" strokeWidth="1.4" />
      <path d="M5.5 7.5V5a2.5 2.5 0 1 1 5 0v2.5" strokeWidth="1.4" />
    </svg>
  );
}

function VisibleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path
        d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="8" r="1.75" strokeWidth="1.4" />
    </svg>
  );
}

interface SwatchProps {
  color: Color;
  size?: number;
}

function Swatch({ color, size = 14 }: SwatchProps) {
  return (
    <span
      className={`cladd-color-${color} inline-block rounded-full ring-1 ring-black/30 ring-inset dark:ring-white/30`}
      style={{
        width: size,
        height: size,
        background: 'var(--cladd-theme)',
      }}
    />
  );
}

export function DesignToolDemo() {
  const [layers, setLayers] = useState<Layer[]>(INITIAL_LAYERS);
  const [selectedId, setSelectedId] = useState<string>('card');
  const [tool, setTool] = useState<'move' | 'frame' | 'shape' | 'text'>('move');
  const [zoom, setZoom] = useState(100);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selected = useMemo(
    () => layers.find((l) => l.id === selectedId) ?? layers[0],
    [layers, selectedId],
  );

  function updateSelected(patch: Partial<Layer>) {
    setLayers((prev) =>
      prev.map((l) => (l.id === selectedId ? { ...l, ...patch } : l)),
    );
  }

  return (
    <Surface level={1} wrapContent={false} className="flex h-full flex-col">
      {/* Top bar */}
      <div className="no-scrollbar relative flex h-12 shrink-0 items-center gap-4 overflow-x-auto overflow-y-hidden border-b border-cladd-outline px-2">
        <div className="flex items-center gap-2 text-sm whitespace-nowrap">
          <span className="inline-flex size-6 items-center justify-center rounded-md bg-cladd-surface-cut">
            <CladdLogo className="size-3.5" />
          </span>
          <span className="font-medium text-cladd-fg">Untitled</span>
          <span className="text-cladd-fg-softer">/</span>
          <span className="text-cladd-fg-soft">Frame 1</span>
        </div>

        <Toolbar size="sm" className="ml-2">
          <ToolbarButton
            color={tool === 'move' ? 'brand' : undefined}
            variant={tool === 'move' ? 'gradient' : 'transparent'}
            outline={tool === 'move'}
            onClick={() => setTool('move')}
          >
            <CursorIcon />
          </ToolbarButton>
          <ToolbarButton
            color={tool === 'frame' ? 'brand' : undefined}
            variant={tool === 'frame' ? 'gradient' : 'transparent'}
            outline={tool === 'frame'}
            onClick={() => setTool('frame')}
          >
            <FrameIcon />
          </ToolbarButton>
          <ToolbarButton
            color={tool === 'shape' ? 'brand' : undefined}
            variant={tool === 'shape' ? 'gradient' : 'transparent'}
            outline={tool === 'shape'}
            onClick={() => setTool('shape')}
          >
            <ShapeIcon />
          </ToolbarButton>
          <ToolbarButton
            color={tool === 'text' ? 'brand' : undefined}
            variant={tool === 'text' ? 'gradient' : 'transparent'}
            outline={tool === 'text'}
            onClick={() => setTool('text')}
          >
            <TextIcon />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton>
            <HandIcon />
          </ToolbarButton>
          <ToolbarButton>
            <CommentIcon />
          </ToolbarButton>
        </Toolbar>

        <div className="ml-auto flex items-center gap-2">
          <Toolbar size="sm">
            <ToolbarButton>
              <UndoIcon />
            </ToolbarButton>
            <ToolbarButton>
              <RedoIcon />
            </ToolbarButton>
          </Toolbar>
          <NumberField
            size="sm"
            value={zoom}
            onChange={setZoom}
            min={25}
            max={400}
            step={25}
            input={false}
            className="w-32"
          />
          <Toolbar>
            <ToolbarButton color="brand" size="sm" rounded>
              Share
            </ToolbarButton>
          </Toolbar>
        </div>
        <div className="sticky -right-2 -mr-2 bg-cladd-surface pr-2 pl-0 md:hidden">
          <span className="absolute top-0 right-full h-full w-4 bg-linear-90 from-transparent to-cladd-surface" />
          <Toolbar>
            <ToolbarButton
              size="sm"
              rounded
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <SidebarIcon className="rotate-180" />
            </ToolbarButton>
          </Toolbar>
        </div>
      </div>

      {/* Body: 3 columns */}
      <div className="relative flex min-h-0 flex-1">
        {/* Left panel — Layers */}
        <div className="hidden w-56 flex-col border-r border-cladd-outline lg:flex">
          <div className="flex items-center justify-between px-3 pt-3 pb-2 text-xs font-medium tracking-wide text-cladd-fg-soft uppercase">
            Layers
            <Shortcut size="sm">cmd L</Shortcut>
          </div>
          <div className="flex-1 overflow-hidden">
            <List>
              <ListButton
                icon={<FrameIcon />}
                after={<ChevronDownIcon className="size-3 opacity-50" />}
              >
                Frame 1
              </ListButton>
              {layers.map((layer) => (
                <ListButton
                  key={layer.id}
                  selected={layer.id === selectedId}
                  onClick={() => setSelectedId(layer.id)}
                  icon={layer.kind === 'card' ? <ShapeIcon /> : <CircleIcon />}
                  className="ml-4 w-auto"
                  after={
                    <span className="flex items-center gap-1 text-cladd-fg-softer">
                      <VisibleIcon className="size-3" />
                    </span>
                  }
                >
                  {layer.name}
                </ListButton>
              ))}
              <ListButton
                icon={<TextIcon />}
                className="ml-4 w-auto"
                after={
                  <span className="flex items-center gap-1 text-cladd-fg-softer">
                    <LockIcon className="size-3" />
                  </span>
                }
              >
                Title
              </ListButton>
              <ListSeparator />
              <ListTitle>Assets</ListTitle>
              <ListButton icon={<FrameIcon />} after={<Chip>12</Chip>}>
                Components
              </ListButton>
              <ListButton icon={<CircleIcon />}>Styles</ListButton>
            </List>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative flex-1 overflow-hidden bg-cladd-bg">
          <CanvasGrid />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative scale-50 sm:scale-100"
              style={{ width: CANVAS_W, height: CANVAS_H, minWidth: CANVAS_W }}
            >
              <div className="absolute inset-0 border border-cladd-outline" />
              {/* Decorative title in upper-left of frame */}
              <div className="pointer-events-none absolute bottom-full left-2 mb-2 origin-bottom-left scale-200 text-xs tracking-wide text-cladd-fg-soft uppercase sm:scale-100">
                Frame 1 · 560 × 360
              </div>
              {/* Layers */}
              {layers.map((layer) => {
                const isSelected = layer.id === selectedId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setSelectedId(layer.id)}
                    className={`cladd-color-${layer.fill} group absolute cursor-pointer outline-none`}
                    style={{
                      left: layer.x,
                      top: layer.y,
                      width: layer.width,
                      height: layer.height,
                    }}
                  >
                    <span
                      className="block size-full"
                      style={{
                        background: 'var(--cladd-theme)',
                        borderRadius: layer.radius,
                        opacity: layer.opacity / 100,
                        mixBlendMode: layer.blend,
                      }}
                    />
                    {layer.stroke > 0 && (
                      <span
                        aria-hidden
                        className={`cladd-color-${layer.strokeColor} pointer-events-none absolute inset-0`}
                        style={{
                          borderRadius: layer.radius,
                          boxShadow: `inset 0 0 0 ${layer.stroke}px var(--cladd-theme)`,
                          opacity: layer.opacity / 100,
                          mixBlendMode: layer.blend,
                        }}
                      />
                    )}
                    {isSelected && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -inset-1 rounded-[inherit]"
                        style={{
                          borderRadius: layer.radius + 4,
                          boxShadow:
                            '0 0 0 1.5px var(--color-cladd-fg), 0 0 0 4px color-mix(in srgb, var(--color-cladd-fg) 20%, transparent)',
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floating zoom indicator */}
          <div className="absolute right-3 bottom-3">
            <Segmented size="sm">
              <SegmentedButton active={zoom === 50} onClick={() => setZoom(50)}>
                50%
              </SegmentedButton>
              <SegmentedButton
                active={zoom === 100}
                onClick={() => setZoom(100)}
              >
                100%
              </SegmentedButton>
              <SegmentedButton
                active={zoom === 200}
                onClick={() => setZoom(200)}
              >
                200%
              </SegmentedButton>
            </Segmented>
          </div>
        </div>

        {/* Right panel — Inspector */}
        <div
          className={cn(
            'absolute inset-0 z-19 opacity-0 md:hidden',
            !sidebarOpen && 'pointer-events-none',
          )}
          onClick={() => setSidebarOpen(false)}
        />
        <Surface
          className={cn(
            'absolute -top-11 right-1 -bottom-7 z-20 w-64 rounded-3xl duration-300 md:relative md:top-0 md:right-0 md:bottom-0 md:z-1 md:block md:rounded-none md:border-l md:border-cladd-outline md:duration-0',
            !sidebarOpen && 'translate-x-[110%] md:translate-x-0',
          )}
          level={1}
          outline
          variant="gradient"
          bgClassName="md:hidden"
          contentClassName="flex flex-col gap-4 p-4 w-full"
        >
          <div className="-mt-2.5 -mr-2.5 flex justify-end md:hidden">
            <Toolbar>
              <ToolbarButton
                size="sm"
                rounded
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <SidebarIcon className="rotate-180" />
              </ToolbarButton>
            </Toolbar>
          </div>
          {/* Layer header */}
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-medium tracking-wide text-cladd-fg-soft uppercase">
              Inspector
              <Chip
                rounded
                className="flex items-center gap-1 text-xs font-normal text-cladd-fg-soft normal-case"
              >
                <Swatch color={selected.fill} size={10} />
                {selected.name}
              </Chip>
            </div>
          </div>

          {/* Position */}
          <InspectorRow label="Position & size">
            <div className="grid grid-cols-[12px_1fr_12px_1fr] items-center gap-x-2 gap-y-2">
              <FieldLabel mono>X</FieldLabel>
              <NumberScrubber
                rounded
                size="sm"
                value={selected.x}
                min={0}
                max={CANVAS_W - 20}
                step={4}
                onChange={(v) => updateSelected({ x: v })}
              />
              <FieldLabel mono>Y</FieldLabel>
              <NumberScrubber
                rounded
                size="sm"
                value={selected.y}
                min={0}
                max={CANVAS_H - 20}
                step={4}
                onChange={(v) => updateSelected({ y: v })}
              />
              <FieldLabel mono>W</FieldLabel>
              <NumberScrubber
                rounded
                size="sm"
                value={selected.width}
                min={20}
                max={CANVAS_W}
                step={4}
                onChange={(v) => updateSelected({ width: v })}
              />
              <FieldLabel mono>H</FieldLabel>
              <NumberScrubber
                rounded
                size="sm"
                value={selected.height}
                min={20}
                max={CANVAS_H}
                step={4}
                onChange={(v) => updateSelected({ height: v })}
              />
            </div>
          </InspectorRow>

          {/* Fill */}
          <InspectorRow label="Fill">
            <Select<Color>
              rounded
              value={selected.fill}
              options={FILL_COLORS}
              onChange={(v) => updateSelected({ fill: v as Color })}
              renderOption={({ value }) => (
                <span className="flex items-center gap-2">
                  <Swatch color={value} />
                  <span>{FILL_LABEL[value as string] ?? value}</span>
                </span>
              )}
              valueClassName="flex items-center gap-2"
            >
              <Swatch color={selected.fill} />
              {FILL_LABEL[selected.fill as string] ?? selected.fill}
            </Select>
          </InspectorRow>

          {/* Stroke + Radius */}
          <InspectorRow label="Stroke & radius">
            <div className="flex flex-col gap-1.5">
              <Select<Color>
                rounded
                size="sm"
                value={selected.strokeColor}
                options={FILL_COLORS}
                disabled={selected.stroke === 0}
                onChange={(v) => updateSelected({ strokeColor: v as Color })}
                renderOption={({ value }) => (
                  <span className="flex items-center gap-2">
                    <Swatch color={value} />
                    <span>{FILL_LABEL[value as string] ?? value}</span>
                  </span>
                )}
                valueClassName="flex items-center gap-2"
              >
                <Swatch color={selected.strokeColor} />
                {FILL_LABEL[selected.strokeColor as string] ??
                  selected.strokeColor}
              </Select>
              <div className="grid grid-cols-[42px_1fr_42px_1fr] items-center gap-x-1.5 gap-y-1.5">
                <FieldLabel>Stroke</FieldLabel>
                <NumberScrubber
                  rounded
                  size="sm"
                  value={selected.stroke}
                  min={0}
                  max={8}
                  step={1}
                  onChange={(v) => updateSelected({ stroke: v })}
                />
                <FieldLabel>Radius</FieldLabel>
                <NumberScrubber
                  rounded
                  size="sm"
                  value={selected.radius}
                  min={0}
                  max={Math.floor(
                    Math.min(selected.width, selected.height) / 2,
                  )}
                  step={2}
                  onChange={(v) => updateSelected({ radius: v })}
                />
              </div>
            </div>
          </InspectorRow>

          {/* Opacity */}
          <InspectorRow
            label={
              <span className="flex items-center justify-between">
                <span>Opacity</span>
                <span className="font-mono text-cladd-fg-softer">
                  {selected.opacity}%
                </span>
              </span>
            }
          >
            <Slider
              value={selected.opacity}
              min={0}
              max={100}
              step={1}
              onChange={(v) => updateSelected({ opacity: v })}
            />
          </InspectorRow>

          {/* Blend */}
          <InspectorRow label="Blend">
            <Select<BlendMode>
              rounded
              value={selected.blend}
              options={BLEND_OPTIONS}
              onChange={(v) => updateSelected({ blend: v as BlendMode })}
              renderOption={({ value }) => <span>{BLEND_LABEL[value]}</span>}
            >
              {BLEND_LABEL[selected.blend]}
            </Select>
          </InspectorRow>
        </Surface>
      </div>

      {/* Status bar */}
      <div className="relative flex h-8 items-center justify-between border-t border-cladd-outline px-3 text-xs text-cladd-fg-softer">
        <span className="flex items-center gap-2">
          <span className="cladd-color-green inline-block size-2 rounded-full bg-cladd-primary" />
          Auto-saved
        </span>
        <span className="hidden items-center gap-2 md:flex">
          <span>
            {selected.width} × {selected.height} · {selected.x}, {selected.y}
          </span>
          <span className="text-cladd-fg-softest">·</span>
          <span>{zoom}%</span>
        </span>
      </div>
    </Surface>
  );
}

function InspectorRow({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium text-cladd-fg">{label}</div>
      {children}
    </div>
  );
}

function FieldLabel({
  children,
  mono,
}: {
  mono?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={cn('text-xs text-cladd-fg-soft', mono && 'font-mono')}>
      {children}
    </span>
  );
}

function CanvasGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, var(--cladd-outline) 1px, transparent 0)',
        backgroundSize: '16px 16px',
      }}
    />
  );
}

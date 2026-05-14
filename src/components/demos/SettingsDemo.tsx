import {
  Button,
  Checkbox,
  Chip,
  cn,
  Input,
  List,
  ListButton,
  ListSeparator,
  NumberField,
  Radio,
  SearchField,
  Segmented,
  SegmentedButton,
  Select,
  Shortcut,
  Slider,
  Surface,
  SurfaceCut,
  Switch,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
  type Color,
} from '@cladd-ui/react';
import { type SVGProps, useMemo, useState } from 'react';

import { CladdLogo } from '../CladdLogo';

type Theme = 'system' | 'dark' | 'light';
type Density = 'compact' | 'comfortable' | 'spacious';
type FontFamily = 'geist-mono' | 'jetbrains-mono' | 'sf-mono';
type CategoryId =
  | 'general'
  | 'appearance'
  | 'editor'
  | 'keybinds'
  | 'account'
  | 'sync'
  | 'plugins'
  | 'advanced';

interface Category {
  id: CategoryId;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
  chip?: string;
}

const ACCENTS: Color[] = [
  'brand',
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

const ACCENT_LABEL: Record<string, string> = {
  brand: 'Brand',
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

const FONT_LABEL: Record<FontFamily, string> = {
  'geist-mono': 'Geist Mono',
  'jetbrains-mono': 'JetBrains Mono',
  'sf-mono': 'SF Mono',
};

// ---------- Icons ----------

function SlidersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      {...props}
    >
      <path d="M3 3v3M3 10v3M8 3v6M8 13v0M13 3v1M13 8v5" />
      <circle cx="3" cy="8" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="8" cy="11" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="13" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PaletteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13c.94 0 1.5-.55 1.5-1.25 0-.3-.12-.55-.3-.78a1.27 1.27 0 0 1-.2-.72c0-.7.56-1.25 1.25-1.25h1.5A3.75 3.75 0 0 0 15.5 6.75 5.5 5.5 0 0 0 8 1.5zM4.25 8a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm2.5-3a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm3 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm2.5 3a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
    </svg>
  );
}

function CodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 4 2 8l3 4M11 4l3 4-3 4M9 3l-2 10" />
    </svg>
  );
}

function KeyboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="1.5" y="3.5" width="13" height="9" rx="2" />
      <path d="M4 6.5h.01M7 6.5h.01M10 6.5h.01M13 6.5h.01M4 9h.01M7 9h.01M10 9h.01M13 9h.01M5 11h6" />
    </svg>
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <circle cx="8" cy="5" r="3" />
      <path d="M8 9c-3 0-5.5 1.7-5.5 3.75V14h11v-1.25C13.5 10.7 11 9 8 9z" />
    </svg>
  );
}

function CloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M11.75 13H4.5a3.5 3.5 0 0 1-.5-6.96 4.5 4.5 0 0 1 8.78.94A3.25 3.25 0 0 1 11.75 13z" />
    </svg>
  );
}

function PuzzleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M6 1.5a1.5 1.5 0 0 0-1.5 1.5v.5h-2A1.5 1.5 0 0 0 1 5v2h.5a1.25 1.25 0 1 1 0 2.5H1V13a1.5 1.5 0 0 0 1.5 1.5h2v-.5a1.5 1.5 0 0 1 3 0v.5h2.5A1.5 1.5 0 0 0 11.5 13v-2h.5a1.5 1.5 0 0 0 0-3h-.5V5.5a1.5 1.5 0 0 0-1.5-1.5h-2v-1A1.5 1.5 0 0 0 6 1.5z" />
    </svg>
  );
}

function BeakerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M6 1.5a.75.75 0 0 0 0 1.5h.25v3.75L2.4 12.32A1.5 1.5 0 0 0 3.65 14.5h8.7a1.5 1.5 0 0 0 1.25-2.18L9.75 6.75V3H10a.75.75 0 0 0 0-1.5H6zM7.75 6.95V3h.5v3.95l1.95 3.05H5.8L7.75 6.95z" />
    </svg>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 1 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" />
    </svg>
  );
}

function MinimizeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path d="M3 8h10" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function ResetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.5 8a5.5 5.5 0 1 0 1.86-4.1" />
      <path d="M2.5 3v3h3" />
    </svg>
  );
}

function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      {...props}
    >
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1.1 1.1M11.9 11.9 13 13M3 13l1.1-1.1M11.9 4.1 13 3" />
    </svg>
  );
}

function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M6.5 2A6 6 0 1 0 14 9.5a5 5 0 0 1-7.5-7.5z" />
    </svg>
  );
}

function MonitorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="1.5" y="2.5" width="13" height="9" rx="1.5" />
      <path d="M5.5 14h5M8 11.5V14" />
    </svg>
  );
}

function CategoriesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}

// ---------- Categories ----------

const CATEGORIES: Category[] = [
  { id: 'general', label: 'General', icon: SlidersIcon },
  { id: 'appearance', label: 'Appearance', icon: PaletteIcon },
  { id: 'editor', label: 'Editor', icon: CodeIcon },
  { id: 'keybinds', label: 'Keybindings', icon: KeyboardIcon },
  { id: 'account', label: 'Account', icon: UserIcon },
  { id: 'sync', label: 'Sync', icon: CloudIcon, chip: '3' },
  { id: 'plugins', label: 'Plugins', icon: PuzzleIcon, chip: '12' },
  { id: 'advanced', label: 'Advanced', icon: BeakerIcon },
];

// ---------- Subcomponents ----------

function Swatch({ color, size = 14 }: { color: Color; size?: number }) {
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-1 pt-1 pb-2 text-xs font-medium tracking-wide text-cladd-fg-soft uppercase">
      {children}
    </div>
  );
}

function SettingRow({
  label,
  description,
  control,
  children,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  control?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 px-4 py-3">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="text-sm font-medium text-cladd-fg">{label}</div>
        {description && (
          <div className="text-xs leading-relaxed text-cladd-fg-soft">
            {description}
          </div>
        )}
        {children}
      </div>
      {control && (
        <div className="flex shrink-0 items-center gap-2">{control}</div>
      )}
    </div>
  );
}

function RowDivider() {
  return <div className="mx-4 h-px bg-cladd-outline/60" />;
}

function FormGroup({
  title,
  children,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {title && <SectionTitle>{title}</SectionTitle>}
      <Surface
        outline
        variant="gradient"
        level="+1"
        className="rounded-2xl"
        contentClassName="flex flex-col py-1"
      >
        {children}
      </Surface>
    </div>
  );
}

// ---------- Specialized rows ----------

function SettingRowSwitch({
  label,
  description,
  checked,
  onChange,
  color,
  readOnly,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  color?: Color;
  readOnly?: boolean;
}) {
  return (
    <SettingRow
      label={label}
      description={description}
      control={
        <Switch
          size="md"
          color={color}
          checked={checked}
          onChange={onChange}
          readOnly={readOnly}
        />
      }
    />
  );
}

function SettingRowCheckbox({
  label,
  description,
  checked,
  onChange,
  color,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  color?: Color;
}) {
  return (
    <SettingRow
      label={label}
      description={description}
      control={
        <Checkbox
          size="sm"
          color={color}
          checked={checked}
          onChange={onChange}
        />
      }
    />
  );
}

function SettingRowSlider({
  label,
  description,
  value,
  onChange,
  min,
  max,
  step,
  format,
  color,
  disabled,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  value: number;
  onChange?: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: (v: number) => React.ReactNode;
  color?: Color;
  disabled?: boolean;
}) {
  return (
    <SettingRow
      label={label}
      description={description}
      control={
        format ? (
          <span className="font-mono text-xs text-cladd-fg-soft">
            {format(value)}
          </span>
        ) : undefined
      }
    >
      <div className="mt-2">
        <Slider
          size="sm"
          color={color}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      </div>
    </SettingRow>
  );
}

function SettingRowNumber({
  label,
  description,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  value: number;
  onChange?: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <SettingRow
      label={label}
      description={description}
      control={
        <NumberField
          size="sm"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className="w-32"
        />
      }
    />
  );
}

function SettingRowSelect<T extends string>({
  label,
  description,
  value,
  options,
  onChange,
  labelOf,
  optionClassName,
  className,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
  labelOf?: (v: T) => React.ReactNode;
  optionClassName?: string;
  className?: string;
}) {
  const display = labelOf ?? ((v: T) => v as React.ReactNode);
  return (
    <SettingRow
      label={label}
      description={description}
      control={
        <Select<T>
          rounded
          value={value}
          options={options as T[]}
          onChange={(v) => onChange(v as T)}
          renderOption={({ value: v }) => (
            <span className={optionClassName}>{display(v)}</span>
          )}
          valueClassName={optionClassName}
          className={className}
        >
          {display(value)}
        </Select>
      }
    />
  );
}

function SettingRowRadioGroup<T extends string>({
  label,
  description,
  name,
  value,
  options,
  onChange,
  color,
  layout = 'inline',
  capitalize,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  name: string;
  value: T;
  options: ReadonlyArray<readonly [T, React.ReactNode]>;
  onChange: (v: T) => void;
  color?: Color;
  layout?: 'inline' | 'vertical';
  capitalize?: boolean;
}) {
  return (
    <SettingRow label={label} description={description}>
      <div
        className={cn(
          'mt-2 flex gap-4',
          layout === 'vertical' && 'flex-col gap-2',
        )}
      >
        {options.map(([id, lab]) => (
          <label
            key={id}
            className={cn(
              'flex cursor-pointer items-center gap-2 text-xs font-semibold select-none',
              capitalize && 'capitalize',
            )}
          >
            <Radio
              size="sm"
              color={color}
              checked={value === id}
              onChange={() => onChange(id)}
              name={name}
              value={id}
            />
            {lab}
          </label>
        ))}
      </div>
    </SettingRow>
  );
}

// ---------- Appearance preview ----------

function PreviewSurface({
  accent,
  theme,
  density,
  radius,
  fontSize,
}: {
  accent: Color;
  theme: Theme;
  density: Density;
  radius: number;
  fontSize: number;
}) {
  const densityPad =
    density === 'compact'
      ? 'p-2 gap-1.5'
      : density === 'spacious'
        ? 'p-4 gap-3'
        : 'p-3 gap-2';

  return (
    <SurfaceCut
      className="overflow-hidden rounded-2xl"
      contentClassName="flex flex-col gap-4 p-4"
    >
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-medium tracking-wide text-cladd-fg-soft uppercase">
          Preview
        </span>
        <div className="flex items-center gap-2 text-xs text-cladd-fg-softer">
          <Swatch color={accent} size={10} />
          <span>
            {ACCENT_LABEL[accent]} · {theme} · {density}
          </span>
        </div>
      </div>
      <Surface
        outline
        variant="gradient"
        level={2}
        color={accent}
        style={{ borderRadius: radius + 8 }}
        wrapContent={false}
      >
        <div className={cn('relative flex flex-col', densityPad)}>
          <div className="flex items-center justify-between">
            <span
              className="font-medium text-cladd-fg"
              style={{ fontSize: fontSize + 1 }}
            >
              Project settings
            </span>
            <Chip rounded color={accent} size="sm">
              {ACCENT_LABEL[accent]}
            </Chip>
          </div>
          <SurfaceCut
            className="overflow-hidden"
            style={{ borderRadius: radius }}
            contentClassName={cn('flex items-center gap-2', densityPad)}
          >
            <span className="flex-1 text-cladd-fg-soft" style={{ fontSize }}>
              Sync across devices
            </span>
            <Switch size="sm" color={accent} checked readOnly />
          </SurfaceCut>
          <div className="flex items-center gap-2">
            <Button
              color={accent}
              variant="solid-fill"
              rounded
              style={{ borderRadius: radius }}
              contentClassName="px-4"
            >
              Apply
            </Button>
            <Button
              rounded
              style={{ borderRadius: radius }}
              contentClassName="px-4"
            >
              Cancel
            </Button>
            <Shortcut size="sm" className="ml-auto">
              cmd enter
            </Shortcut>
          </div>
        </div>
      </Surface>
    </SurfaceCut>
  );
}

// ---------- Panels ----------

function AppearancePanel({
  state,
  set,
}: {
  state: AppearanceState;
  set: (patch: Partial<AppearanceState>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <PreviewSurface
        accent={state.accent}
        theme={state.theme}
        density={state.density}
        radius={state.radius}
        fontSize={state.fontSize}
      />

      <FormGroup title="Theme & color">
        <SettingRow
          label="Theme"
          description="Match your operating system or override here."
          control={
            <Segmented activeColor={state.accent}>
              <SegmentedButton
                active={state.theme === 'system'}
                onClick={() => set({ theme: 'system' })}
              >
                <MonitorIcon />
                System
              </SegmentedButton>
              <SegmentedButton
                active={state.theme === 'dark'}
                onClick={() => set({ theme: 'dark' })}
              >
                <MoonIcon />
                Dark
              </SegmentedButton>
              <SegmentedButton
                active={state.theme === 'light'}
                onClick={() => set({ theme: 'light' })}
              >
                <SunIcon />
                Light
              </SegmentedButton>
            </Segmented>
          }
        />
        <RowDivider />
        <SettingRow
          label="Accent color"
          description="Applied to buttons, switches, focus rings, and chips."
          control={
            <Select<Color>
              rounded
              value={state.accent}
              options={ACCENTS}
              onChange={(v) => set({ accent: v as Color })}
              renderOption={({ value }) => (
                <span className="flex items-center gap-2">
                  <Swatch color={value} />
                  <span>{ACCENT_LABEL[value as string] ?? value}</span>
                </span>
              )}
              valueClassName="flex items-center gap-2"
              className="w-36"
            >
              <Swatch color={state.accent} />
              {ACCENT_LABEL[state.accent as string] ?? state.accent}
            </Select>
          }
        />
        <RowDivider />
        <SettingRowSwitch
          label="Reduce contrast"
          description="Soften surface levels for a calmer look."
          color={state.accent}
          checked={state.reduceContrast}
          onChange={(v) => set({ reduceContrast: v })}
        />
      </FormGroup>

      <FormGroup title="Layout & density">
        <SettingRowRadioGroup<Density>
          label="Density"
          description="Compact packs rows tightly; spacious adds breathing room."
          name="density"
          color={state.accent}
          value={state.density}
          onChange={(v) => set({ density: v })}
          options={[
            ['compact', 'Compact'],
            ['comfortable', 'Comfortable'],
            ['spacious', 'Spacious'],
          ]}
        />
        <RowDivider />
        <SettingRowNumber
          label="Font size"
          description="Base text size across the app."
          value={state.fontSize}
          onChange={(v) => set({ fontSize: v })}
          min={11}
          max={20}
          step={1}
        />
        <RowDivider />
        <SettingRowSlider
          label="Corner radius"
          color={state.accent}
          value={state.radius}
          onChange={(v) => set({ radius: v })}
          min={0}
          max={24}
          step={1}
          format={(v) => `${v}px`}
        />
      </FormGroup>

      <FormGroup title="Window & sidebar">
        <SettingRowCheckbox
          label="Show hidden files"
          color={state.accent}
          checked={state.showHidden}
          onChange={(v) => set({ showHidden: v })}
        />
        <RowDivider />
        <SettingRowCheckbox
          label="Smooth scrolling"
          color={state.accent}
          checked={state.smoothScroll}
          onChange={(v) => set({ smoothScroll: v })}
        />
        <RowDivider />
        <SettingRowCheckbox
          label="Reduce motion"
          description="Disable non-essential animations."
          color={state.accent}
          checked={state.reduceMotion}
          onChange={(v) => set({ reduceMotion: v })}
        />
      </FormGroup>
    </div>
  );
}

function GeneralPanel({ accent }: { accent: Color }) {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [telemetry, setTelemetry] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [startup, setStartup] = useState<'welcome' | 'last' | 'empty'>('last');

  return (
    <div className="flex flex-col gap-5">
      <FormGroup title="Startup">
        <SettingRowRadioGroup<'welcome' | 'last' | 'empty'>
          label="On launch"
          description="What to open when the app starts."
          name="startup"
          color={accent}
          value={startup}
          onChange={setStartup}
          layout="vertical"
          options={[
            ['welcome', 'Show welcome page'],
            ['last', 'Restore last session'],
            ['empty', 'Open an empty workspace'],
          ]}
        />
      </FormGroup>

      <FormGroup title="Updates & language">
        <SettingRowSwitch
          label="Auto-update"
          description="Install new versions in the background."
          color={accent}
          checked={autoUpdate}
          onChange={setAutoUpdate}
        />
        <RowDivider />
        <SettingRowSwitch
          label="Send anonymous telemetry"
          description="Crash reports and feature usage. No personal data."
          color={accent}
          checked={telemetry}
          onChange={setTelemetry}
        />
        <RowDivider />
        <SettingRowSelect<string>
          label="Language"
          value={language}
          options={['en-US', 'en-GB', 'de-DE', 'fr-FR', 'ja-JP', 'pt-BR']}
          onChange={setLanguage}
          className="w-32"
        />
      </FormGroup>
    </div>
  );
}

function EditorPanel({ accent }: { accent: Color }) {
  const [tabSize, setTabSize] = useState(2);
  const [wordWrap, setWordWrap] = useState(true);
  const [formatOnSave, setFormatOnSave] = useState(true);
  const [trim, setTrim] = useState(true);
  const [autosaveDelay, setAutosaveDelay] = useState(800);
  const [fontFamily, setFontFamily] = useState<FontFamily>('geist-mono');

  return (
    <div className="flex flex-col gap-5">
      <FormGroup title="Indentation">
        <SettingRowNumber
          label="Tab size"
          description="Number of spaces per indentation level."
          value={tabSize}
          onChange={setTabSize}
          min={1}
          max={8}
          step={1}
        />
        <RowDivider />
        <SettingRowSwitch
          label="Word wrap"
          color={accent}
          checked={wordWrap}
          onChange={setWordWrap}
        />
      </FormGroup>

      <FormGroup title="Formatting">
        <SettingRowSwitch
          label="Format on save"
          description="Run the project formatter when a file is saved."
          color={accent}
          checked={formatOnSave}
          onChange={setFormatOnSave}
        />
        <RowDivider />
        <SettingRowCheckbox
          label="Trim trailing whitespace"
          color={accent}
          checked={trim}
          onChange={setTrim}
        />
        <RowDivider />
        <SettingRowSlider
          label="Autosave delay"
          color={accent}
          value={autosaveDelay}
          onChange={setAutosaveDelay}
          min={200}
          max={3000}
          step={100}
          format={(v) => `${v}ms`}
        />
      </FormGroup>

      <FormGroup title="Font">
        <SettingRowSelect<FontFamily>
          label="Editor font"
          value={fontFamily}
          options={['geist-mono', 'jetbrains-mono', 'sf-mono']}
          onChange={setFontFamily}
          labelOf={(v) => FONT_LABEL[v]}
          optionClassName="font-mono"
          className="w-44"
        />
      </FormGroup>
    </div>
  );
}

const KEYBINDS = [
  { label: 'Open command palette', keys: 'cmd K' },
  { label: 'Quick open file', keys: 'cmd P' },
  { label: 'Toggle sidebar', keys: 'cmd B' },
  { label: 'Toggle terminal', keys: 'cmd j' },
  { label: 'Go to symbol', keys: 'cmd shift O' },
  { label: 'Find in files', keys: 'cmd shift F' },
  { label: 'Save all', keys: 'cmd alt S' },
  { label: 'Format document', keys: 'cmd shift I' },
] as const;

function KeybindsPanel({ accent }: { accent: Color }) {
  const [filter, setFilter] = useState('');
  const filtered = filter.trim()
    ? KEYBINDS.filter((k) =>
        k.label.toLowerCase().includes(filter.toLowerCase()),
      )
    : KEYBINDS;

  return (
    <div className="flex flex-col gap-4">
      <FormGroup>
        <div className="px-1 pt-0 pb-1">
          <SearchField
            value={filter}
            onChange={setFilter}
            placeholder="Filter keybindings"
            clearButton
          />
        </div>
        {filtered.map((k, i) => (
          <div key={k.label}>
            {i > 0 && <RowDivider />}
            <SettingRow
              label={k.label}
              control={
                <Shortcut size="sm" color={accent}>
                  {k.keys}
                </Shortcut>
              }
            />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-cladd-fg-softer">
            No keybindings match “{filter}”.
          </div>
        )}
      </FormGroup>
    </div>
  );
}

function AccountPanel({ accent }: { accent: Color }) {
  const [name, setName] = useState('Vladimir Kharlampidi');
  const [email] = useState('vk@cladd.io');

  return (
    <div className="flex flex-col gap-5">
      <FormGroup title="Profile">
        <SettingRow label="Display name">
          <div className="mt-2">
            <Input value={name} onChange={(v) => setName(v)} />
          </div>
        </SettingRow>
        <RowDivider />
        <SettingRow label="Email">
          <div className="mt-2">
            <Input
              value={email}
              readOnly
              suffix={
                <Chip rounded color="green" className="mr-2">
                  Verified
                </Chip>
              }
            />
          </div>
        </SettingRow>
      </FormGroup>

      <FormGroup title="Plan">
        <SettingRow
          label="Pro · Annual"
          description="Renews on May 14, 2027. 9 of 12 seats used."
          control={
            <Button rounded color={accent} contentClassName="px-4">
              Manage
            </Button>
          }
        />
        <RowDivider />
        <SettingRowSwitch
          label="Beta features"
          description="Opt in to early access for new components."
          color={accent}
          checked
          readOnly
        />
      </FormGroup>
    </div>
  );
}

function SyncPanel({ accent }: { accent: Color }) {
  const [enabled, setEnabled] = useState(true);
  const [bandwidth, setBandwidth] = useState(60);

  return (
    <div className="flex flex-col gap-5">
      <FormGroup title="Cloud sync">
        <SettingRowSwitch
          label="Enable sync"
          description="Mirror settings, snippets, and plugins to your account."
          color={accent}
          checked={enabled}
          onChange={setEnabled}
        />
        <RowDivider />
        <SettingRowSlider
          label="Bandwidth limit"
          color={accent}
          value={bandwidth}
          onChange={setBandwidth}
          min={10}
          max={200}
          step={10}
          disabled={!enabled}
          format={(v) => `${v} MB/s`}
        />
      </FormGroup>

      <FormGroup title="Devices">
        <SettingRow
          label="MacBook Pro · this device"
          description="Last sync · just now"
          control={
            <Chip rounded color="green">
              Active
            </Chip>
          }
        />
        <RowDivider />
        <SettingRow
          label="Studio iMac"
          description="Last sync · 12 minutes ago"
          control={<Chip rounded>Idle</Chip>}
        />
        <RowDivider />
        <SettingRow
          label="iPad · ipad-pro"
          description="Last sync · 3 days ago"
          control={
            <Chip rounded color="orange">
              Stale
            </Chip>
          }
        />
      </FormGroup>
    </div>
  );
}

interface Plugin {
  id: string;
  name: string;
  description: string;
  color: Color;
  enabled: boolean;
}

const INITIAL_PLUGINS: Plugin[] = [
  {
    id: 'mdx-preview',
    name: 'MDX live preview',
    description: 'Side-by-side MDX rendering with syntax highlighting.',
    color: 'cyan',
    enabled: true,
  },
  {
    id: 'git-lens',
    name: 'Git inline blame',
    description: 'Show author and last commit on each line.',
    color: 'purple',
    enabled: true,
  },
  {
    id: 'theme-tools',
    name: 'Theme tools',
    description: 'Inspect cladd surface levels and accent variables.',
    color: 'orange',
    enabled: false,
  },
  {
    id: 'spell',
    name: 'Spellcheck',
    description: 'Inline misspellings in prose and comments.',
    color: 'green',
    enabled: true,
  },
];

function PluginsPanel({ accent }: { accent: Color }) {
  const [plugins, setPlugins] = useState(INITIAL_PLUGINS);

  return (
    <div className="flex flex-col gap-5">
      <FormGroup title={`Installed · ${plugins.length}`}>
        {plugins.map((p, i) => (
          <div key={p.id}>
            {i > 0 && <RowDivider />}
            <SettingRowSwitch
              label={
                <span className="flex items-center gap-2">
                  <span
                    className={`cladd-color-${p.color} flex size-2.5 shrink-0 items-center justify-center rounded-full bg-cladd-primary`}
                  />
                  {p.name}
                </span>
              }
              description={p.description}
              color={accent}
              checked={p.enabled}
              onChange={(v) =>
                setPlugins((prev) =>
                  prev.map((x) => (x.id === p.id ? { ...x, enabled: v } : x)),
                )
              }
            />
          </div>
        ))}
      </FormGroup>
    </div>
  );
}

function AdvancedPanel({ accent }: { accent: Color }) {
  const [experimentalRender, setExperimentalRender] = useState(false);
  const [debug, setDebug] = useState(false);
  const [maxMemory, setMaxMemory] = useState(2048);

  return (
    <div className="flex flex-col gap-5">
      <FormGroup title="Experimental">
        <SettingRowSwitch
          label="Hardware-accelerated rendering"
          description="Off by default — may cause flicker on some GPUs."
          color={accent}
          checked={experimentalRender}
          onChange={setExperimentalRender}
        />
        <RowDivider />
        <SettingRowSwitch
          label="Verbose logging"
          description="Print component lifecycle to the developer console."
          color={accent}
          checked={debug}
          onChange={setDebug}
        />
      </FormGroup>

      <FormGroup title="Performance">
        <SettingRowSlider
          label="Max memory"
          color={accent}
          value={maxMemory}
          onChange={setMaxMemory}
          min={512}
          max={8192}
          step={256}
          format={(v) => `${v} MB`}
        />
      </FormGroup>

      <FormGroup title="Reset">
        <SettingRow
          label="Restore defaults"
          description="Revert every setting in every category."
          control={
            <Button rounded color="red" variant="solid" contentClassName="px-4">
              <ResetIcon />
              Reset all
            </Button>
          }
        />
      </FormGroup>
    </div>
  );
}

// ---------- Main ----------

interface AppearanceState {
  theme: Theme;
  accent: Color;
  density: Density;
  fontSize: number;
  radius: number;
  showHidden: boolean;
  smoothScroll: boolean;
  reduceMotion: boolean;
  reduceContrast: boolean;
}

const INITIAL_APPEARANCE: AppearanceState = {
  theme: 'dark',
  accent: 'brand',
  density: 'comfortable',
  fontSize: 14,
  radius: 8,
  showHidden: false,
  smoothScroll: true,
  reduceMotion: false,
  reduceContrast: false,
};

export function SettingsDemo() {
  const [category, setCategory] = useState<CategoryId>('appearance');
  const [appearance, setAppearance] =
    useState<AppearanceState>(INITIAL_APPEARANCE);
  const [search, setSearch] = useState('');

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return CATEGORIES;
    const q = search.toLowerCase();
    return CATEGORIES.filter((c) => c.label.toLowerCase().includes(q));
  }, [search]);

  function patchAppearance(patch: Partial<AppearanceState>) {
    setAppearance((s) => ({ ...s, ...patch }));
  }

  const current = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[1];
  const CategoryIcon = current.icon;

  return (
    <Surface
      level={1}
      wrapContent={false}
      className="flex h-full flex-col bg-cladd-bg"
    >
      {/* Window chrome / top bar */}
      <div className="relative flex h-12 shrink-0 items-center gap-4 border-b border-cladd-outline px-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-6 items-center justify-center rounded-md bg-cladd-surface-cut">
            <CladdLogo className="size-3.5" />
          </span>
          <span className="hidden text-sm font-medium text-cladd-fg sm:block">
            Settings
          </span>
          <span className="hidden text-cladd-fg-softer sm:block">/</span>
          <span className="hidden text-sm text-cladd-fg-soft sm:block">
            {current.label}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="w-32 md:w-56">
            <SearchField
              value={search}
              onChange={setSearch}
              placeholder="Search settings"
              clearButton={false}
            />
          </div>
          <Toolbar size="sm">
            <Tooltip tooltip="Browse all settings">
              <ToolbarButton aria-label="Browse all">
                <CategoriesIcon />
              </ToolbarButton>
            </Tooltip>
            <ToolbarSeparator />
            <Tooltip tooltip="Minimize">
              <ToolbarButton aria-label="Minimize">
                <MinimizeIcon />
              </ToolbarButton>
            </Tooltip>
            <Tooltip tooltip="Close settings · Esc">
              <ToolbarButton aria-label="Close">
                <CloseIcon />
              </ToolbarButton>
            </Tooltip>
          </Toolbar>
        </div>
      </div>

      {/* Body — sidebar + main */}
      <div className="relative flex min-h-0 flex-1">
        {/* Sidebar */}
        <div className="relative hidden w-56 shrink-0 flex-col border-r border-cladd-outline md:flex">
          <div className="flex-1 overflow-auto">
            <List>
              {filteredCategories.map((c) => {
                const Icon = c.icon;
                return (
                  <ListButton
                    key={c.id}
                    icon={<Icon className="size-4" />}
                    selected={c.id === category}
                    onClick={() => setCategory(c.id)}
                    after={
                      c.chip ? (
                        <Chip size="sm" rounded>
                          {c.chip}
                        </Chip>
                      ) : undefined
                    }
                  >
                    {c.label}
                  </ListButton>
                );
              })}
              {filteredCategories.length === 0 && (
                <div className="px-3 py-4 text-center text-xs text-cladd-fg-softer">
                  No matches.
                </div>
              )}
              <ListSeparator />
              <ListButton
                icon={<ResetIcon className="size-4" />}
                className="text-cladd-fg-soft"
              >
                Reset to defaults
              </ListButton>
            </List>
          </div>
          <div className="border-t border-cladd-outline px-3 py-3">
            <div className="flex items-center justify-between text-xs text-cladd-fg-soft">
              <span>Settings · v4.2.0</span>
              <Shortcut size="sm">cmd ,</Shortcut>
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="relative flex items-center gap-4 border-b border-cladd-outline px-4 py-2">
            <span className="cladd-color-brand cladd-surface-level-2 flex size-8 items-center justify-center rounded-lg border border-cladd-outline bg-cladd-surface text-cladd-primary">
              <CategoryIcon className="size-4" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-cladd-fg">
                {current.label}
              </span>
              <span className="text-xs text-cladd-fg-soft">
                {describeCategory(current.id)}
              </span>
            </div>
            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <Chip rounded size="sm" color={appearance.accent}>
                <Swatch color={appearance.accent} size={10} />
                {ACCENT_LABEL[appearance.accent]}
              </Chip>
              <Chip rounded size="sm">
                {appearance.theme}
              </Chip>
            </div>
          </div>

          <div className="relative flex-1 overflow-auto p-4">
            {category === 'appearance' && (
              <AppearancePanel state={appearance} set={patchAppearance} />
            )}
            {category === 'general' && (
              <GeneralPanel accent={appearance.accent} />
            )}
            {category === 'editor' && (
              <EditorPanel accent={appearance.accent} />
            )}
            {category === 'keybinds' && (
              <KeybindsPanel accent={appearance.accent} />
            )}
            {category === 'account' && (
              <AccountPanel accent={appearance.accent} />
            )}
            {category === 'sync' && <SyncPanel accent={appearance.accent} />}
            {category === 'plugins' && (
              <PluginsPanel accent={appearance.accent} />
            )}
            {category === 'advanced' && (
              <AdvancedPanel accent={appearance.accent} />
            )}
          </div>

          {/* Footer */}
          <div className="relative flex h-10.25 shrink-0 items-center gap-4 border-t border-cladd-outline px-4 text-xs text-cladd-fg-softer">
            <span className="flex items-center gap-2">
              <span className="cladd-color-green inline-block size-2 rounded-full bg-cladd-primary" />
              Saved automatically
            </span>
            <span className="ml-auto hidden items-center gap-2 sm:flex">
              <Shortcut size="sm">esc</Shortcut>
              <span>to close</span>
            </span>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function describeCategory(id: CategoryId): string {
  switch (id) {
    case 'general':
      return 'Startup, language, and updates.';
    case 'appearance':
      return 'Theme, accent, density, and surface preview.';
    case 'editor':
      return 'Indentation, formatting, font, autosave.';
    case 'keybinds':
      return 'Keyboard shortcuts for the app.';
    case 'account':
      return 'Profile, email, and plan.';
    case 'sync':
      return 'Cloud sync, devices, and bandwidth.';
    case 'plugins':
      return 'Installed extensions and toggles.';
    case 'advanced':
      return 'Experimental flags and reset.';
  }
}

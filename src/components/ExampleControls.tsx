import {
  Button,
  cn,
  Segmented,
  SegmentedButton,
  Switch,
  Toolbar,
  ToolbarProps,
  Tooltip,
  type ButtonSize,
  type Color,
} from '@cladd-ui/react';

export type SurfaceVariant =
  | 'transparent'
  | 'solid'
  | 'gradient'
  | 'solid-fill'
  | 'gradient-fill';

export const VARIANTS: SurfaceVariant[] = [
  'transparent',
  'solid',
  'gradient',
  'solid-fill',
  'gradient-fill',
];

export const SIZES: ButtonSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export const COLORS: Color[] = [
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

interface VariantControlProps {
  value: SurfaceVariant;
  onChange: (next: SurfaceVariant) => void;
}
export function ExampleToolbar({
  className,
  contentClassName,
  children,
  ...rest
}: ToolbarProps) {
  return (
    <Toolbar
      className={cn('max-w-full', className)}
      contentClassName={cn(
        'no-scrollbar max-w-full justify-start overflow-x-auto overflow-y-hidden',
        contentClassName,
      )}
      {...rest}
    >
      {children}
    </Toolbar>
  );
}
export function ExampleControlVariant({
  value,
  onChange,
}: VariantControlProps) {
  return (
    <Segmented className="whitespace-nowrap">
      {VARIANTS.map((v) => (
        <SegmentedButton
          key={v}
          active={value === v}
          onClick={() => onChange(v)}
        >
          {v}
        </SegmentedButton>
      ))}
    </Segmented>
  );
}

interface SizeControlProps<S extends string = ButtonSize> {
  value: S;
  onChange: (next: S) => void;
  sizes?: readonly S[];
}

export function ExampleControlSize<S extends string = ButtonSize>({
  value,
  onChange,
  sizes,
}: SizeControlProps<S>) {
  const items = (sizes ??
    (SIZES as readonly string[] as readonly S[])) as readonly S[];
  return (
    <Segmented className="whitespace-nowrap">
      {items.map((s) => (
        <SegmentedButton
          key={s}
          active={value === s}
          onClick={() => onChange(s)}
        >
          {s}
        </SegmentedButton>
      ))}
    </Segmented>
  );
}

interface ColorControlProps {
  value: Color;
  onChange: (next: Color) => void;
}

export function ExampleControlColor({ value, onChange }: ColorControlProps) {
  return (
    <Segmented className="whitespace-nowrap" activeColor={value}>
      {COLORS.map((c) => (
        <Tooltip key={c} tooltip={c}>
          <SegmentedButton
            active={value === c}
            onClick={() => onChange(c)}
            aria-label={c}
          >
            <span
              className={`size-3 rounded-full bg-cladd-primary cladd-color-${c}`}
            />
          </SegmentedButton>
        </Tooltip>
      ))}
    </Segmented>
  );
}

interface SwitchControlProps {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}

export function ExampleControlSwitch({
  label,
  checked,
  onChange,
}: SwitchControlProps) {
  return (
    <Button
      rounded
      as="label"
      className="flex cursor-pointer items-center gap-2"
      variant="transparent"
      outline={false}
      contentClassName="pl-1"
    >
      <Switch as="span" size="sm" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </Button>
  );
}

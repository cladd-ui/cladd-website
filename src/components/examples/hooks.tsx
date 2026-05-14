import {
  Button,
  Chip,
  SectionTitle,
  Surface,
  useAccentColor,
  useDevice,
  useSurface,
  useTheme,
} from '@cladd-ui/react';
import { useEffect, useState } from 'react';

import { EXAMPLE_SOURCE } from '@/generated/example-source/hooks';

import { Example } from '../Example';

export function UseThemeExample() {
  const theme = useTheme();
  return (
    <Example source={EXAMPLE_SOURCE.UseThemeExample}>
      <div className="flex flex-col items-center gap-4">
        <SectionTitle>Current theme</SectionTitle>
        <Chip color={theme === 'dark' ? 'purple' : 'yellow'} size="lg">
          {theme}
        </Chip>
        <span className="text-xs text-cladd-fg-soft">
          Toggle via the theme switch in the header.
        </span>
      </div>
    </Example>
  );
}

export function UseAccentColorExample() {
  const accent = useAccentColor();
  return (
    <Example source={EXAMPLE_SOURCE.UseAccentColorExample}>
      <div className="flex flex-col items-center gap-4">
        <SectionTitle>App-wide accent</SectionTitle>
        <div className="flex items-center gap-2">
          <Chip color={accent} size="lg">
            {accent}
          </Chip>
          <Button color={accent} variant="gradient" size="lg">
            App accent
          </Button>
        </div>
        <span className="text-xs text-cladd-fg-soft">
          Default when no `accentColor` is passed to CladdProvider.
        </span>
      </div>
    </Example>
  );
}

// Read by the codegen: extract-example-source.mjs recognises
// `<Example source={USE_SURFACE_SOURCE}>` and emits this string as the
// extracted source. Each `useSurface()` call needs its own component so the
// hook reads the right SurfaceContext — copy-pasting the block as-is into a
// real app should render 1, 2, 3 the same way the live demo does.
const USE_SURFACE_SOURCE = `function SurfaceLevelTag() {
  const level = useSurface();
  return <span>useSurface() → {level}</span>;
}

function SurfaceLevelExample() {
  return (
    <Surface outline contentClassName="flex flex-col gap-2 p-4">
      <SurfaceLevelTag />
      <Surface outline contentClassName="flex flex-col gap-2 p-4">
        <SurfaceLevelTag />
        <Surface outline contentClassName="flex flex-col gap-2 p-4">
          <SurfaceLevelTag />
        </Surface>
      </Surface>
    </Surface>
  );
}`;

function SurfaceLevelTag() {
  const level = useSurface();
  return (
    <span>
      useSurface() → <span className="text-cladd-primary">{level}</span>
    </span>
  );
}

export function UseSurfaceExample() {
  return (
    <Example source={USE_SURFACE_SOURCE}>
      <Surface outline contentClassName="flex flex-col gap-2 p-4">
        <SurfaceLevelTag />
        <Surface outline contentClassName="flex flex-col gap-2 p-4">
          <SurfaceLevelTag />
          <Surface outline contentClassName="flex flex-col gap-2 p-4">
            <SurfaceLevelTag />
          </Surface>
        </Surface>
      </Surface>
    </Example>
  );
}

export function UseDeviceExample() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const device = useDevice() as unknown as Partial<Record<string, boolean>>;
  const flags = ['desktop', 'mobile', 'ios', 'android', 'iphone', 'ipad'];
  return (
    <Example source={EXAMPLE_SOURCE.UseDeviceExample}>
      <div className="flex flex-col items-center gap-4">
        <SectionTitle>Detected device</SectionTitle>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {flags.map((flag) => {
            const active = mounted && !!device[flag];
            return (
              <Chip
                key={flag}
                color={active ? 'green' : 'neutral'}
                variant={active ? 'solid' : 'transparent'}
              >
                {flag}
              </Chip>
            );
          })}
        </div>
        <span className="text-xs text-cladd-fg-soft">
          Read once from `navigator.userAgent`, then cached.
        </span>
      </div>
    </Example>
  );
}

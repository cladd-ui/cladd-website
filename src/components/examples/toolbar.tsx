import {
  Segmented,
  SegmentedButton,
  Surface,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
  Toolbar,
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
import { AlignCenterIcon } from '@/components/icons/AlignCenterIcon';
import { AlignLeftIcon } from '@/components/icons/AlignLeftIcon';
import { AlignRightIcon } from '@/components/icons/AlignRightIcon';
import { BoldIcon } from '@/components/icons/BoldIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { ItalicIcon } from '@/components/icons/ItalicIcon';
import { UnderlineIcon } from '@/components/icons/UnderlineIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/toolbar';

import { Example } from '../Example';

const ALIGNMENTS = ['left', 'center', 'right'] as const;
type Alignment = (typeof ALIGNMENTS)[number];

const ALIGNMENT_ICONS = {
  left: AlignLeftIcon,
  center: AlignCenterIcon,
  right: AlignRightIcon,
};

export function OverviewExample() {
  const [marks, setMarks] = useState<Record<string, boolean>>({
    bold: true,
    italic: false,
    underline: false,
  });
  const [align, setAlign] = useState<Alignment>('left');
  const toggle = (k: string) => setMarks((m) => ({ ...m, [k]: !m[k] }));
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <ExampleToolbar>
        <Tooltip tooltip="Bold">
          <ToolbarButton
            color={marks.bold ? 'brand' : undefined}
            variant={marks.bold ? 'gradient' : 'transparent'}
            outline={marks.bold}
            onClick={() => toggle('bold')}
            aria-label="Bold"
          >
            <BoldIcon />
          </ToolbarButton>
        </Tooltip>
        <Tooltip tooltip="Italic">
          <ToolbarButton
            color={marks.italic ? 'brand' : undefined}
            variant={marks.italic ? 'gradient' : 'transparent'}
            outline={marks.italic}
            onClick={() => toggle('italic')}
            aria-label="Italic"
          >
            <ItalicIcon />
          </ToolbarButton>
        </Tooltip>
        <Tooltip tooltip="Underline">
          <ToolbarButton
            color={marks.underline ? 'brand' : undefined}
            variant={marks.underline ? 'gradient' : 'transparent'}
            outline={marks.underline}
            onClick={() => toggle('underline')}
            aria-label="Underline"
          >
            <UnderlineIcon />
          </ToolbarButton>
        </Tooltip>
        <ToolbarSeparator />
        <Segmented>
          {ALIGNMENTS.map((a) => {
            const Icon = ALIGNMENT_ICONS[a];
            return (
              <SegmentedButton
                key={a}
                active={a === align}
                onClick={() => setAlign(a)}
                aria-label={a}
              >
                <Icon />
              </SegmentedButton>
            );
          })}
        </Segmented>
        <ToolbarSeparator />
        <ToolbarButton variant="gradient" color="green">
          <CheckIcon />
          Publish
        </ToolbarButton>
      </ExampleToolbar>
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
      <Toolbar size={size}>
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton>Publish</ToolbarButton>
      </Toolbar>
    </Example>
  );
}

export function VariantExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  const buttonVariant: SurfaceVariant = variant.endsWith('-fill')
    ? variant
    : 'transparent';
  return (
    <Example
      source={EXAMPLE_SOURCE.VariantExample}
      state={{ variant, buttonVariant }}
      controls={
        <ExampleToolbar>
          <ExampleControlVariant value={variant} onChange={setVariant} />
        </ExampleToolbar>
      }
    >
      <Toolbar variant={variant} buttonVariant={buttonVariant}>
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
      </Toolbar>
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
    >
      <Toolbar outline={outline}>
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
      </Toolbar>
    </Example>
  );
}

export function ColorExample() {
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      state={{ color }}
      controls={
        <ExampleToolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </ExampleToolbar>
      }
    >
      <Toolbar color={color}>
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton variant="gradient">
          <CheckIcon />
          Publish
        </ToolbarButton>
      </Toolbar>
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
    >
      <Toolbar rounded={rounded}>
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton>Publish</ToolbarButton>
      </Toolbar>
    </Example>
  );
}

export function ButtonStyleExample() {
  const [buttonVariant, setButtonVariant] =
    useState<SurfaceVariant>('transparent');
  const [buttonOutline, setButtonOutline] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.ButtonStyleExample}
      state={{ buttonVariant, buttonOutline }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlVariant
              value={buttonVariant}
              onChange={setButtonVariant}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="buttonOutline"
              checked={buttonOutline}
              onChange={setButtonOutline}
            />
          </ExampleToolbar>
        </>
      }
    >
      <Toolbar buttonVariant={buttonVariant} buttonOutline={buttonOutline}>
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
      </Toolbar>
    </Example>
  );
}

export function PerButtonOverrideExample() {
  return (
    <Example source={EXAMPLE_SOURCE.PerButtonOverrideExample}>
      <Toolbar>
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton color="red" variant="solid">
          Discard
        </ToolbarButton>
        <ToolbarButton color="brand" variant="gradient">
          <CheckIcon />
          Publish
        </ToolbarButton>
      </Toolbar>
    </Example>
  );
}

export function WithSeparatorExample() {
  return (
    <Example source={EXAMPLE_SOURCE.WithSeparatorExample}>
      <Toolbar>
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton>
          <AlignLeftIcon />
        </ToolbarButton>
        <ToolbarButton>
          <AlignCenterIcon />
        </ToolbarButton>
        <ToolbarButton>
          <AlignRightIcon />
        </ToolbarButton>
      </Toolbar>
    </Example>
  );
}

export function WithSegmentedExample() {
  const [align, setAlign] = useState<Alignment>('left');
  return (
    <Example source={EXAMPLE_SOURCE.WithSegmentedExample}>
      <Toolbar>
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        <Segmented>
          {ALIGNMENTS.map((a) => {
            const Icon = ALIGNMENT_ICONS[a];
            return (
              <SegmentedButton
                key={a}
                active={a === align}
                onClick={() => setAlign(a)}
                aria-label={a}
              >
                <Icon />
              </SegmentedButton>
            );
          })}
        </Segmented>
      </Toolbar>
    </Example>
  );
}

export function PlaygroundExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  const [color, setColor] = useState<Color>('neutral');
  const [size, setSize] = useState<ButtonSize>('md');
  const [outline, setOutline] = useState(true);
  const [rounded, setRounded] = useState(true);
  const [buttonVariant, setButtonVariant] =
    useState<SurfaceVariant>('transparent');
  const [buttonOutline, setButtonOutline] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{
        variant,
        color,
        size,
        outline,
        rounded,
        buttonVariant,
        buttonOutline,
      }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="rounded"
              checked={rounded}
              onChange={setRounded}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
          <div className="flex flex-wrap justify-center gap-2">
            <Surface
              className="w-fit rounded-2xl"
              contentClassName="flex flex-col items-center justify-center gap-1 p-2"
              outline
            >
              <span className="font-mono text-xs text-cladd-fg-soft">
                container
              </span>
              <ExampleToolbar>
                <ExampleControlVariant value={variant} onChange={setVariant} />
              </ExampleToolbar>
              <ExampleToolbar>
                <ExampleControlSwitch
                  label="outline"
                  checked={outline}
                  onChange={setOutline}
                />
              </ExampleToolbar>
            </Surface>
            <Surface
              className="w-fit rounded-2xl"
              contentClassName="flex flex-col items-center justify-center gap-1 p-2"
              outline
            >
              <span className="font-mono text-xs text-cladd-fg-soft">
                buttons
              </span>
              <ExampleToolbar>
                <ExampleControlVariant
                  value={buttonVariant}
                  onChange={setButtonVariant}
                />
              </ExampleToolbar>
              <ExampleToolbar>
                <ExampleControlSwitch
                  label="outline"
                  checked={buttonOutline}
                  onChange={setButtonOutline}
                />
              </ExampleToolbar>
            </Surface>
          </div>
        </>
      }
    >
      <Toolbar
        variant={variant}
        color={color}
        size={size}
        outline={outline}
        rounded={rounded}
        buttonVariant={buttonVariant}
        buttonOutline={buttonOutline}
      >
        <ToolbarButton>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton>
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton>Publish</ToolbarButton>
      </Toolbar>
    </Example>
  );
}

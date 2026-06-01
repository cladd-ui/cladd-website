import {
  Button,
  Checkbox,
  Chip,
  CloseIcon,
  cn,
  DropdownIcon,
  Input,
  Link,
  List,
  ListButton,
  ListSeparator,
  NumberField,
  NumberScrubber,
  OTPField,
  OTPFieldInput,
  Radio,
  SearchField,
  SectionTitle,
  Segmented,
  SegmentedButton,
  Select,
  Shortcut,
  Slider,
  Spinner,
  Surface,
  SurfaceCut,
  Switch,
  Textarea,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from '@cladd-ui/react';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

import { CladdLogo } from './CladdLogo';
import {
  componentHref,
  componentLabel,
  componentNames,
} from './componentNames';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { BoldIcon } from './icons/BoldIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ItalicIcon } from './icons/ItalicIcon';
import { UnderlineIcon } from './icons/UnderlineIcon';

function ChevronDownGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function ChevronRightGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

const PREVIEWS: Record<string, () => ReactNode> = {
  Accordion: () => (
    <div className="flex w-28 flex-col gap-1">
      <Surface
        outline
        variant="gradient"
        className="rounded-cladd-md"
        contentClassName="flex items-center justify-between px-2 py-1.5"
      >
        <span className="h-1 w-10 rounded-full bg-cladd-fg-softest" />
        <ChevronDownGlyph className="size-2.5 text-cladd-fg-softer" />
      </Surface>
      <div className="flex flex-col gap-1 px-2 pb-1">
        <span className="h-1 w-full rounded-full bg-cladd-fg-softest opacity-50" />
        <span className="h-1 w-3/4 rounded-full bg-cladd-fg-softest opacity-50" />
      </div>
      <Surface
        outline
        className="rounded-cladd-md"
        contentClassName="flex items-center justify-between px-2 py-1.5"
      >
        <span className="h-1 w-12 rounded-full bg-cladd-fg-softest" />
        <ChevronRightGlyph className="size-2.5 text-cladd-fg-softer" />
      </Surface>
    </div>
  ),
  Calendar: () => (
    <Surface
      outline
      className="rounded-cladd-xl"
      contentClassName="flex w-fit flex-col gap-1 p-2"
    >
      <div className="flex items-center justify-between">
        <ChevronRightGlyph className="size-3 rotate-180 text-cladd-fg-softer" />
        <span className="h-1 w-8 rounded-full bg-cladd-fg-softest" />
        <ChevronRightGlyph className="size-3 text-cladd-fg-softer" />
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'size-2 rounded-full',
              i === 16
                ? 'cladd-color-blue bg-cladd-primary'
                : 'bg-cladd-fg-softest opacity-50',
            )}
          />
        ))}
      </div>
    </Surface>
  ),
  Collapsible: () => (
    <div className="flex w-28 flex-col gap-1">
      <Surface
        outline
        variant="gradient"
        className="rounded-cladd-md"
        contentClassName="flex items-center justify-between px-2 py-1.5"
      >
        <span className="h-1 w-12 rounded-full bg-cladd-fg-softest" />
        <ChevronDownGlyph className="size-2.5 text-cladd-fg-softer" />
      </Surface>
      <SurfaceCut
        className="rounded-cladd-md"
        contentClassName="flex flex-col gap-1 p-2"
      >
        <span className="h-1 w-full rounded-full bg-cladd-fg-softest opacity-50" />
        <span className="h-1 w-2/3 rounded-full bg-cladd-fg-softest opacity-50" />
      </SurfaceCut>
    </div>
  ),
  ColorEditor: () => (
    <div className="flex w-24 flex-col gap-1">
      <Surface
        outline
        variant="gradient"
        className="relative h-12 overflow-hidden rounded-cladd-md"
      >
        <span className="absolute top-2 right-3 size-2 rounded-full ring-2 ring-cladd-fg-softest" />
      </Surface>
      <div className="flex h-2 overflow-hidden rounded-full bg-linear-90 from-transparent to-cladd-fg-softest" />
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={cn('size-2 rounded-full bg-cladd-fg-softest')}
          />
        ))}
      </div>
    </div>
  ),
  ColorPicker: () => (
    <Button
      readOnly
      outline
      className="pointer-events-none select-none"
      contentClassName="flex items-center gap-2 pr-1.5 "
    >
      <div className="size-4 rounded-cladd-2xs bg-[#ff0000]" />
      <span>#FF0000</span>
      <DropdownIcon className="ml-auto text-cladd-fg-softer" />
    </Button>
  ),
  DatePicker: () => (
    <Button
      readOnly
      outline
      className="pointer-events-none select-none"
      contentClassName="flex items-center gap-2 pr-1.5 "
    >
      <CalendarIcon className="text-cladd-fg-soft" />
      <span>May 15, 2026</span>
      <DropdownIcon className="ml-auto text-cladd-fg-softer" />
    </Button>
  ),
  Backdrop: () => (
    <div className="relative size-24 overflow-hidden rounded-cladd-md bg-cladd-surface-minus ring-1 ring-cladd-outline" />
  ),
  Button: () => (
    <Button className="pointer-events-none" readOnly>
      Save
    </Button>
  ),
  Checkbox: () => <Checkbox className="pointer-events-none" checked readOnly />,
  Chip: () => (
    <Chip color="blue" className="pointer-events-none">
      Draft
    </Chip>
  ),
  Dialog: () => (
    <Surface
      outline
      level={2}
      className="w-32 rounded-cladd-2xl"
      contentClassName="flex flex-col gap-1 p-4"
    >
      <span className="h-1.5 w-12 rounded-full bg-cladd-fg-softest" />
      <span className="h-1 w-16 rounded-full bg-cladd-fg-softest opacity-60" />
      <span className="h-1 w-14 rounded-full bg-cladd-fg-softest opacity-60" />
      <span className="mt-1 flex justify-end gap-1">
        <span className="h-3 w-6 rounded-cladd-sm bg-cladd-surface-prev" />
        <span className="h-3 w-7 rounded-cladd-sm bg-cladd-primary opacity-80" />
      </span>
    </Surface>
  ),
  Input: () => (
    <Input placeholder="Title" className="pointer-events-none w-32" readOnly />
  ),
  Link: () => (
    <Link as="span" className="pointer-events-none text-sm" readOnly>
      Open docs ↗
    </Link>
  ),
  List: () => (
    <Surface outline className="pointer-events-none w-28 rounded-3xl">
      <List>
        <ListButton readOnly selected>
          One
        </ListButton>
        <ListButton readOnly>Two</ListButton>
        <ListSeparator />
        <ListButton readOnly>Three</ListButton>
      </List>
    </Surface>
  ),
  NumberField: () => (
    <NumberField
      value={12}
      min={0}
      max={99}
      className="pointer-events-none w-32"
      readOnly
    />
  ),
  NumberScrubber: () => (
    <NumberScrubber
      value={48}
      min={0}
      max={100}
      className="pointer-events-none w-20"
      readOnly
    />
  ),
  OTPField: () => (
    <OTPField value="42" readOnly className="pointer-events-none gap-1">
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
    </OTPField>
  ),
  Popover: () => (
    <div className="flex flex-col items-center gap-1">
      <Surface
        outline
        level={3}
        className="rounded-cladd-2xl"
        contentClassName="flex flex-col gap-1 p-4"
      >
        <span className="h-1 w-16 rounded-full bg-cladd-fg-softest" />
        <span className="h-1 w-8 rounded-full bg-cladd-fg-softest opacity-60" />
        <span className="h-1 w-8 rounded-full bg-cladd-fg-softest opacity-60" />
        <span className="h-1 w-8 rounded-full bg-cladd-fg-softest opacity-60" />
      </Surface>
      <span className="mt-1 size-4 rotate-45 rounded-sm bg-cladd-surface-next ring-1 ring-cladd-outline" />
    </div>
  ),
  Popup: () => (
    <div className="flex flex-col items-end gap-1">
      <Surface
        outline
        level={3}
        contentClassName="py-1 px-2"
        className="mr-1 rounded-full"
      >
        <CloseIcon className="size-2" />
      </Surface>
      <Surface
        outline
        level={3}
        className="w-32 rounded-cladd-2xl"
        contentClassName="flex flex-col gap-1 p-4"
      >
        <span className="h-1 w-12 rounded-full bg-cladd-fg-softest" />
        <span className="h-1 w-10 rounded-full bg-cladd-fg-softest opacity-60" />
        <span className="h-1 w-14 rounded-full bg-cladd-fg-softest opacity-60" />
        <span className="h-1 w-10 rounded-full bg-cladd-fg-softest opacity-60" />
        <span className="h-1 w-14 rounded-full bg-cladd-fg-softest opacity-60" />
      </Surface>
    </div>
  ),
  Radio: () => <Radio className="pointer-events-none" checked readOnly />,
  SearchField: () => (
    <SearchField
      placeholder="Search…"
      size="lg"
      readOnly
      className="pointer-events-none w-32"
    />
  ),
  SectionTitle: () => <SectionTitle>Section</SectionTitle>,
  Segmented: () => (
    <Segmented className="pointer-events-none">
      <SegmentedButton active readOnly>
        A1
      </SegmentedButton>
      <SegmentedButton readOnly>B1</SegmentedButton>
      <SegmentedButton readOnly>C1</SegmentedButton>
    </Segmented>
  ),
  Select: () => (
    <Select
      value="md"
      options={['sm', 'md', 'lg']}
      onChange={() => {}}
      className="pointer-events-none w-20"
      readOnly
    >
      md
    </Select>
  ),
  Shortcut: () => <Shortcut>cmd K</Shortcut>,
  Slider: () => (
    <Slider
      defaultValue={55}
      className="pointer-events-none w-28"
      readOnly
      size="md"
    />
  ),
  Spinner: () => <Spinner size="lg" />,
  Surface: () => (
    <Surface
      outline
      level={1}
      className="rounded-cladd-2xl"
      contentClassName="flex items-center justify-center p-4"
    >
      <Surface
        outline
        className="rounded-cladd-xl"
        contentClassName="px-8 py-4"
      >
        <span className="flex w-12 justify-center font-mono text-xs whitespace-nowrap text-cladd-fg-soft">
          level 2
        </span>
      </Surface>
    </Surface>
  ),
  SurfaceCut: () => (
    <Surface
      outline
      level={2}
      className="rounded-cladd-2xl"
      contentClassName="flex items-center justify-center p-4"
    >
      <SurfaceCut
        outline
        className="rounded-cladd-xl"
        contentClassName="px-8 py-4"
      >
        <span className="flex w-12 justify-center font-mono text-xs text-cladd-fg-soft">
          recessed
        </span>
      </SurfaceCut>
    </Surface>
  ),
  Switch: () => (
    <Switch
      className="pointer-events-none"
      checked
      onChange={() => {}}
      readOnly
    />
  ),
  Tabs: () => (
    <div className="pointer-events-none flex w-28 flex-col gap-2">
      <Segmented>
        <SegmentedButton active readOnly>
          <span className="flex size-3 shrink-0 items-center justify-center">
            A
          </span>
        </SegmentedButton>
        <SegmentedButton readOnly>
          <span className="flex size-3 shrink-0 items-center justify-center">
            B
          </span>
        </SegmentedButton>
        <SegmentedButton readOnly>
          <span className="flex size-3 shrink-0 items-center justify-center">
            C
          </span>
        </SegmentedButton>
      </Segmented>
      <div className="flex flex-col gap-1 px-1">
        <span className="h-1 w-full rounded-full bg-cladd-fg-softest opacity-50" />
        <span className="h-1 w-3/4 rounded-full bg-cladd-fg-softest opacity-50" />
        <span className="h-1 w-2/3 rounded-full bg-cladd-fg-softest opacity-50" />
      </div>
    </div>
  ),
  Textarea: () => (
    <Textarea
      value="Hello"
      readOnly
      className="pointer-events-none w-28"
      inputClassName="!min-h-14"
    />
  ),
  Toast: () => (
    <Surface
      outline
      level={3}
      className="rounded-cladd-md"
      contentClassName="flex items-center gap-2 px-2 py-1.5"
    >
      <span className="cladd-color-green size-2 rounded-full bg-cladd-primary" />
      <span className="h-1 w-12 rounded-full bg-cladd-fg-softest" />
    </Surface>
  ),
  Toolbar: () => (
    <Toolbar className="pointer-events-none">
      <ToolbarButton readOnly>
        <BoldIcon className="size-3" />
      </ToolbarButton>
      <ToolbarButton readOnly>
        <ItalicIcon className="size-3" />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton readOnly>OK</ToolbarButton>
    </Toolbar>
  ),
  ToggleGroup: () => (
    <Segmented className="pointer-events-none">
      <SegmentedButton active readOnly className="font-bold">
        <BoldIcon className="size-3" />
      </SegmentedButton>
      <SegmentedButton active readOnly className="italic">
        <ItalicIcon className="size-3" />
      </SegmentedButton>
      <SegmentedButton readOnly className="underline">
        <UnderlineIcon className="size-3" />
      </SegmentedButton>
    </Segmented>
  ),
  Tooltip: () => (
    <div className="flex flex-col items-center gap-1">
      <Surface
        outline
        level={4}
        className="rounded-cladd-sm"
        contentClassName="px-4 py-1"
      >
        <span className="text-xs text-cladd-fg-soft">Tooltip</span>
      </Surface>
      <span className="mt-1 size-4 rotate-45 rounded-sm bg-cladd-surface-next ring-1 ring-cladd-outline" />
    </div>
  ),
  CladdProvider: () => <CladdLogo className="size-8 text-cladd-fg-softer" />,
};

function TileFallback({ name }: { name: string }) {
  return (
    <Chip size="sm" color="neutral">
      {name}
    </Chip>
  );
}

function Tile({ name }: { name: string }) {
  const renderPreview = PREVIEWS[name];
  const label = componentLabel(name);
  return (
    <Surface
      as={NextLink}
      href={componentHref(name)}
      outline
      variant="gradient"
      hoverable
      clickable
      className="group aspect-square rounded-cladd-2xl"
      contentClassName="flex flex-col items-stretch justify-between p-2"
      bgClassName="[&>div]:z-2"
    >
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        {renderPreview ? renderPreview() : <TileFallback name={label} />}
      </div>
      <div className="flex items-center justify-between gap-1 px-2 pt-2 pb-2 text-xs">
        <span className="truncate font-medium text-cladd-fg">{label}</span>
        <span className="text-cladd-fg-softest transition-colors group-hover:text-cladd-fg">
          <ArrowRightIcon />
        </span>
      </div>
    </Surface>
  );
}

interface ComponentTilesGridProps {
  className?: string;
}

export function ComponentTilesGrid({ className }: ComponentTilesGridProps) {
  return (
    <div
      className={cn(
        'not-prose grid gap-2',
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        className,
      )}
    >
      {componentNames.map((name) => (
        <Tile key={name} name={name} />
      ))}
    </div>
  );
}

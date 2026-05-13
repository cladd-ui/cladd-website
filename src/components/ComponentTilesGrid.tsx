import {
  Button,
  Checkbox,
  Chip,
  CloseIcon,
  cn,
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
import { componentHref, componentNames } from './componentNames';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { BoldIcon } from './icons/BoldIcon';
import { ItalicIcon } from './icons/ItalicIcon';

const PREVIEWS: Record<string, () => ReactNode> = {
  Backdrop: () => (
    <div className="relative size-24 overflow-hidden rounded-cladd-md bg-cladd-surface-minus ring-1 ring-cladd-outline" />
  ),
  Button: () => <Button readOnly>Save</Button>,
  Checkbox: () => <Checkbox defaultChecked readOnly />,
  Chip: () => (
    <Chip color="blue" outline>
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
  Input: () => <Input placeholder="Title" className="w-32" readOnly />,
  Link: () => (
    <Link as="span" className="text-sm" readOnly>
      Open docs ↗
    </Link>
  ),
  List: () => (
    <Surface outline className="w-28 rounded-3xl">
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
    <NumberField value={12} min={0} max={99} className="w-32" readOnly />
  ),
  NumberScrubber: () => (
    <NumberScrubber value={48} min={0} max={100} className="w-20" readOnly />
  ),
  OTPField: () => (
    <OTPField value="42" readOnly className="gap-1">
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
  Radio: () => <Radio defaultChecked readOnly />,
  SearchField: () => (
    <SearchField placeholder="Search…" size="lg" inset className="w-32" />
  ),
  SectionTitle: () => <SectionTitle>Section</SectionTitle>,
  Segmented: () => (
    <Segmented>
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
      className="w-20"
      readOnly
    >
      md
    </Select>
  ),
  Shortcut: () => <Shortcut>cmd K</Shortcut>,
  Slider: () => (
    <Slider defaultValue={55} className="w-28" readOnly size="md" />
  ),
  Spinner: () => <Spinner size="lg" />,
  Surface: () => (
    <Surface
      outline
      level={1}
      className="rounded-cladd-2xl"
      contentClassName="flex items-center justify-center p-4"
    >
      <Surface outline className="rounded-cladd-xl" contentClassName="px-8 py-4">
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
  Switch: () => <Switch checked onChange={() => {}} readOnly />,
  Textarea: () => (
    <Textarea
      value="Hello"
      readOnly
      className="w-28"
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
    <Toolbar>
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
    <Chip size="sm" outline color="neutral">
      {name}
    </Chip>
  );
}

function Tile({ name }: { name: string }) {
  const renderPreview = PREVIEWS[name];
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
        {renderPreview ? renderPreview() : <TileFallback name={name} />}
      </div>
      <div className="flex items-center justify-between gap-1 px-2 pt-2 pb-2 text-xs">
        <span className="truncate font-medium text-cladd-fg">{name}</span>
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

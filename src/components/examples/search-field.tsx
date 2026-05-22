import {
  Button,
  List,
  ListButton,
  ListItem,
  Popover,
  PopoverRoot,
  PopoverTrigger,
  SectionTitle,
  SearchField,
  Surface,
  type InputSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon';
import { NoteIcon } from '@/components/icons/NoteIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/search-field';

import { Example } from '../Example';

const SEARCH_FIELD_SIZES: readonly InputSize[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

const PROJECTS = [
  'acme-marketing',
  'acme-docs',
  'acme-api',
  'panel-prototype',
  'panel-shipping',
  'kanban-sketch',
  'inbox-rewrite',
  'studio-onboarding',
  'studio-billing',
  'studio-search-index',
  'editor-scrollbars',
  'editor-quick-open',
];

const COMMANDS = [
  { id: 'inbox', label: 'Open inbox', kbd: '1' },
  { id: 'drafts', label: 'Open drafts', kbd: '2' },
  { id: 'archive', label: 'Open archive', kbd: '3' },
  { id: 'new-project', label: 'New project', kbd: 'N' },
  { id: 'duplicate', label: 'Duplicate selection', kbd: 'D' },
  { id: 'invite', label: 'Invite teammates', kbd: 'I' },
  { id: 'logout', label: 'Sign out', kbd: 'Q' },
];

function matches(query: string, value: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

export function OverviewExample() {
  const [query, setQuery] = useState('');
  const filtered = PROJECTS.filter((p) => matches(query, p));
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <Surface outline className="w-72 rounded-3xl">
        <div className="max-h-72 overflow-auto">
          <Surface
            className="sticky top-0 z-20 rounded-t-cladd-popover"
            contentClassName="p-1.5"
            outline
          >
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder="Search projects"
            />
          </Surface>
          <List>
            {filtered.length === 0 ? (
              <ListItem className="text-cladd-fg-softer">No matches</ListItem>
            ) : (
              filtered.map((p) => (
                <ListButton key={p} icon={<NoteIcon />}>
                  {p}
                </ListButton>
              ))
            )}
          </List>
        </div>
      </Surface>
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<InputSize>('lg');
  const [query, setQuery] = useState('panel');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={SEARCH_FIELD_SIZES}
          />
        </ExampleToolbar>
      }
    >
      <Surface outline className="w-80 rounded-3xl">
        <Surface
          className="sticky top-0 z-20 rounded-t-cladd-popover"
          contentClassName="p-1.5"
          outline
        >
          <SearchField
            size={size}
            value={query}
            onChange={setQuery}
            placeholder="Search projects"
          />
        </Surface>
        <List>
          {PROJECTS.filter((p) => matches(query, p))
            .slice(0, 3)
            .map((p) => (
              <ListButton key={p} icon={<NoteIcon />}>
                {p}
              </ListButton>
            ))}
        </List>
      </Surface>
    </Example>
  );
}

export function InsetExample() {
  const [query, setQuery] = useState('');
  const filtered = COMMANDS.filter((c) => matches(query, c.label));
  return (
    <Example source={EXAMPLE_SOURCE.InsetExample} previewClassName="min-h-96">
      <PopoverRoot>
        <PopoverTrigger>
          <Button>Run command</Button>
        </PopoverTrigger>
        <Popover className="w-64" offset={8} closeOnBackdropClick={false}>
          <SectionTitle className="px-4 pt-4">Commands</SectionTitle>
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Filter commands"
            className="mx-2 mt-2 w-auto"
          />
          <List>
            {filtered.length === 0 ? (
              <ListItem className="text-cladd-fg-softer">No matches</ListItem>
            ) : (
              filtered.map((c) => (
                <ListButton
                  key={c.id}
                  after={
                    <span className="font-mono text-cladd-fg-softer">
                      {c.kbd}
                    </span>
                  }
                >
                  {c.label}
                </ListButton>
              ))
            )}
          </List>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<InputSize>('lg');
  const [inset, setInset] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = PROJECTS.filter((p) => matches(query, p));
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, inset }}
      previewClassName="min-h-80"
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={SEARCH_FIELD_SIZES}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="inset"
              checked={inset}
              onChange={setInset}
            />
          </ExampleToolbar>
        </>
      }
    >
      <Surface outline className="w-72 rounded-3xl">
        {inset && <SectionTitle className="px-4 pt-4">Search</SectionTitle>}
        {inset ? (
          <SearchField
            size={size}
            value={query}
            onChange={setQuery}
            placeholder="Search projects"
            className={'mx-2 mt-2 w-auto'}
          />
        ) : (
          <Surface
            className="sticky top-0 z-20 rounded-t-cladd-popover"
            contentClassName="p-1.5"
            outline
          >
            <SearchField
              size={size}
              value={query}
              onChange={setQuery}
              placeholder="Search projects"
            />
          </Surface>
        )}

        <List>
          {filtered.slice(0, 4).map((p) => (
            <ListButton key={p} icon={<EnvelopeIcon />}>
              {p}
            </ListButton>
          ))}
          {filtered.length === 0 && (
            <ListItem className="text-cladd-fg-softer">No matches</ListItem>
          )}
        </List>
      </Surface>
    </Example>
  );
}

import {
  Button,
  Chip,
  List,
  ListButton,
  ListItem,
  ListSeparator,
  ListTitle,
  Popover,
  PopoverRoot,
  PopoverTrigger,
  Surface,
  type ButtonSize,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { ArchiveIcon } from '@/components/icons/ArchiveIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { CopyIcon } from '@/components/icons/CopyIcon';
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon';
import { NoteIcon } from '@/components/icons/NoteIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/list';

import { Example } from '../Example';

export function OverviewExample() {
  const [selected, setSelected] = useState('inbox');
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <Surface outline className="w-72 rounded-3xl">
        <List>
          <ListTitle>Workspace</ListTitle>
          <ListButton
            icon={<EnvelopeIcon />}
            selected={selected === 'inbox'}
            onClick={() => setSelected('inbox')}
            after={<Chip color="brand">12</Chip>}
          >
            Inbox
          </ListButton>
          <ListButton
            icon={<NoteIcon />}
            selected={selected === 'drafts'}
            onClick={() => setSelected('drafts')}
          >
            Drafts
          </ListButton>
          <ListButton
            icon={<ArchiveIcon />}
            selected={selected === 'archive'}
            onClick={() => setSelected('archive')}
          >
            Archive
          </ListButton>
          <ListSeparator />
          <ListTitle>Storage</ListTitle>
          <ListItem>
            <span className="text-cladd-fg-soft">Used</span>
            <span className="ml-auto font-mono">4.2 / 10 GB</span>
          </ListItem>
          <ListSeparator />
          <ListButton icon={<PlusIcon />} color="brand">
            New project
          </ListButton>
        </List>
      </Surface>
    </Example>
  );
}

export function WithIconExample() {
  return (
    <Example source={EXAMPLE_SOURCE.WithIconExample}>
      <Surface outline className="w-64 rounded-3xl">
        <List>
          <ListButton icon={<PlusIcon />}>New file</ListButton>
          <ListButton icon={<CopyIcon />}>Duplicate</ListButton>
          <ListButton icon={<CheckIcon />}>Mark as done</ListButton>
        </List>
      </Surface>
    </Example>
  );
}

export function HeaderFooterExample() {
  return (
    <Example source={EXAMPLE_SOURCE.HeaderFooterExample}>
      <Surface outline className="w-80 rounded-3xl">
        <List>
          <ListButton
            icon={<CheckIcon />}
            header="Today, 09:14"
            footer="Reviewed by 3 people"
            after={<Chip color="green">Done</Chip>}
          >
            Ship onboarding redesign
          </ListButton>
          <ListButton
            icon={<CopyIcon />}
            header="Yesterday, 17:32"
            footer="Owner: Anna"
            after={<Chip color="yellow">In review</Chip>}
          >
            Migrate billing webhooks
          </ListButton>
          <ListButton
            icon={<PlusIcon />}
            header="2 days ago"
            footer="No assignee yet"
            after={<Chip color="neutral">Backlog</Chip>}
          >
            Draft Q3 retrospective notes
          </ListButton>
        </List>
      </Surface>
    </Example>
  );
}

export function SelectedExample() {
  const VIEWS = ['Overview', 'Members', 'Billing', 'Integrations'];
  const [active, setActive] = useState('Members');
  return (
    <Example source={EXAMPLE_SOURCE.SelectedExample}>
      <Surface outline className="w-64 rounded-3xl">
        <List>
          {VIEWS.map((v) => (
            <ListButton
              key={v}
              selected={v === active}
              color="brand"
              onClick={() => setActive(v)}
            >
              {v}
            </ListButton>
          ))}
        </List>
      </Surface>
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<ButtonSize>('lg');
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
      <Surface outline className="w-64 rounded-3xl">
        <List>
          <ListButton size={size} icon={<EnvelopeIcon />} selected>
            Inbox
          </ListButton>
          <ListButton size={size} icon={<NoteIcon />}>
            Drafts
          </ListButton>
          <ListButton size={size} icon={<ArchiveIcon />}>
            Archive
          </ListButton>
        </List>
      </Surface>
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
      <Surface outline className="w-64 rounded-3xl">
        <List>
          <ListButton icon={<CopyIcon />} color={color}>
            Duplicate
          </ListButton>
          <ListButton icon={<PlusIcon />} color={color} selected>
            Add to favorites
          </ListButton>
          <ListSeparator />
          <ListButton color="red">Delete project</ListButton>
        </List>
      </Surface>
    </Example>
  );
}

export function ListItemExample() {
  return (
    <Example source={EXAMPLE_SOURCE.ListItemExample}>
      <Surface outline className="w-72 rounded-3xl">
        <List>
          <ListTitle>Account</ListTitle>
          <ListItem>
            <span className="text-cladd-fg-soft">Plan</span>
            <span className="ml-auto">
              <Chip color="brand">Pro</Chip>
            </span>
          </ListItem>
          <ListItem>
            <span className="text-cladd-fg-soft">Seats</span>
            <span className="ml-auto font-mono">8 / 10</span>
          </ListItem>
          <ListItem>
            <span className="text-cladd-fg-soft">Renews</span>
            <span className="ml-auto">May 24, 2026</span>
          </ListItem>
          <ListSeparator />
          <ListButton icon={<CheckIcon />}>Manage billing</ListButton>
        </List>
      </Surface>
    </Example>
  );
}

export function InPopoverExample() {
  const [sort, setSort] = useState('updated');
  const OPTIONS: { id: string; label: string }[] = [
    { id: 'updated', label: 'Last updated' },
    { id: 'created', label: 'Date created' },
    { id: 'name', label: 'Name' },
    { id: 'size', label: 'Size' },
  ];
  return (
    <Example source={EXAMPLE_SOURCE.InPopoverExample}>
      <PopoverRoot>
        <PopoverTrigger>
          <Button>Sort by</Button>
        </PopoverTrigger>
        <Popover className="w-56" offset={8}>
          <List>
            <ListTitle>Sort by</ListTitle>
            {OPTIONS.map((o) => (
              <ListButton
                key={o.id}
                size="md"
                selected={sort === o.id}
                onClick={() => setSort(o.id)}
                after={sort === o.id ? <CheckIcon /> : undefined}
              >
                {o.label}
              </ListButton>
            ))}
            <ListSeparator />
            <ListButton size="md" icon={<PlusIcon />}>
              Add custom sort
            </ListButton>
          </List>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

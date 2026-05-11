import {
  Button,
  Chip,
  Select,
  Toolbar,
  type ButtonSize,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
} from '@/components/ExampleControls';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { NoteIcon } from '@/components/icons/NoteIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/select';

import { Example } from '../Example';

const SELECT_SIZES: readonly ButtonSize[] = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

// ---------------------------------------------------------------------------
// Shared option lists used across the examples below
// ---------------------------------------------------------------------------

const FRUITS = [
  'Apple',
  'Banana',
  'Cherry',
  'Mango',
  'Pineapple',
  'Strawberry',
];

const PRIORITIES = ['None', 'Low', 'Medium', 'High', 'Urgent'];

const VIEWS = ['List', 'Board', 'Timeline', 'Calendar'];

const COUNTRIES = [
  'Argentina',
  'Australia',
  'Brazil',
  'Canada',
  'Denmark',
  'Egypt',
  'Finland',
  'France',
  'Germany',
  'India',
  'Indonesia',
  'Italy',
  'Japan',
  'Kenya',
  'Mexico',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Spain',
  'Sweden',
  'Switzerland',
  'Ukraine',
  'United Kingdom',
  'United States',
];

interface Person {
  id: string;
  name: string;
  role: string;
  color: Color;
}

const PEOPLE: Person[] = [
  { id: 'anna', name: 'Anna Whittaker', role: 'Design lead', color: 'cyan' },
  { id: 'bo', name: 'Bo Lindgren', role: 'iOS engineer', color: 'purple' },
  { id: 'cara', name: 'Cara Mendes', role: 'PM', color: 'orange' },
  { id: 'dan', name: 'Dan Park', role: 'Backend engineer', color: 'green' },
  { id: 'evi', name: 'Evi Tanaka', role: 'Researcher', color: 'pink' },
];

const PRIORITY_COLOR: Record<string, Color> = {
  None: 'neutral',
  Low: 'cyan',
  Medium: 'yellow',
  High: 'orange',
  Urgent: 'red',
};

// ---------------------------------------------------------------------------

export function OverviewExample() {
  const [view, setView] = useState('Board');
  const [assigneeId, setAssigneeId] = useState('anna');
  const [labels, setLabels] = useState<string[]>(['Bug', 'Frontend']);
  const assignee = PEOPLE.find((p) => p.id === assigneeId);
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="flex-col gap-4"
      previewSurface
    >
      <Select
        className="w-64"
        title="Default view"
        options={VIEWS}
        value={view}
        onChange={(v) => setView(v as string)}
        icon={<NoteIcon />}
      />

      <Select
        className="w-64"
        title="Assignee"
        options={PEOPLE}
        value={assigneeId}
        getOptionValue={(p) => p.id}
        onChange={(v) => setAssigneeId(v as string)}
        renderOption={({ value }) => value.name}
        renderOptionInfo={({ value }) => value.role}
        optionIndicatorColor={({ value }) => value.color}
        color="brand"
        icon={
          <span
            className={`block size-2 shrink-0 rounded-full bg-cladd-primary cladd-color-${assignee?.color}`}
          />
        }
      >
        {assignee?.name}
      </Select>

      <Select
        className="w-64"
        multiple
        title="Labels"
        options={['Bug', 'Feature', 'Chore', 'Frontend', 'Backend', 'Docs']}
        value={labels}
        onChange={(v) => setLabels(v as string[])}
        placeholder="No labels"
        color="purple"
        multiline
      >
        {labels.length ? (
          <span className="flex flex-wrap gap-1">
            {labels.map((l) => (
              <Chip key={l} outline>
                {l}
              </Chip>
            ))}
          </span>
        ) : (
          'No labels'
        )}
      </Select>
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [value, setValue] = useState('Medium');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      previewSurface
      controls={
        <Toolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={SELECT_SIZES}
          />
        </Toolbar>
      }
    >
      <Select
        className="w-64"
        size={size}
        options={PRIORITIES}
        value={value}
        onChange={(v) => setValue(v as string)}
        title="Priority"
      />
    </Example>
  );
}

export function ColorExample() {
  const [color, setColor] = useState<Color>('brand');
  const [value, setValue] = useState('Board');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      state={{ color }}
      previewSurface
      controls={
        <Toolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </Toolbar>
      }
    >
      <Select
        className="w-64"
        color={color}
        indicatorColor={color}
        options={VIEWS}
        value={value}
        onChange={(v) => setValue(v as string)}
        title="Default view"
      />
    </Example>
  );
}

export function SurfaceExample() {
  const [a, setA] = useState('Medium');
  const [b, setB] = useState('Medium');
  return (
    <Example
      source={EXAMPLE_SOURCE.SurfaceExample}
      previewClassName="flex-col gap-4"
      previewSurface
    >
      <Select
        className="w-64"
        options={PRIORITIES}
        value={a}
        onChange={(v) => setA(v as string)}
        title="Priority"
      />
      <Select
        className="w-64"
        surface="cut"
        options={PRIORITIES}
        value={b}
        onChange={(v) => setB(v as string)}
        title="Priority"
      />
    </Example>
  );
}

export function MultipleExample() {
  const [labels, setLabels] = useState<string[]>(['Frontend', 'Bug']);
  return (
    <Example source={EXAMPLE_SOURCE.MultipleExample} previewSurface>
      <Select
        className="w-72"
        multiple
        title="Labels"
        options={[
          'Bug',
          'Feature',
          'Chore',
          'Frontend',
          'Backend',
          'Docs',
          'Design',
          'Infra',
        ]}
        value={labels}
        onChange={(v) => setLabels(v as string[])}
        placeholder="No labels"
        color="brand"
        indicatorColor="brand"
        multiline
      >
        {labels.length ? (
          <span className="flex flex-wrap gap-1">
            {labels.map((l) => (
              <Chip key={l} outline>
                {l}
              </Chip>
            ))}
          </span>
        ) : (
          'No labels'
        )}
      </Select>
    </Example>
  );
}

export function SearchExample() {
  const [country, setCountry] = useState('Japan');
  return (
    <Example source={EXAMPLE_SOURCE.SearchExample} previewSurface>
      <Select
        className="w-72"
        title="Country"
        options={COUNTRIES}
        value={country}
        onChange={(v) => setCountry(v as string)}
        search
        searchFocus
        searchPlaceholder="Search countries"
        keyboardHints={false}
        popoverClassName="w-64 max-h-80"
        onSearch={(q) =>
          COUNTRIES.filter((c) => c.toLowerCase().includes(q.toLowerCase()))
        }
      />
    </Example>
  );
}

export function KeyboardHintsExample() {
  const [priority, setPriority] = useState('None');
  return (
    <Example
      source={EXAMPLE_SOURCE.KeyboardHintsExample}
      previewSurface
      previewClassName="flex-col gap-4"
    >
      <Select
        className="w-64"
        title="Priority"
        options={PRIORITIES}
        value={priority}
        onChange={(v) => setPriority(v as string)}
        noneOptionValue="None"
        optionIndicatorColor={({ value }) => PRIORITY_COLOR[value]}
        color={priority === 'None' ? 'neutral' : PRIORITY_COLOR[priority]}
      />
      <p className="max-w-xs text-center text-cladd-fg-softer">
        Open the popover and press <kbd>0</kbd>–<kbd>4</kbd> to select.
        <br />
        <kbd>↑</kbd> / <kbd>↓</kbd> / <kbd>Tab</kbd> walk the list.
      </p>
    </Example>
  );
}

export function ObjectOptionsExample() {
  const [assigneeId, setAssigneeId] = useState('anna');
  const assignee = PEOPLE.find((p) => p.id === assigneeId);
  return (
    <Example source={EXAMPLE_SOURCE.ObjectOptionsExample} previewSurface>
      <Select
        className="w-72"
        title="Assignee"
        options={PEOPLE}
        value={assigneeId}
        getOptionValue={(p) => p.id}
        onChange={(v) => setAssigneeId(v as string)}
        renderOption={({ value }) => value.name}
        renderOptionInfo={({ value }) => value.role}
        optionIndicatorColor={({ value }) => value.color}
        icon={
          <span
            className={`block size-3 rounded-full bg-cladd-primary cladd-color-${assignee?.color}`}
          />
        }
      >
        {assignee?.name ?? 'Unassigned'}
      </Select>
    </Example>
  );
}

export function CustomRenderExample() {
  const [priority, setPriority] = useState('Medium');
  return (
    <Example source={EXAMPLE_SOURCE.CustomRenderExample} previewSurface>
      <Select
        className="w-64"
        title="Priority"
        options={PRIORITIES}
        value={priority}
        onChange={(v) => setPriority(v as string)}
        noneOptionValue="None"
        renderOption={({ value }) => (
          <span className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full bg-cladd-primary cladd-color-${PRIORITY_COLOR[value]}`}
            />
            {value}
          </span>
        )}
        optionIndicatorColor={({ value }) => PRIORITY_COLOR[value]}
        color={priority === 'None' ? 'neutral' : PRIORITY_COLOR[priority]}
      >
        <span className="flex items-center gap-2">
          <span
            className={`size-2 rounded-full bg-cladd-primary cladd-color-${PRIORITY_COLOR[priority]}`}
          />
          {priority}
        </span>
      </Select>
    </Example>
  );
}

const GROUPED_VIEWS = [
  { id: 'list', label: 'List', group: 'Project views' },
  { id: 'board', label: 'Board', group: 'Project views' },
  { id: 'timeline', label: 'Timeline', group: 'Project views' },
  { id: 'inbox', label: 'Inbox', group: 'Personal views' },
  { id: 'today', label: 'Today', group: 'Personal views' },
  { id: 'starred', label: 'Starred', group: 'Personal views' },
];

export function SectionsExample() {
  const [viewId, setViewId] = useState('board');
  const current = GROUPED_VIEWS.find((v) => v.id === viewId);
  return (
    <Example source={EXAMPLE_SOURCE.SectionsExample} previewSurface>
      <Select
        className="w-64"
        options={GROUPED_VIEWS}
        value={viewId}
        getOptionValue={(v) => v.id}
        onChange={(v) => setViewId(v as string)}
        renderOption={({ value }) => value.label}
        keyboardHints={false}
        renderBeforeOption={(value, index) => {
          const prev = index > 0 ? GROUPED_VIEWS[index - 1] : null;
          if (prev && prev.group === value.group) return null;
          return (
            <div className="px-2 pt-4 pb-1 text-cladd-xs font-medium tracking-wide text-cladd-fg-softer uppercase">
              {value.group}
            </div>
          );
        }}
        beforeOptions={
          <div className="px-4 pt-4 text-sm text-cladd-fg-soft">
            Pick where this task should land.
          </div>
        }
        afterOptions={
          <div className="border-t border-cladd-outline p-2">
            <Button
              variant="transparent"
              outline={false}
              className="w-full justify-start"
              contentClassName="gap-2"
              rounded
            >
              <PlusIcon /> New view…
            </Button>
          </div>
        }
      >
        {current?.label}
      </Select>
    </Example>
  );
}

export function StatesExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.StatesExample}
      previewClassName="flex-col gap-4 items-stretch content-center"
      previewSurface
    >
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-cladd-fg-softer">disabled</span>
        <Select
          className="w-64"
          disabled
          options={PRIORITIES}
          value="Medium"
          icon={<NoteIcon />}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-cladd-fg-softer">readOnly</span>
        <Select
          className="w-64"
          readOnly
          options={PRIORITIES}
          value="High"
          color="orange"
          icon={<CheckIcon />}
        />
      </div>
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [color, setColor] = useState<Color>('brand');
  const [rounded, setRounded] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [search, setSearch] = useState(false);
  const [keyboardHints, setKeyboardHints] = useState(true);
  const [single, setSingle] = useState('Cherry');
  const [many, setMany] = useState<string[]>(['Apple', 'Mango']);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, color, rounded, multiple, search, keyboardHints }}
      previewSurface
      controls={
        <>
          <Toolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={SELECT_SIZES}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="multiple"
              checked={multiple}
              onChange={setMultiple}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="search"
              checked={search}
              onChange={setSearch}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="keyboardHints"
              checked={keyboardHints}
              onChange={setKeyboardHints}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="rounded"
              checked={rounded}
              onChange={setRounded}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </Toolbar>
        </>
      }
    >
      <Select
        className="w-64"
        size={size}
        color={color}
        rounded={rounded}
        multiple={multiple}
        search={search}
        keyboardHints={keyboardHints}
        title="Fruit"
        options={FRUITS}
        value={multiple ? many : single}
        onChange={(v) =>
          multiple ? setMany(v as string[]) : setSingle(v as string)
        }
        onSearch={(q) =>
          FRUITS.filter((f) => f.toLowerCase().includes(q.toLowerCase()))
        }
        placeholder="Pick a fruit"
      >
        {multiple
          ? many.length
            ? many.join(', ')
            : 'Pick a few'
          : single || 'Pick one'}
      </Select>
    </Example>
  );
}

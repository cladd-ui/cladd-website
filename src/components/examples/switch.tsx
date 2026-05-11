import {
  Button,
  List,
  ListButton,
  ListSeparator,
  ListTitle,
  SectionTitle,
  Surface,
  Switch,
  type Color,
  type SwitchSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/switch';

import { Example } from '../Example';

const SWITCH_SIZES: readonly SwitchSize[] = ['sm', 'md'];

function SunIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="size-3"
    >
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1.5v1.5M8 13v1.5M1.5 8h1.5M13 8h1.5M3.2 3.2l1 1M11.8 11.8l1 1M3.2 12.8l1-1M11.8 4.2l1-1" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="size-3">
      <path d="M6 1.5a6.5 6.5 0 1 0 8.5 8.5 5 5 0 0 1-8.5-8.5z" />
    </svg>
  );
}

export function OverviewExample() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Switch checked={a} onChange={setA} />
      <Switch checked={b} onChange={setB} color="green" />
      <Switch checked={c} onChange={setC} color="purple" size="md" />
      <Switch checked disabled />
      <Switch checked readOnly color="red" />
      <Switch disabled />
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<SwitchSize>('md');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={SWITCH_SIZES}
          />
        </ExampleToolbar>
      }
      previewClassName="gap-8 content-center"
    >
      <Switch size={size} checked />
      <Switch size={size} />
    </Example>
  );
}

export function NestedSizeExample() {
  const [autosave, setAutosave] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.NestedSizeExample}
      previewClassName="flex-col gap-2 content-center"
    >
      <Button as="label" size="lg" rounded contentClassName="pl-1">
        <Switch
          as="span"
          size="sm"
          checked={autosave}
          onChange={setAutosave}
          color="brand"
        />
        Autosave drafts
      </Button>
      <Button as="label" size="lg" rounded contentClassName="pl-1">
        <Switch
          as="span"
          size="sm"
          checked={analytics}
          onChange={setAnalytics}
        />
        Share anonymous analytics
      </Button>
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
      previewClassName="gap-4 content-center"
    >
      <Switch checked color={color} size="sm" />
      <Switch checked color={color} />
    </Example>
  );
}

export function CustomIconExample() {
  const [dark, setDark] = useState(true);
  const [check, setCheck] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.CustomIconExample}
      previewClassName="gap-8 content-center"
    >
      <Switch
        size="md"
        checked={dark}
        onChange={setDark}
        color="purple"
        icon={(checked) => (checked ? <MoonIcon /> : <SunIcon />)}
      />
      <Switch
        size="md"
        checked={check}
        onChange={setCheck}
        color="brand"
        icon={
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3"
          >
            <path d="M3 8.5l3.5 3.5L13 4.5" />
          </svg>
        }
      />
    </Example>
  );
}

const SETTINGS = [
  { id: 'autosave', label: 'Autosave drafts every minute' },
  { id: 'realtime', label: 'Show collaborator cursors' },
  { id: 'compact', label: 'Compact density' },
  { id: 'spellcheck', label: 'Spell-check while typing' },
];

export function InListExample() {
  const [values, setValues] = useState<Record<string, boolean>>({
    autosave: true,
    realtime: true,
    compact: false,
    spellcheck: true,
  });
  const toggle = (id: string) =>
    setValues((prev) => ({ ...prev, [id]: !prev[id] }));
  return (
    <Example source={EXAMPLE_SOURCE.InListExample}>
      <Surface outline className="w-80 rounded-3xl">
        <List>
          <ListTitle>Editor</ListTitle>
          {SETTINGS.map((s) => (
            <ListButton
              key={s.id}
              as="label"
              after={
                <Switch
                  as="span"
                  checked={values[s.id]}
                  onChange={() => toggle(s.id)}
                />
              }
            >
              {s.label}
            </ListButton>
          ))}
          <ListSeparator />
          <ListButton
            onClick={() =>
              setValues({
                autosave: true,
                realtime: true,
                compact: false,
                spellcheck: true,
              })
            }
          >
            Reset to defaults
          </ListButton>
        </List>
      </Surface>
    </Example>
  );
}

const APPEARANCE = [
  {
    id: 'dark',
    label: 'Dark mode',
    description: 'Switch the workspace chrome to the dark palette.',
  },
  {
    id: 'motion',
    label: 'Reduce motion',
    description: 'Trim transitions and parallax across the app.',
  },
];

const NOTIFICATIONS = [
  {
    id: 'mentions',
    label: 'Mentions',
    description: 'Email me when a teammate @mentions me in a comment.',
  },
  {
    id: 'digest',
    label: 'Weekly digest',
    description: 'A Monday summary of activity across your workspaces.',
  },
  {
    id: 'releases',
    label: 'Release notes',
    description: 'Announcements for new cladd versions and breaking changes.',
  },
];

export function SettingsPanelExample() {
  const [values, setValues] = useState<Record<string, boolean>>({
    dark: true,
    motion: false,
    mentions: true,
    digest: true,
    releases: false,
  });
  const toggle = (id: string) =>
    setValues((prev) => ({ ...prev, [id]: !prev[id] }));
  return (
    <Example
      source={EXAMPLE_SOURCE.SettingsPanelExample}
      previewClassName="content-center"
    >
      <Surface
        outline
        className="w-96 rounded-3xl"
        contentClassName="flex flex-col gap-8 p-4"
      >
        <div className="flex flex-col gap-2">
          <SectionTitle>Appearance</SectionTitle>
          {APPEARANCE.map((row) => (
            <label
              key={row.id}
              className="flex cursor-pointer items-start gap-4 px-2"
            >
              <div className="flex-1">
                <div className="text-cladd-fg">{row.label}</div>
                <div className="text-cladd-fg-soft">{row.description}</div>
              </div>
              <Switch
                as="span"
                checked={values[row.id]}
                onChange={() => toggle(row.id)}
                color="brand"
                className="mt-1"
              />
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <SectionTitle>Notifications</SectionTitle>
          {NOTIFICATIONS.map((row) => (
            <label
              key={row.id}
              className="flex cursor-pointer items-start gap-4 px-2"
            >
              <div className="flex-1">
                <div className="text-cladd-fg">{row.label}</div>
                <div className="text-cladd-fg-soft">{row.description}</div>
              </div>
              <Switch
                as="span"
                checked={values[row.id]}
                onChange={() => toggle(row.id)}
                color="brand"
                className="mt-1"
              />
            </label>
          ))}
        </div>
      </Surface>
    </Example>
  );
}

export function StatesExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.StatesExample}
      previewClassName="flex-col gap-2 content-center items-start"
    >
      <label className="flex items-center gap-2">
        <Switch as="span" checked disabled />
        <span className="text-cladd-fg-soft">Disabled, on</span>
      </label>
      <label className="flex items-center gap-2">
        <Switch as="span" disabled />
        <span className="text-cladd-fg-soft">Disabled, off</span>
      </label>
      <label className="flex items-center gap-2">
        <Switch as="span" checked readOnly color="red" />
        <span className="text-cladd-fg-soft">Read-only (locked on)</span>
      </label>
      <label className="flex items-center gap-2">
        <Switch as="span" readOnly />
        <span className="text-cladd-fg-soft">Read-only (locked off)</span>
      </label>
    </Example>
  );
}

export function PlaygroundExample() {
  const [checked, setChecked] = useState(true);
  const [size, setSize] = useState<SwitchSize>('md');
  const [color, setColor] = useState<Color>('brand');
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ checked, size, color, disabled, readOnly }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={SWITCH_SIZES}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="checked"
              checked={checked}
              onChange={setChecked}
            />
            <ExampleControlSwitch
              label="disabled"
              checked={disabled}
              onChange={setDisabled}
            />
            <ExampleControlSwitch
              label="readOnly"
              checked={readOnly}
              onChange={setReadOnly}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      <Switch
        checked={checked}
        onChange={setChecked}
        size={size}
        color={color}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Example>
  );
}

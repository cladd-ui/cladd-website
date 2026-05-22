import {
  Button,
  List,
  ListButton,
  ListSeparator,
  ListTitle,
  Radio,
  Surface,
  type Color,
  type RadioSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/radio';

import { Example } from '../Example';

const RADIO_SIZES: readonly RadioSize[] = ['xs', 'sm', 'md'];

export function OverviewExample() {
  const [pick, setPick] = useState('b');
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Radio checked={pick === 'a'} onChange={() => setPick('a')} />
      <Radio
        checked={pick === 'b'}
        onChange={() => setPick('b')}
        color="green"
      />
      <Radio
        checked={pick === 'c'}
        onChange={() => setPick('c')}
        color="purple"
        size="md"
      />
      <Radio checked disabled />
      <Radio checked readOnly color="red" />
      <Radio disabled />
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<RadioSize>('md');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={RADIO_SIZES}
          />
        </ExampleToolbar>
      }
      previewClassName="gap-8 content-center"
    >
      <Radio size={size} checked />
      <Radio size={size} />
    </Example>
  );
}

export function NestedSizeExample() {
  const [size, setSize] = useState<RadioSize>('md');
  const [theme, setTheme] = useState('system');
  return (
    <Example
      source={EXAMPLE_SOURCE.NestedSizeExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={RADIO_SIZES}
          />
        </ExampleToolbar>
      }
      previewClassName="flex-col gap-2 content-center"
    >
      <Button as="label" size={size} variant="transparent">
        <Radio
          as="span"
          size={size}
          name="theme-nested"
          checked={theme === 'system'}
          onChange={() => setTheme('system')}
          color="brand"
        />
        Match system
      </Button>
      <Button as="label" size={size} variant="transparent">
        <Radio
          as="span"
          size={size}
          name="theme-nested"
          checked={theme === 'light'}
          onChange={() => setTheme('light')}
        />
        Always light
      </Button>
      <Button as="label" size={size} variant="transparent">
        <Radio
          as="span"
          size={size}
          name="theme-nested"
          checked={theme === 'dark'}
          onChange={() => setTheme('dark')}
        />
        Always dark
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
      <Radio checked color={color} size="md" />
      <Radio checked color={color} />
    </Example>
  );
}

const VIEWS = [
  { id: 'list', label: 'List' },
  { id: 'board', label: 'Board' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'calendar', label: 'Calendar' },
];

export function InListExample() {
  const [view, setView] = useState('board');
  return (
    <Example source={EXAMPLE_SOURCE.InListExample}>
      <Surface outline className="w-64 rounded-3xl">
        <List>
          <ListTitle>Default view</ListTitle>
          {VIEWS.map((v) => (
            <ListButton
              key={v.id}
              as="label"
              icon={
                <Radio
                  as="span"
                  name="default-view"
                  checked={view === v.id}
                  onChange={() => setView(v.id)}
                />
              }
            >
              {v.label}
            </ListButton>
          ))}
          <ListSeparator />
          <ListButton onClick={() => setView('board')}>
            Reset to default
          </ListButton>
        </List>
      </Surface>
    </Example>
  );
}

const PLANS = [
  {
    id: 'hobby',
    label: 'Hobby',
    price: 'Free',
    description: 'Personal projects and side experiments.',
  },
  {
    id: 'pro',
    label: 'Pro',
    price: '$12 / mo',
    description: 'Solo founders and small teams shipping production apps.',
  },
  {
    id: 'team',
    label: 'Team',
    price: '$48 / mo',
    description: 'Shared workspaces, SSO, and priority support.',
  },
];

export function FormGroupExample() {
  const [plan, setPlan] = useState('pro');
  return (
    <Example
      source={EXAMPLE_SOURCE.FormGroupExample}
      previewClassName="content-center"
    >
      <form
        className="flex w-96 flex-col gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        {PLANS.map((p) => (
          <Surface
            key={p.id}
            as="label"
            outline
            hoverable
            clickable
            variant={plan === p.id ? 'gradient' : 'transparent'}
            className="cursor-pointer rounded-2xl"
            contentClassName="flex items-start gap-4 p-4"
          >
            <Radio
              as="span"
              name="plan"
              value={p.id}
              checked={plan === p.id}
              onChange={() => setPlan(p.id)}
              color="brand"
              className="mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-cladd-fg">{p.label}</span>
                <span className="font-mono text-cladd-fg-soft">{p.price}</span>
              </div>
              <p className="mt-1 text-cladd-fg-soft">{p.description}</p>
            </div>
          </Surface>
        ))}
      </form>
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
        <Radio as="span" checked disabled />
        <span className="text-cladd-fg-soft">Disabled, selected</span>
      </label>
      <label className="flex items-center gap-2">
        <Radio as="span" disabled />
        <span className="text-cladd-fg-soft">Disabled, unselected</span>
      </label>
      <label className="flex items-center gap-2">
        <Radio as="span" checked readOnly color="red" />
        <span className="text-cladd-fg-soft">Read-only (locked)</span>
      </label>
      <label className="flex items-center gap-2">
        <Radio as="span" required />
        <span className="text-cladd-fg-soft">Required</span>
      </label>
    </Example>
  );
}

export function PlaygroundExample() {
  const [checked, setChecked] = useState(true);
  const [size, setSize] = useState<RadioSize>('md');
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
              sizes={RADIO_SIZES}
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
      <Radio
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

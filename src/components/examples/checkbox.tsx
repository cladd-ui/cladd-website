import {
  Button,
  Checkbox,
  Input,
  List,
  ListButton,
  ListSeparator,
  ListTitle,
  Surface,
  type CheckboxSize,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/checkbox';

import { Example } from '../Example';

const CHECKBOX_SIZES: readonly CheckboxSize[] = ['xs', 'sm', 'md'];

export function OverviewExample() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="gap-4 flex-wrap content-center"
    >
      <Checkbox checked={a} onChange={setA} />
      <Checkbox checked={b} onChange={setB} color="green" />
      <Checkbox checked={c} onChange={setC} color="purple" size="md" />
      <Checkbox checked disabled />
      <Checkbox checked readOnly color="red" />
      <Checkbox disabled />
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<CheckboxSize>('md');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={CHECKBOX_SIZES}
          />
        </ExampleToolbar>
      }
      previewClassName="gap-8 content-center"
    >
      <Checkbox size={size} checked />
      <Checkbox size={size} />
    </Example>
  );
}

export function NestedSizeExample() {
  const [size, setSize] = useState<CheckboxSize>('md');
  const [agree, setAgree] = useState(true);
  const [remember, setRemember] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.NestedSizeExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={CHECKBOX_SIZES}
          />
        </ExampleToolbar>
      }
      previewClassName="flex-col gap-2 content-center"
    >
      <Button as="label" size={size} variant="transparent">
        <Checkbox
          as="span"
          size={size}
          checked={agree}
          onChange={setAgree}
          color="brand"
        />
        Subscribe to release notes
      </Button>
      <Button as="label" size={size} variant="transparent">
        <Checkbox
          as="span"
          size={size}
          checked={remember}
          onChange={setRemember}
        />
        Remember this device
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
      <Checkbox checked color={color} size="md" />
      <Checkbox checked color={color} />
    </Example>
  );
}

const FILTERS = [
  { id: 'open', label: 'Open' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'in-review', label: 'In review' },
  { id: 'done', label: 'Done' },
  { id: 'archived', label: 'Archived' },
];

export function InListExample() {
  const [selected, setSelected] = useState<string[]>(['open', 'in-progress']);
  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  return (
    <Example source={EXAMPLE_SOURCE.InListExample}>
      <Surface outline className="w-64 rounded-3xl">
        <List>
          <ListTitle>Filter by status</ListTitle>
          {FILTERS.map((f) => (
            <ListButton
              key={f.id}
              as="label"
              icon={
                <Checkbox
                  as="span"
                  checked={selected.includes(f.id)}
                  onChange={() => toggle(f.id)}
                />
              }
            >
              {f.label}
            </ListButton>
          ))}
          <ListSeparator />
          <ListButton onClick={() => setSelected([])}>Clear filters</ListButton>
        </List>
      </Surface>
    </Example>
  );
}

export function InlineFormExample() {
  const [email, setEmail] = useState('anna@acme.studio');
  const [subscribe, setSubscribe] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.InlineFormExample}
      previewClassName="flex-col gap-4 content-center"
    >
      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          className="w-64"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />
        <Button as="label" variant="transparent">
          <Checkbox
            as="span"
            checked={subscribe}
            onChange={setSubscribe}
            color="brand"
          />
          Weekly digest
        </Button>
        <Button type="submit" color="brand" variant="gradient">
          Subscribe
        </Button>
      </form>
    </Example>
  );
}

export function InlineInTextExample() {
  const [accepted, setAccepted] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.InlineInTextExample}
      previewClassName="content-center"
    >
      <label className="flex max-w-md cursor-pointer items-start gap-2 leading-relaxed text-cladd-fg-soft">
        <Checkbox
          as="span"
          checked={accepted}
          onChange={setAccepted}
          className="mt-0.5"
        />
        <span>
          I agree to the{' '}
          <a href="#" className="text-cladd-primary hover:underline">
            terms of service
          </a>{' '}
          and the{' '}
          <a href="#" className="text-cladd-primary hover:underline">
            privacy policy
          </a>
          , and consent to receive product updates at the email above.
        </span>
      </label>
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
        <Checkbox as="span" checked disabled />
        <span className="text-cladd-fg-soft">Disabled, checked</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox as="span" disabled />
        <span className="text-cladd-fg-soft">Disabled, unchecked</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox as="span" checked readOnly color="red" />
        <span className="text-cladd-fg-soft">Read-only (locked)</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox as="span" required />
        <span className="text-cladd-fg-soft">Required</span>
      </label>
    </Example>
  );
}

export function PlaygroundExample() {
  const [checked, setChecked] = useState(true);
  const [size, setSize] = useState<CheckboxSize>('md');
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
              sizes={CHECKBOX_SIZES}
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
      <Checkbox
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

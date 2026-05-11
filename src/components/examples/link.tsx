import { Link, Surface, Toolbar, type Color } from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSwitch,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/link';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="gap-8 flex-wrap content-center"
    >
      <Link color="brand">Forgot password?</Link>
      <Link>Edit profile</Link>
      <Link color="red">Cancel subscription</Link>
      <Link
        as="a"
        color="cyan"
        href="https://cladd.io/"
        target="_blank"
        rel="noreferrer"
      >
        Read the docs
      </Link>
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
        <Toolbar>
          <ExampleControlColor value={color} onChange={setColor} />
        </Toolbar>
      }
    >
      <Link color={color}>Continue with {color}</Link>
    </Example>
  );
}

export function InlineExample() {
  return (
    <Example source={EXAMPLE_SOURCE.InlineExample}>
      <Surface
        outline
        className="max-w-96 rounded-2xl"
        contentClassName="p-4 text-cladd-fg-soft leading-relaxed"
      >
        You're signed in as{' '}
        <span className="text-cladd-fg">vladimir@cladd.io</span>.{' '}
        <Link color="brand">Switch account</Link> or{' '}
        <Link color="red">sign out</Link> when you're done.
      </Surface>
    </Example>
  );
}

export function PolymorphicExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.PolymorphicExample}
      previewClassName="gap-8 flex-wrap content-center"
    >
      <Link onClick={() => {}}>button (default)</Link>
      <Link href="/react/components/button/">anchor (href)</Link>
      <Link
        as="a"
        href="https://cladd.io/"
        target="_blank"
        rel="noreferrer"
        color="brand"
      >
        as="a"
      </Link>
    </Example>
  );
}

export function DisabledExample() {
  const [disabled, setDisabled] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <Example
      source={EXAMPLE_SOURCE.DisabledExample}
      state={{ disabled }}
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="disabled"
            checked={disabled}
            onChange={(v) => {
              setDisabled(v);
              setCount(0);
            }}
          />
        </Toolbar>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <Link
          color="brand"
          disabled={disabled}
          onClick={() => setCount((c) => c + 1)}
        >
          Resend verification email
        </Link>
        <span className="font-mono text-cladd-fg-softer">clicks: {count}</span>
      </div>
    </Example>
  );
}

export function ReadOnlyExample() {
  const [readOnly, setReadOnly] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <Example
      source={EXAMPLE_SOURCE.ReadOnlyExample}
      state={{ readOnly }}
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="readOnly"
            checked={readOnly}
            onChange={(v) => {
              setReadOnly(v);
              setCount(0);
            }}
          />
        </Toolbar>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <Link
          color="brand"
          readOnly={readOnly}
          onClick={() => setCount((c) => c + 1)}
        >
          Resend verification email
        </Link>
        <span className="font-mono text-cladd-fg-softer">clicks: {count}</span>
      </div>
    </Example>
  );
}

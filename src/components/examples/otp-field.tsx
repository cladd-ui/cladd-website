import {
  Button,
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
  Toolbar,
  type InputSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlSize,
  ExampleControlSwitch,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/otp-field';

import { Example } from '../Example';

const OTP_SIZES: readonly InputSize[] = ['sm', 'md', 'lg', 'xl', '2xl'];

export function OverviewExample() {
  const [a, setA] = useState('');
  const [b, setB] = useState('042');
  const [c, setC] = useState('A7K9');
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewSurface
      previewClassName="flex-col gap-6 content-center"
    >
      <OTPField maxLength={6} value={a} onChange={setA} />
      <OTPField value={b} onChange={setB} size="md">
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldSeparator />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
      </OTPField>
      <OTPField
        maxLength={4}
        value={c}
        onChange={setC}
        pattern="[A-Za-z0-9]"
        inputMode="text"
        size="md"
      />
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<InputSize>('lg');
  const [value, setValue] = useState('042');
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
            sizes={OTP_SIZES}
          />
        </Toolbar>
      }
      previewClassName="content-center"
    >
      <OTPField maxLength={6} size={size} value={value} onChange={setValue} />
    </Example>
  );
}

export function GroupingExample() {
  const [flat, setFlat] = useState('123456');
  const [card, setCard] = useState('4242 4242');
  const [license, setLicense] = useState('ACME19');
  return (
    <Example
      source={EXAMPLE_SOURCE.GroupingExample}
      previewSurface
      previewClassName="flex-col gap-6 content-center"
    >
      <OTPField maxLength={6} size="md" value={flat} onChange={setFlat} />
      <OTPField size="md" value={card} onChange={setCard}>
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldSeparator>
          <span className="px-1 font-mono text-cladd-fg-softer">/</span>
        </OTPFieldSeparator>
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
      </OTPField>
      <OTPField
        size="md"
        value={license}
        onChange={setLicense}
        pattern="[A-Z0-9]"
        inputMode="text"
      >
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldSeparator>
          <span className="px-1 font-mono text-cladd-fg-softer">·</span>
        </OTPFieldSeparator>
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
      </OTPField>
    </Example>
  );
}

export function PlaceholderExample() {
  const [dot, setDot] = useState('');
  const [bullet, setBullet] = useState('');
  const [dash, setDash] = useState('42');
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaceholderExample}
      previewSurface
      previewClassName="flex-col gap-6 content-center"
    >
      <OTPField size="md" value={dot} onChange={setDot}>
        {Array.from({ length: 6 }).map((_, i) => (
          <OTPFieldInput key={i} placeholder="·" />
        ))}
      </OTPField>
      <OTPField size="md" value={bullet} onChange={setBullet}>
        {Array.from({ length: 6 }).map((_, i) => (
          <OTPFieldInput key={i} placeholder="•" />
        ))}
      </OTPField>
      <OTPField size="md" value={dash} onChange={setDash}>
        {Array.from({ length: 6 }).map((_, i) => (
          <OTPFieldInput key={i} placeholder="—" />
        ))}
      </OTPField>
    </Example>
  );
}

export function PatternExample() {
  const [digits, setDigits] = useState('');
  const [alpha, setAlpha] = useState('');
  const [upper, setUpper] = useState('');
  return (
    <Example
      source={EXAMPLE_SOURCE.PatternExample}
      previewSurface
      previewClassName="flex-col gap-6 content-center"
    >
      <OTPField
        maxLength={6}
        size="md"
        value={digits}
        onChange={setDigits}
        pattern="[0-9]"
      />
      <OTPField
        maxLength={6}
        size="md"
        value={alpha}
        onChange={setAlpha}
        pattern="[A-Za-z0-9]"
        inputMode="text"
      />
      <OTPField
        maxLength={6}
        size="md"
        value={upper}
        onChange={(next) => setUpper(next.toUpperCase())}
        pattern="[A-Z]"
        inputMode="text"
      />
    </Example>
  );
}

export function StatesExample() {
  const [invalid, setInvalid] = useState('128');
  return (
    <Example
      source={EXAMPLE_SOURCE.StatesExample}
      previewSurface
      previewClassName="flex-col gap-6 content-center"
    >
      <OTPField
        maxLength={6}
        size="md"
        value={invalid}
        onChange={setInvalid}
        valid={false}
      />
      <OTPField maxLength={6} size="md" value="000000" disabled />
      <OTPField maxLength={6} size="md" value="918273" readOnly />
    </Example>
  );
}

export function PlaygroundExample() {
  const [value, setValue] = useState('042');
  const [size, setSize] = useState<InputSize>('lg');
  const [length, setLength] = useState(6);
  const [alphanumeric, setAlphanumeric] = useState(false);
  const [valid, setValid] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const pattern = alphanumeric ? '[A-Za-z0-9]' : '[0-9]';
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      previewSurface
      state={{
        size,
        maxLength: length,
        pattern,
        inputMode: alphanumeric ? 'text' : 'numeric',
        valid,
        disabled,
        readOnly,
      }}
      controls={
        <>
          <Toolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={OTP_SIZES}
            />
          </Toolbar>
          <Toolbar>
            {[4, 6, 8].map((n) => (
              <Button
                key={n}
                size="sm"
                rounded
                variant={length === n ? 'gradient' : 'transparent'}
                onClick={() => setLength(n)}
              >
                {n} cells
              </Button>
            ))}
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="alphanumeric"
              checked={alphanumeric}
              onChange={setAlphanumeric}
            />
            <ExampleControlSwitch
              label="valid"
              checked={valid}
              onChange={setValid}
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
          </Toolbar>
        </>
      }
    >
      <OTPField
        size={size}
        maxLength={length}
        pattern={pattern}
        inputMode={alphanumeric ? 'text' : 'numeric'}
        value={value}
        onChange={setValue}
        valid={valid}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Example>
  );
}

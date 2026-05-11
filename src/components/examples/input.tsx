import {
  Chip,
  Input,
  Spinner,
  Toolbar,
  type Color,
  type InputSize,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
} from '@/components/ExampleControls';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon';
import { NoteIcon } from '@/components/icons/NoteIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/input';

import { Example } from '../Example';

const INPUT_SIZES: readonly InputSize[] = ['sm', 'md', 'lg', 'xl', '2xl'];

export function OverviewExample() {
  const [name, setName] = useState('Anna Whittaker');
  const [email, setEmail] = useState('anna@acme.studio');
  const [slug, setSlug] = useState('acme-marketing');
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState('1234.56');
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="flex-col gap-4"
      previewSurface
    >
      <Input
        className="w-80"
        value={name}
        onChange={setName}
        placeholder="Full name"
        infoMessage="Your display name"
      />
      <Input
        className="w-80"
        type="email"
        icon={<EnvelopeIcon />}
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
      />
      <Input
        className="w-80"
        value={slug}
        onChange={setSlug}
        placeholder="URL slug"
        prefix={<span className="ml-2 text-cladd-fg-softer">cladd.io/</span>}
        inputClassName="pl-1"
        suffix={
          <Chip size="sm" color="green" outline className="mr-2">
            available
          </Chip>
        }
      />
      <Input
        className="w-80"
        value={search}
        onChange={setSearch}
        placeholder="Search projects"
        clearButton
        onClear={() => setSearch('')}
      />
      <Input
        className="w-80"
        value={amount}
        type="number"
        onChange={setAmount}
        displayValue={`$${Number(amount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })}`}
        prefix={<span className="ml-2 text-cladd-fg-softer">USD</span>}
        inputClassName="text-right justify-end"
      />
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<InputSize>('lg');
  const [value, setValue] = useState('cladd');
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
            sizes={INPUT_SIZES}
          />
        </Toolbar>
      }
    >
      <Input
        className="w-80"
        size={size}
        value={value}
        onChange={setValue}
        placeholder="Project name"
      />
    </Example>
  );
}

export function IconExample() {
  const [size, setSize] = useState<InputSize>('lg');
  const [value, setValue] = useState('anna@acme.studio');
  return (
    <Example
      source={EXAMPLE_SOURCE.IconExample}
      state={{ size }}
      previewSurface
      controls={
        <Toolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={INPUT_SIZES}
          />
        </Toolbar>
      }
    >
      <Input
        className="w-80"
        size={size}
        type="email"
        icon={<EnvelopeIcon />}
        value={value}
        onChange={setValue}
        placeholder="you@example.com"
      />
    </Example>
  );
}

export function PrefixSuffixExample() {
  const [size, setSize] = useState<InputSize>('lg');
  const [domain, setDomain] = useState('acme');
  const [pending, setPending] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.PrefixSuffixExample}
      state={{ size, pending }}
      previewSurface
      controls={
        <>
          <Toolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={INPUT_SIZES}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="checking"
              checked={pending}
              onChange={setPending}
            />
          </Toolbar>
        </>
      }
      previewClassName="flex-col gap-4"
    >
      <Input
        className="w-80"
        size={size}
        value={domain}
        onChange={setDomain}
        placeholder="subdomain"
        prefix={<span className="ml-2 text-cladd-fg-softer">https://</span>}
        suffix={<span className="mr-2 text-cladd-fg-softer">.cladd.io</span>}
        inputClassName="px-1"
      />
      <Input
        className="w-80"
        size={size}
        value={domain}
        onChange={setDomain}
        placeholder="username"
        prefix={<span className="ml-2 text-cladd-fg-softer">@</span>}
        inputClassName="pl-1"
        suffix={
          pending ? (
            <Spinner size={size} color="brand" className="mr-2" />
          ) : (
            <Chip size={size} color="green" icon={CheckIcon} className="mr-2">
              free
            </Chip>
          )
        }
      />
    </Example>
  );
}

export function ClearButtonExample() {
  const [size, setSize] = useState<InputSize>('lg');
  const [value, setValue] = useState('react components');
  return (
    <Example
      source={EXAMPLE_SOURCE.ClearButtonExample}
      state={{ size }}
      previewSurface
      controls={
        <Toolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={INPUT_SIZES}
          />
        </Toolbar>
      }
    >
      <Input
        className="w-80"
        size={size}
        value={value}
        onChange={setValue}
        placeholder="Search"
        icon={<NoteIcon />}
        clearButton
        onClear={() => setValue('')}
      />
    </Example>
  );
}

export function DisplayValueExample() {
  const [amount, setAmount] = useState('1234.56');
  const [phone, setPhone] = useState('5551234567');
  return (
    <Example
      source={EXAMPLE_SOURCE.DisplayValueExample}
      previewClassName="flex-col gap-4"
      previewSurface
    >
      <Input
        className="w-80"
        value={amount}
        type="number"
        onChange={setAmount}
        displayValue={`$${Number(amount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })}`}
        prefix={<span className="ml-2 text-cladd-fg-softer">Amount</span>}
        inputClassName="text-right justify-end"
      />
      <Input
        className="w-80"
        value={phone}
        onChange={setPhone}
        displayValue={
          phone.length === 10
            ? `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`
            : phone
        }
        prefix={<span className="ml-2 text-cladd-fg-softer">+1</span>}
        inputClassName="pl-1"
      />
    </Example>
  );
}

export function ValidationExample() {
  const [email, setEmail] = useState('anna@');
  const [password, setPassword] = useState('hunter2');
  const [name, setName] = useState('');
  const validEmail = /.+@.+\..+/.test(email);
  return (
    <Example
      source={EXAMPLE_SOURCE.ValidationExample}
      previewClassName="flex-col gap-4"
      previewSurface
    >
      <Input
        className="w-80"
        value={name}
        onChange={setName}
        placeholder="Display name"
        infoMessage="Visible to your team"
      />
      <Input
        className="w-80"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="Email"
        valid={validEmail}
        errorMessage="Enter a valid email address"
        infoMessage="We’ll send a confirmation"
      />
      <Input
        className="w-80"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Password"
        valid={password.length >= 8}
        errorMessage="At least 8 characters"
        infoMessage="Mix letters, numbers, and symbols"
      />
    </Example>
  );
}

export function StatesExample() {
  const [readOnly, setReadOnly] = useState(true);
  const [disabled, setDisabled] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.StatesExample}
      state={{ readOnly, disabled }}
      previewSurface
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="readOnly"
            checked={readOnly}
            onChange={(v) => {
              setReadOnly(v);
              if (v) setDisabled(false);
            }}
          />
          <ExampleControlSwitch
            label="disabled"
            checked={disabled}
            onChange={(v) => {
              setDisabled(v);
              if (v) setReadOnly(false);
            }}
          />
        </Toolbar>
      }
    >
      <Input
        className="w-80"
        value="acme-marketing"
        onChange={() => {}}
        readOnly={readOnly}
        disabled={disabled}
        prefix={<span className="ml-2 text-cladd-fg-softer">cladd.io/</span>}
        inputClassName="pl-1"
      />
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<InputSize>('lg');
  const [color, setColor] = useState<Color>('brand');
  const [rounded, setRounded] = useState(false);
  const [withIcon, setWithIcon] = useState(true);
  const [withClear, setWithClear] = useState(true);
  const [value, setValue] = useState('hello cladd');
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, color, rounded }}
      previewSurface
      controls={
        <>
          <Toolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={INPUT_SIZES}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlSwitch
              label="rounded"
              checked={rounded}
              onChange={setRounded}
            />
            <ExampleControlSwitch
              label="icon"
              checked={withIcon}
              onChange={setWithIcon}
            />
            <ExampleControlSwitch
              label="clear"
              checked={withClear}
              onChange={setWithClear}
            />
          </Toolbar>
          <Toolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </Toolbar>
        </>
      }
    >
      <Input
        className="w-80"
        size={size}
        color={color}
        rounded={rounded}
        value={value}
        onChange={setValue}
        placeholder="Search"
        icon={withIcon ? <NoteIcon /> : undefined}
        clearButton={withClear}
        onClear={() => setValue('')}
        infoMessage="Type to filter"
      />
    </Example>
  );
}

import { Chip, Textarea, type Color, type TextareaSize } from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { NoteIcon } from '@/components/icons/NoteIcon';
import { EXAMPLE_SOURCE } from '@/generated/example-source/textarea';

import { Example } from '../Example';

const TEXTAREA_SIZES: readonly TextareaSize[] = ['sm', 'md', 'lg', 'xl', '2xl'];

const RELEASE_NOTES = `Shipped the new sidebar layout and a faster search index.

Known issue: the export dialog can flash on first open — we're tracking it.`;

export function OverviewExample() {
  const [notes, setNotes] = useState(RELEASE_NOTES);
  const [bug, setBug] = useState(
    'The toolbar disappears after pinning a panel.',
  );
  const [feedback, setFeedback] = useState('');
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="flex-col gap-4"
      previewSurface
    >
      <Textarea
        className="w-96"
        value={notes}
        onChange={setNotes}
        placeholder="What changed in this release?"
        infoMessage="Release notes"
      />
      <Textarea
        className="w-96"
        value={bug}
        onChange={setBug}
        placeholder="Describe the bug"
        icon={<NoteIcon />}
        contentClassName="items-start"
        suffix={
          <Chip size="sm" color="orange" outline className="mt-2 mr-2">
            triage
          </Chip>
        }
      />
      <Textarea
        className="w-96"
        value={feedback}
        onChange={setFeedback}
        placeholder="Tell us what you think…"
        valid={feedback.length === 0 || feedback.length >= 20}
        infoMessage="Markdown supported"
        errorMessage="At least 20 characters"
      />
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<TextareaSize>('lg');
  const [value, setValue] = useState(
    'cladd is dense but not crowded — pack the screen, keep it legible.',
  );
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      previewSurface
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={TEXTAREA_SIZES}
          />
        </ExampleToolbar>
      }
    >
      <Textarea
        className="w-96"
        size={size}
        value={value}
        onChange={setValue}
        placeholder="What's on your mind?"
      />
    </Example>
  );
}

export function AutoGrowExample() {
  const [value, setValue] = useState(
    'Type into this field and watch it grow.\n\nThe editor is a contenteditable div, so the height tracks the content — no rows prop, no resize handle, no JS measurement step.\n\nDelete a few lines and it shrinks back to its size-derived min-height.',
  );
  return (
    <Example source={EXAMPLE_SOURCE.AutoGrowExample} previewSurface>
      <Textarea
        className="w-96"
        value={value}
        onChange={setValue}
        placeholder="Start typing…"
      />
    </Example>
  );
}

export function IconExample() {
  const [size, setSize] = useState<TextareaSize>('lg');
  const [value, setValue] = useState(
    'Picked up the design review notes from yesterday — pushing the toolbar refactor to next sprint.',
  );
  return (
    <Example
      source={EXAMPLE_SOURCE.IconExample}
      state={{ size }}
      previewSurface
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={TEXTAREA_SIZES}
          />
        </ExampleToolbar>
      }
    >
      <Textarea
        className="w-96"
        size={size}
        icon={<NoteIcon />}
        contentClassName="items-start"
        value={value}
        onChange={setValue}
        placeholder="Journal entry…"
      />
    </Example>
  );
}

export function PrefixSuffixExample() {
  const [size, setSize] = useState<TextareaSize>('lg');
  const [message, setMessage] = useState(
    'Heads up — the staging worker is going down for 10 minutes.',
  );
  const limit = 280;
  return (
    <Example
      source={EXAMPLE_SOURCE.PrefixSuffixExample}
      state={{ size }}
      previewSurface
      controls={
        <ExampleToolbar>
          <ExampleControlSize
            value={size}
            onChange={setSize}
            sizes={TEXTAREA_SIZES}
          />
        </ExampleToolbar>
      }
    >
      <Textarea
        className="w-96"
        size={size}
        value={message}
        onChange={setMessage}
        placeholder="Broadcast a status update"
        contentClassName="items-start"
        prefix={
          <Chip size={size} color="brand" className="mt-2 ml-2">
            status
          </Chip>
        }
        inputClassName="pl-1"
        suffix={
          <span className="mt-2 mr-2 font-mono text-cladd-fg-softer">
            {message.length}/{limit}
          </span>
        }
      />
    </Example>
  );
}

export function ValidationExample() {
  const [summary, setSummary] = useState(
    'Short release — perf only. Bumped the search index TTL.',
  );
  const [bug, setBug] = useState('crash');
  return (
    <Example
      source={EXAMPLE_SOURCE.ValidationExample}
      previewClassName="flex-col gap-4"
      previewSurface
    >
      <Textarea
        className="w-96"
        value={summary}
        onChange={setSummary}
        placeholder="Release summary"
        infoMessage="Shown on the changelog page"
      />
      <Textarea
        className="w-96"
        value={bug}
        onChange={setBug}
        placeholder="Steps to reproduce"
        valid={bug.length >= 20}
        errorMessage="At least 20 characters — give us steps to repro"
        infoMessage="Markdown supported"
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
        <ExampleToolbar>
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
        </ExampleToolbar>
      }
    >
      <Textarea
        className="w-96"
        value={RELEASE_NOTES}
        onChange={() => {}}
        readOnly={readOnly}
        disabled={disabled}
        infoMessage="Release notes"
      />
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<TextareaSize>('lg');
  const [color, setColor] = useState<Color>('brand');
  const [rounded, setRounded] = useState(false);
  const [withIcon, setWithIcon] = useState(true);
  const [value, setValue] = useState(
    'Dense but not crowded — pack the screen, keep it legible.',
  );
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, color, rounded }}
      previewSurface
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize
              value={size}
              onChange={setSize}
              sizes={TEXTAREA_SIZES}
            />
          </ExampleToolbar>
          <ExampleToolbar>
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
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      <Textarea
        className="w-96"
        size={size}
        color={color}
        rounded={rounded}
        value={value}
        onChange={setValue}
        placeholder="What's on your mind?"
        icon={withIcon ? <NoteIcon /> : undefined}
        contentClassName={withIcon ? 'items-start' : undefined}
        infoMessage="Markdown supported"
      />
    </Example>
  );
}

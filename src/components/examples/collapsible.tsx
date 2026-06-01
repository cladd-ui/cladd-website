import {
  Button,
  CollapsibleIndicator,
  CollapsiblePanel,
  CollapsibleRoot,
  CollapsibleTrigger,
  Input,
  Surface,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/collapsible';

import { Example } from '../Example';

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M3 8h10" />
    </svg>
  );
}

export function OverviewExample() {
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample} previewSurface>
      <div className="flex w-72 flex-col">
        <CollapsibleRoot defaultOpen>
          <CollapsibleTrigger>
            <Button
              className="group"
              variant="transparent"
              contentClassName="justify-between"
              size="lg"
            >
              Connection details
              <ChevronIcon className="text-cladd-fg-soft transition-transform duration-200 group-data-[open]:-rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <p className="px-2 pt-2 text-cladd-fg-soft">
              Status, region, and last sync time live here. The panel animates
              its height open and closed and respects reduced-motion settings.
            </p>
          </CollapsiblePanel>
        </CollapsibleRoot>
      </div>
    </Example>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(true);
  return (
    <Example source={EXAMPLE_SOURCE.ControlledExample} previewSurface>
      <div className="flex w-72 flex-col gap-2">
        <Button size="sm" variant="solid" onClick={() => setOpen((v) => !v)}>
          {open ? 'Collapse' : 'Expand'} from outside
        </Button>
        <div className="flex flex-col">
          <CollapsibleRoot open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger>
              <Button
                className="group"
                variant="transparent"
                contentClassName="justify-between"
                size="lg"
              >
                Advanced options
                <ChevronIcon className="text-cladd-fg-soft transition-transform duration-200 group-data-[open]:-rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <p className="px-2 pt-2 text-cladd-fg-soft">
                Open state lives in your component, so any control can drive it.
              </p>
            </CollapsiblePanel>
          </CollapsibleRoot>
        </div>
      </div>
    </Example>
  );
}

export function IndicatorExample() {
  return (
    <Example source={EXAMPLE_SOURCE.IndicatorExample} previewSurface>
      <div className="flex w-72 flex-col">
        <CollapsibleRoot>
          <CollapsibleTrigger>
            <Button
              variant="transparent"
              contentClassName="justify-between"
              size="lg"
            >
              Billing address
              <CollapsibleIndicator className="text-cladd-fg-soft">
                {({ open }) => (open ? <MinusIcon /> : <PlusIcon />)}
              </CollapsibleIndicator>
            </Button>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <p className="px-2 pt-2 text-cladd-fg-soft">
              The indicator receives the open and disabled state, so you can
              swap glyphs without tracking it yourself.
            </p>
          </CollapsiblePanel>
        </CollapsibleRoot>
      </div>
    </Example>
  );
}

export function KeepMountedExample() {
  return (
    <Example source={EXAMPLE_SOURCE.KeepMountedExample} previewSurface>
      <div className="flex w-72 flex-col">
        <CollapsibleRoot>
          <CollapsibleTrigger>
            <Button
              className="group"
              variant="transparent"
              contentClassName="justify-between"
              size="lg"
            >
              API key
              <ChevronIcon className="text-cladd-fg-soft transition-transform duration-200 group-data-[open]:-rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsiblePanel keepMounted>
            <div className="pt-2">
              <Input placeholder="sk-..." defaultValue="sk-live-9f3c2a" />
            </div>
          </CollapsiblePanel>
        </CollapsibleRoot>
      </div>
    </Example>
  );
}

export function DisabledExample() {
  return (
    <Example source={EXAMPLE_SOURCE.DisabledExample} previewSurface>
      <div className="flex w-72 flex-col">
        <CollapsibleRoot disabled>
          <CollapsibleTrigger>
            <Button
              className="group"
              variant="transparent"
              contentClassName="justify-between"
              size="lg"
            >
              Locked section
              <ChevronIcon className="text-cladd-fg-soft transition-transform duration-200 group-data-[open]:-rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <p className="px-2 pt-2 text-cladd-fg-soft">
              A disabled root makes the trigger inert and ignores toggles.
            </p>
          </CollapsiblePanel>
        </CollapsibleRoot>
      </div>
    </Example>
  );
}

export function NestedExample() {
  return (
    <Example source={EXAMPLE_SOURCE.NestedExample} previewSurface>
      <div className="flex w-72 flex-col">
        <CollapsibleRoot defaultOpen>
          <CollapsibleTrigger>
            <Button
              className="group"
              variant="transparent"
              contentClassName="justify-between"
              size="lg"
            >
              Project settings
              <ChevronIcon className="text-cladd-fg-soft transition-transform duration-200 group-data-[open]:-rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <Surface
              level={2}
              outline
              className="mt-2 rounded-xl"
              contentClassName="flex flex-col gap-2 p-4"
            >
              <p className="text-cladd-fg-soft">General options live here.</p>
              <div className="flex flex-col">
                <CollapsibleRoot>
                  <CollapsibleTrigger>
                    <Button
                      className="group"
                      variant="transparent"
                      contentClassName="justify-between"
                      size="lg"
                    >
                      Advanced
                      <ChevronIcon className="text-cladd-fg-soft transition-transform duration-200 group-data-[open]:-rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsiblePanel>
                    <p className="pt-1 text-cladd-fg-softer">
                      Nest a collapsible inside a panel for a dense disclosure
                      tree.
                    </p>
                  </CollapsiblePanel>
                </CollapsibleRoot>
              </div>
            </Surface>
          </CollapsiblePanel>
        </CollapsibleRoot>
      </div>
    </Example>
  );
}

export function PlaygroundExample() {
  const [keepMounted, setKeepMounted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      previewSurface
      state={{ keepMounted, disabled }}
      controls={
        <ExampleToolbar>
          <ExampleControlSwitch
            label="keepMounted"
            checked={keepMounted}
            onChange={setKeepMounted}
          />
          <ExampleControlSwitch
            label="disabled"
            checked={disabled}
            onChange={setDisabled}
          />
        </ExampleToolbar>
      }
    >
      <div className="flex w-72 flex-col">
        <CollapsibleRoot disabled={disabled}>
          <CollapsibleTrigger>
            <Button
              className="group"
              variant="transparent"
              contentClassName="justify-between"
              size="lg"
            >
              Notifications
              <ChevronIcon className="text-cladd-fg-soft transition-transform duration-200 group-data-[open]:-rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsiblePanel keepMounted={keepMounted}>
            <p className="px-2 pt-2 text-cladd-fg-soft">
              Toggle the controls to see how keepMounted and disabled change the
              panel.
            </p>
          </CollapsiblePanel>
        </CollapsibleRoot>
      </div>
    </Example>
  );
}

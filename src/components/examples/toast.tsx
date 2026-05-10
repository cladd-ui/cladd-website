import {
  Button,
  CheckIcon,
  Toast,
  ToastClose,
  ToastRoot,
  ToastTrigger,
  Toolbar,
  useToast,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSwitch,
  ExampleControlVariant,
  type SurfaceVariant,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/toast';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <ToastRoot>
        <ToastTrigger>
          <Button>Notify</Button>
        </ToastTrigger>
        <Toast
          icon={CheckIcon}
          color="green"
          title="Project published"
          text="It’s now live at acme.studio/launch."
        />
      </ToastRoot>
    </Example>
  );
}

export function CompoundExample() {
  return (
    <Example source={EXAMPLE_SOURCE.CompoundExample}>
      <ToastRoot>
        <ToastTrigger>
          <Button>Delete file</Button>
        </ToastTrigger>
        <Toast
          color="red"
          title="hero.png moved to trash"
          text="You can still restore it for the next 30 days."
          closeButton={false}
        >
          <ToastClose>
            <Button variant="transparent" outline={false}>
              Undo
            </Button>
          </ToastClose>
        </Toast>
      </ToastRoot>
    </Example>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);
  return (
    <Example source={EXAMPLE_SOURCE.ControlledExample}>
      <Button onClick={() => setOpen(true)}>
        {open ? 'Toast is open' : 'Open toast'}
      </Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Controlled toast"
        text="External state drives this one — the trigger above flips it."
      />
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
      <ToastRoot>
        <ToastTrigger>
          <Button color={color}>Show {color} toast</Button>
        </ToastTrigger>
        <Toast color={color} title="New deploy" text={`Color is "${color}".`} />
      </ToastRoot>
    </Example>
  );
}

export function VariantExample() {
  const [variant, setVariant] = useState<SurfaceVariant>('gradient');
  return (
    <Example
      source={EXAMPLE_SOURCE.VariantExample}
      state={{ variant }}
      controls={
        <Toolbar>
          <ExampleControlVariant value={variant} onChange={setVariant} />
        </Toolbar>
      }
    >
      <ToastRoot>
        <ToastTrigger>
          <Button>Show toast</Button>
        </ToastTrigger>
        <Toast
          variant={variant}
          color="brand"
          title="Variant preview"
          text={`Surface variant is "${variant}".`}
        />
      </ToastRoot>
    </Example>
  );
}

export function IconExample() {
  return (
    <Example source={EXAMPLE_SOURCE.IconExample}>
      <ToastRoot>
        <ToastTrigger>
          <Button>Save changes</Button>
        </ToastTrigger>
        <Toast
          icon={CheckIcon}
          color="green"
          title="Saved"
          text="All edits synced to the cloud."
        />
      </ToastRoot>
    </Example>
  );
}

export function RichContentExample() {
  return (
    <Example source={EXAMPLE_SOURCE.RichContentExample}>
      <ToastRoot>
        <ToastTrigger>
          <Button>Invite teammate</Button>
        </ToastTrigger>
        <Toast closeButton={false} timeout={8000}>
          <div className="flex items-center gap-4">
            <div
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-full bg-cladd-primary font-semibold text-cladd-bg"
            >
              JS
            </div>
            <div className="flex flex-col">
              <span className="text-cladd-sm font-semibold">
                Jamie sent you an invite
              </span>
              <span className="text-cladd-xs text-cladd-fg-soft">
                Join the “Acme · Marketing” workspace
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <ToastClose>
              <Button size="sm" variant="transparent" outline={false}>
                Decline
              </Button>
            </ToastClose>
            <ToastClose>
              <Button size="sm" color="brand" variant="gradient">
                Accept
              </Button>
            </ToastClose>
          </div>
        </Toast>
      </ToastRoot>
    </Example>
  );
}

export function TimeoutExample() {
  const [persistent, setPersistent] = useState(false);
  return (
    <Example
      source={EXAMPLE_SOURCE.TimeoutExample}
      state={{ timeout: persistent ? 0 : 4000 }}
      controls={
        <Toolbar>
          <ExampleControlSwitch
            label="persistent"
            checked={persistent}
            onChange={setPersistent}
          />
        </Toolbar>
      }
    >
      <ToastRoot>
        <ToastTrigger>
          <Button>{persistent ? 'Open sticky toast' : 'Open 4s toast'}</Button>
        </ToastTrigger>
        <Toast
          timeout={persistent ? 0 : 4000}
          title={persistent ? 'Sticks around' : 'Closes in 4s'}
          text={
            persistent
              ? 'With timeout={0}, only the close button dismisses it.'
              : 'Default is 5000 — this one is shorter.'
          }
        />
      </ToastRoot>
    </Example>
  );
}

export function UseToastExample() {
  const toast = useToast();
  return (
    <Example source={EXAMPLE_SOURCE.UseToastExample}>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast({
              title: 'Copied',
              text: 'Share link is in your clipboard.',
              color: 'brand',
              icon: CheckIcon,
            })
          }
        >
          Copy link
        </Button>
        <Button
          color="green"
          variant="gradient"
          onClick={() =>
            toast({
              title: 'Deploy succeeded',
              text: 'api/v2 is live in 1.4s.',
              color: 'green',
              icon: CheckIcon,
            })
          }
        >
          Deploy
        </Button>
        <Button
          color="red"
          variant="gradient"
          onClick={() =>
            toast({
              title: 'Build failed',
              text: 'Check the logs for details.',
              color: 'red',
            })
          }
        >
          Break build
        </Button>
      </div>
    </Example>
  );
}

import {
  Button,
  Dialog,
  DialogClose,
  DialogRoot,
  DialogTrigger,
  Input,
  useDialog,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlVariant,
  ExampleToolbar,
  type SurfaceVariant,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/dialog';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <DialogRoot>
        <DialogTrigger>
          <Button>Publish project</Button>
        </DialogTrigger>
        <Dialog
          title="Publish project?"
          text="The project will go live at acme.studio/launch and become visible to anyone with the link."
          cancelButtonText="Cancel"
          confirmButtonText="Publish"
        />
      </DialogRoot>
    </Example>
  );
}

export function CompoundExample() {
  return (
    <Example source={EXAMPLE_SOURCE.CompoundExample}>
      <DialogRoot>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <Dialog
          title="Compound API"
          text="Trigger, dialog, and close all sit inside DialogRoot. The root owns the open state and wires the parts together through context."
          confirmButtonText="Got it"
        />
      </DialogRoot>
    </Example>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);
  return (
    <Example source={EXAMPLE_SOURCE.ControlledExample}>
      <Button onClick={() => setOpen(true)}>Open from external state</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Controlled"
        text="open and onOpenChange come from the surrounding component — no DialogRoot needed."
        confirmButtonText="Close"
        onConfirm={() => setOpen(false)}
      />
    </Example>
  );
}

export function DestructiveExample() {
  return (
    <Example source={EXAMPLE_SOURCE.DestructiveExample}>
      <DialogRoot>
        <DialogTrigger>
          <Button color="red" variant="gradient">
            Delete workspace
          </Button>
        </DialogTrigger>
        <Dialog
          title="Delete acme-marketing?"
          text="This permanently removes the workspace, all of its projects, and 42 file versions. This action cannot be undone."
          requireConfirmText="acme-marketing"
          cancelButtonText="Cancel"
          confirmButtonText="Delete workspace"
          confirmButtonColor="red"
        />
      </DialogRoot>
    </Example>
  );
}

export function CustomContentExample() {
  const [name, setName] = useState('Untitled project');
  return (
    <Example source={EXAMPLE_SOURCE.CustomContentExample}>
      <DialogRoot>
        <DialogTrigger>
          <Button>Rename project</Button>
        </DialogTrigger>
        <Dialog
          title="Rename project"
          text="Pick a new name. This will update the URL slug."
          cancelButtonText="Cancel"
          confirmButtonText="Rename"
        >
          <Input
            value={name}
            onChange={setName}
            placeholder="Project name"
            size="lg"
          />
        </Dialog>
      </DialogRoot>
    </Example>
  );
}

export function CustomButtonsExample() {
  return (
    <Example source={EXAMPLE_SOURCE.CustomButtonsExample}>
      <DialogRoot>
        <DialogTrigger>
          <Button>Unsaved changes</Button>
        </DialogTrigger>
        <Dialog
          title="You have unsaved changes"
          text="Pick how to handle the edits you've made since the last save."
          buttons={
            <>
              <DialogClose>
                <Button rounded size="lg" variant="transparent">
                  Keep editing
                </Button>
              </DialogClose>
              <DialogClose>
                <Button rounded size="lg" color="red" variant="transparent">
                  Discard
                </Button>
              </DialogClose>
              <DialogClose>
                <Button rounded size="lg" color="brand" variant="gradient">
                  Save & exit
                </Button>
              </DialogClose>
            </>
          }
        />
      </DialogRoot>
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
    >
      <DialogRoot>
        <DialogTrigger>
          <Button color={color}>Open {color} dialog</Button>
        </DialogTrigger>
        <Dialog
          title="Confirm button color"
          text={`Confirm and cancel buttons accept their own color tokens. Confirm color is "${color}".`}
          cancelButtonText="Cancel"
          confirmButtonText="Confirm"
          confirmButtonColor={color}
        />
      </DialogRoot>
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
        <ExampleToolbar>
          <ExampleControlVariant value={variant} onChange={setVariant} />
        </ExampleToolbar>
      }
    >
      <DialogRoot>
        <DialogTrigger>
          <Button>Show dialog</Button>
        </DialogTrigger>
        <Dialog
          variant={variant}
          title="Surface variant"
          text={`The dialog surface uses the "${variant}" variant.`}
          confirmButtonText="Got it"
        />
      </DialogRoot>
    </Example>
  );
}

export function UseDialogExample() {
  const dialog = useDialog();
  return (
    <Example source={EXAMPLE_SOURCE.UseDialogExample}>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            dialog.alert({
              title: 'Build finished',
              text: 'api/v2 deployed in 1.4s. Logs are in the deploy panel.',
            })
          }
        >
          Show alert
        </Button>
        <Button
          color="brand"
          variant="gradient"
          onClick={() =>
            dialog.confirm({
              title: 'Send invite?',
              text: 'jamie@acme.studio will get an email with a join link.',
              confirmButtonText: 'Send invite',
            })
          }
        >
          Confirm action
        </Button>
        <Button
          color="red"
          variant="gradient"
          onClick={() =>
            dialog.confirm({
              title: 'Reset all settings?',
              text: 'This restores defaults across every panel. Your saved presets are kept.',
              confirmButtonText: 'Reset',
              confirmButtonColor: 'red',
              requireConfirmText: 'reset',
            })
          }
        >
          Destructive confirm
        </Button>
      </div>
    </Example>
  );
}

import {
  Input,
  Surface,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
  Toolbar,
  type ButtonSize,
  type Color,
} from '@cladd-ui/react';
import { useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSize,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/tabs';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="flex-col items-start"
    >
      <Tabs defaultValue="overview">
        <TabsList>
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="settings">Settings</Tab>
        </TabsList>
        <TabPanel value="overview" className="pt-4 text-cladd-fg-soft">
          A summary of the project — status, recent changes, and the people
          working on it.
        </TabPanel>
        <TabPanel value="activity" className="pt-4 text-cladd-fg-soft">
          A reverse-chronological feed of commits, comments, and deploys.
        </TabPanel>
        <TabPanel value="settings" className="pt-4 text-cladd-fg-soft">
          Visibility, integrations, and danger-zone controls for this project.
        </TabPanel>
      </Tabs>
    </Example>
  );
}

export function ControlledExample() {
  const [value, setValue] = useState('write');
  return (
    <Example
      source={EXAMPLE_SOURCE.ControlledExample}
      previewClassName="flex-col items-start"
    >
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <Tab value="write">Write</Tab>
          <Tab value="preview">Preview</Tab>
          <Tab value="diff">Diff</Tab>
        </TabsList>
        <TabPanel value="write" className="pt-4 text-cladd-fg-soft">
          The raw editor — type your changes here.
        </TabPanel>
        <TabPanel value="preview" className="pt-4 text-cladd-fg-soft">
          A rendered preview of what you wrote.
        </TabPanel>
        <TabPanel value="diff" className="pt-4 text-cladd-fg-soft">
          Line-by-line changes against the saved version.
        </TabPanel>
        <p className="pt-2 text-cladd-fg-softer">
          Active tab: <span className="text-cladd-primary">{value}</span>
        </p>
      </Tabs>
    </Example>
  );
}

export function SizeExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  return (
    <Example
      source={EXAMPLE_SOURCE.SizeExample}
      state={{ size }}
      controls={
        <ExampleToolbar>
          <ExampleControlSize value={size} onChange={setSize} />
        </ExampleToolbar>
      }
      previewClassName="flex-col items-start"
    >
      <Tabs defaultValue="general">
        <TabsList size={size}>
          <Tab value="general">General</Tab>
          <Tab value="members">Members</Tab>
          <Tab value="billing">Billing</Tab>
        </TabsList>
        <TabPanel value="general" className="pt-4 text-cladd-fg-soft">
          Workspace name, slug, and default locale.
        </TabPanel>
        <TabPanel value="members" className="pt-4 text-cladd-fg-soft">
          Invite teammates and manage their roles.
        </TabPanel>
        <TabPanel value="billing" className="pt-4 text-cladd-fg-soft">
          Plan, payment method, and invoices.
        </TabPanel>
      </Tabs>
    </Example>
  );
}

export function ColorExample() {
  const [activeColor, setActiveColor] = useState<Color>('blue');
  return (
    <Example
      source={EXAMPLE_SOURCE.ColorExample}
      state={{ activeColor }}
      controls={
        <ExampleToolbar>
          <ExampleControlColor value={activeColor} onChange={setActiveColor} />
        </ExampleToolbar>
      }
      previewClassName="flex-col items-start"
    >
      <Tabs defaultValue="design">
        <TabsList activeColor={activeColor}>
          <Tab value="design">Design</Tab>
          <Tab value="prototype">Prototype</Tab>
          <Tab value="inspect">Inspect</Tab>
        </TabsList>
        <TabPanel value="design" className="pt-4 text-cladd-fg-soft">
          The canvas — drag, draw, and arrange layers.
        </TabPanel>
        <TabPanel value="prototype" className="pt-4 text-cladd-fg-soft">
          Wire up flows and transitions between frames.
        </TabPanel>
        <TabPanel value="inspect" className="pt-4 text-cladd-fg-soft">
          Measurements, tokens, and exportable code.
        </TabPanel>
      </Tabs>
    </Example>
  );
}

export function KeepMountedExample() {
  const [draft, setDraft] = useState('');
  return (
    <Example
      source={EXAMPLE_SOURCE.KeepMountedExample}
      previewClassName="flex-col items-start"
    >
      <Tabs defaultValue="compose">
        <TabsList>
          <Tab value="compose">Compose</Tab>
          <Tab value="recipients">Recipients</Tab>
        </TabsList>
        <TabPanel value="compose" keepMounted className="pt-4">
          <Input
            placeholder="Type a draft, switch tabs, come back…"
            value={draft}
            onChange={(value) => setDraft(value)}
            className="w-full"
          />
        </TabPanel>
        <TabPanel value="recipients" className="pt-4 text-cladd-fg-soft">
          Pick who this goes to. Your draft is still in the Compose tab.
        </TabPanel>
      </Tabs>
    </Example>
  );
}

export function DisabledExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.DisabledExample}
      previewClassName="flex-col items-start"
    >
      <Tabs defaultValue="account">
        <TabsList>
          <Tab value="account">Account</Tab>
          <Tab value="team">Team</Tab>
          <Tab value="audit" disabled>
            Audit log
          </Tab>
        </TabsList>
        <TabPanel value="account" className="pt-4 text-cladd-fg-soft">
          Your profile, email, and password.
        </TabPanel>
        <TabPanel value="team" className="pt-4 text-cladd-fg-soft">
          Members and pending invitations.
        </TabPanel>
        <TabPanel value="audit" className="pt-4 text-cladd-fg-soft">
          Available on the Enterprise plan.
        </TabPanel>
      </Tabs>
    </Example>
  );
}

export function AppShellExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.AppShellExample}
      previewClassName="content-center"
    >
      <Surface outline className="w-full max-w-xl rounded-2xl">
        <Tabs defaultValue="canvas">
          <Toolbar className="w-full" contentClassName="justify-between">
            <span className="px-2 text-cladd-fg-soft">Untitled board</span>
            <TabsList variant="transparent">
              <Tab value="canvas">Canvas</Tab>
              <Tab value="data">Data</Tab>
              <Tab value="history">History</Tab>
            </TabsList>
          </Toolbar>
          <div className="p-4">
            <TabPanel value="canvas" className="text-cladd-fg-soft">
              The infinite canvas — nodes, edges, and the toolbox.
            </TabPanel>
            <TabPanel value="data" className="text-cladd-fg-soft">
              The underlying table powering every node.
            </TabPanel>
            <TabPanel value="history" className="text-cladd-fg-soft">
              Snapshots and named versions you can roll back to.
            </TabPanel>
          </div>
        </Tabs>
      </Surface>
    </Example>
  );
}

export function PlaygroundExample() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [activeColor, setActiveColor] = useState<Color>('blue');
  const [outline, setOutline] = useState(true);
  const [rounded, setRounded] = useState(true);
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ size, activeColor, outline, rounded }}
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSize value={size} onChange={setSize} />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="outline"
              checked={outline}
              onChange={setOutline}
            />
            <ExampleControlSwitch
              label="rounded"
              checked={rounded}
              onChange={setRounded}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor
              value={activeColor}
              onChange={setActiveColor}
            />
          </ExampleToolbar>
        </>
      }
      previewClassName="flex-col items-start"
    >
      <Tabs defaultValue="overview">
        <TabsList
          size={size}
          activeColor={activeColor}
          outline={outline}
          rounded={rounded}
        >
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="settings">Settings</Tab>
        </TabsList>
        <TabPanel value="overview" className="pt-4 text-cladd-fg-soft">
          A summary of the project and the people working on it.
        </TabPanel>
        <TabPanel value="activity" className="pt-4 text-cladd-fg-soft">
          A feed of commits, comments, and deploys.
        </TabPanel>
        <TabPanel value="settings" className="pt-4 text-cladd-fg-soft">
          Visibility, integrations, and danger-zone controls.
        </TabPanel>
      </Tabs>
    </Example>
  );
}

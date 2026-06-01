import {
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
  Button,
  Input,
  List,
  ListButton,
  SectionTitle,
  Surface,
  Switch,
  type Color,
} from '@cladd-ui/react';
import { type ComponentPropsWithoutRef, useState } from 'react';

import {
  ExampleControlColor,
  ExampleControlSwitch,
  ExampleToolbar,
} from '@/components/ExampleControls';
import { EXAMPLE_SOURCE } from '@/generated/example-source/accordion';

import { Example } from '../Example';

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

// A reusable trigger row built on cladd's own `Button` — so it picks up the
// hover, active, and focus-ring states for free. `AccordionTrigger` clones its
// child and injects the toggle `onClick`, the aria wiring, and `data-open`, so
// the row just spreads those props (`...props`) onto the `Button`.
function AccordionRow({
  label,
  ...props
}: { label: string } & ComponentPropsWithoutRef<'button'>) {
  return (
    <Button
      variant="transparent"
      outline={false}
      size="xl"
      {...props}
      className="w-full rounded-none aria-disabled:pointer-events-none aria-disabled:opacity-50"
      contentClassName="justify-between pl-4"
    >
      <span>{label}</span>
      <AccordionIndicator className="text-cladd-fg-soft transition-transform data-[open]:rotate-90">
        <ChevronIcon />
      </AccordionIndicator>
    </Button>
  );
}

export function OverviewExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.OverviewExample}
      previewClassName="content-center"
    >
      <Surface outline className="w-96 overflow-hidden rounded-2xl">
        <AccordionRoot defaultValue="appearance">
          <AccordionItem value="appearance">
            <AccordionTrigger>
              <AccordionRow label="Appearance" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                Theme, accent color, and interface density. Changes apply to the
                whole workspace.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="notifications">
            <AccordionTrigger>
              <AccordionRow label="Notifications" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                Choose what reaches your inbox: mentions, weekly digests, and
                release notes.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="advanced">
            <AccordionTrigger>
              <AccordionRow label="Advanced" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                Experimental flags, developer tooling, and the data export
                endpoint.
              </div>
            </AccordionPanel>
          </AccordionItem>
        </AccordionRoot>
      </Surface>
    </Example>
  );
}

export function MultipleExample() {
  const [open, setOpen] = useState<string[]>(['shipping']);
  return (
    <Example
      source={EXAMPLE_SOURCE.MultipleExample}
      previewClassName="content-center"
    >
      <Surface outline className="w-96 overflow-hidden rounded-2xl">
        <AccordionRoot
          multiple
          value={open}
          onValueChange={(v) => setOpen(v as string[])}
        >
          <AccordionItem value="shipping">
            <AccordionTrigger>
              <AccordionRow label="Shipping" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                Ships in 2–3 business days. Free over $50.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>
              <AccordionRow label="Returns" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                30-day window, no questions asked. We cover return postage.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="warranty">
            <AccordionTrigger>
              <AccordionRow label="Warranty" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                Two years against manufacturing defects, extendable to five.
              </div>
            </AccordionPanel>
          </AccordionItem>
        </AccordionRoot>
      </Surface>
    </Example>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState<string | undefined>('account');
  return (
    <Example
      source={EXAMPLE_SOURCE.ControlledExample}
      previewClassName="content-center"
    >
      <div className="flex w-96 flex-col gap-2">
        <span className="text-cladd-fg-soft">
          Open section: <span className="text-cladd-fg">{open ?? 'none'}</span>
        </span>
        <Surface outline className="overflow-hidden rounded-2xl">
          <AccordionRoot
            value={open}
            onValueChange={(v) => setOpen(v as string | undefined)}
          >
            <AccordionItem value="account">
              <AccordionTrigger>
                <AccordionRow label="Account" />
              </AccordionTrigger>
              <AccordionPanel>
                <div className="px-4 pb-4 text-cladd-fg-soft">
                  Profile, email address, and connected sign-in providers.
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="billing">
              <AccordionTrigger>
                <AccordionRow label="Billing" />
              </AccordionTrigger>
              <AccordionPanel>
                <div className="px-4 pb-4 text-cladd-fg-soft">
                  Plan, payment method, and invoice history.
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="team">
              <AccordionTrigger>
                <AccordionRow label="Team" />
              </AccordionTrigger>
              <AccordionPanel>
                <div className="px-4 pb-4 text-cladd-fg-soft">
                  Invite members, manage roles, and revoke access.
                </div>
              </AccordionPanel>
            </AccordionItem>
          </AccordionRoot>
        </Surface>
      </div>
    </Example>
  );
}

export function DisabledExample() {
  return (
    <Example
      source={EXAMPLE_SOURCE.DisabledExample}
      previewClassName="content-center"
    >
      <Surface outline className="w-96 overflow-hidden rounded-2xl">
        <AccordionRoot defaultValue="general">
          <AccordionItem value="general">
            <AccordionTrigger>
              <AccordionRow label="General" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                Workspace name, default language, and time zone.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="integrations">
            <AccordionTrigger>
              <AccordionRow label="Integrations" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                Slack, GitHub, and webhook connections.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="enterprise" disabled>
            <AccordionTrigger>
              <AccordionRow label="Enterprise (Pro plan)" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                SSO, audit logs, and custom retention policies.
              </div>
            </AccordionPanel>
          </AccordionItem>
        </AccordionRoot>
      </Surface>
    </Example>
  );
}

export function SettingsPanelExample() {
  const [name, setName] = useState('Acme Studio');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    autosave: true,
    cursors: true,
    compact: false,
    mentions: true,
    digest: false,
    releases: true,
  });
  const set = (id: string) =>
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  return (
    <Example
      source={EXAMPLE_SOURCE.SettingsPanelExample}
      previewClassName="content-center"
    >
      <Surface outline className="w-96 overflow-hidden rounded-2xl">
        <AccordionRoot defaultValue="workspace">
          <AccordionItem value="workspace">
            <AccordionTrigger>
              <AccordionRow label="Workspace" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="flex flex-col gap-2 px-4 pb-4">
                <SectionTitle>Display name</SectionTitle>
                <Input value={name} onChange={setName} />
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="editor">
            <AccordionTrigger>
              <AccordionRow label="Editor" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-2 pb-2">
                <List>
                  <ListButton
                    as="label"
                    after={
                      <Switch
                        as="span"
                        checked={toggles.autosave}
                        onChange={() => set('autosave')}
                      />
                    }
                  >
                    Autosave drafts
                  </ListButton>
                  <ListButton
                    as="label"
                    after={
                      <Switch
                        as="span"
                        checked={toggles.cursors}
                        onChange={() => set('cursors')}
                      />
                    }
                  >
                    Show collaborator cursors
                  </ListButton>
                  <ListButton
                    as="label"
                    after={
                      <Switch
                        as="span"
                        checked={toggles.compact}
                        onChange={() => set('compact')}
                      />
                    }
                  >
                    Compact density
                  </ListButton>
                </List>
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="notifications">
            <AccordionTrigger>
              <AccordionRow label="Notifications" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-2 pb-2">
                <List>
                  <ListButton
                    as="label"
                    after={
                      <Switch
                        as="span"
                        checked={toggles.mentions}
                        onChange={() => set('mentions')}
                      />
                    }
                  >
                    Mentions
                  </ListButton>
                  <ListButton
                    as="label"
                    after={
                      <Switch
                        as="span"
                        checked={toggles.digest}
                        onChange={() => set('digest')}
                      />
                    }
                  >
                    Weekly digest
                  </ListButton>
                  <ListButton
                    as="label"
                    after={
                      <Switch
                        as="span"
                        checked={toggles.releases}
                        onChange={() => set('releases')}
                      />
                    }
                  >
                    Release notes
                  </ListButton>
                </List>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </AccordionRoot>
      </Surface>
    </Example>
  );
}

export function PlaygroundExample() {
  const [multiple, setMultiple] = useState(false);
  const [color, setColor] = useState<Color>('brand');
  return (
    <Example
      source={EXAMPLE_SOURCE.PlaygroundExample}
      state={{ multiple, color }}
      previewClassName="content-center"
      controls={
        <>
          <ExampleToolbar>
            <ExampleControlSwitch
              label="multiple"
              checked={multiple}
              onChange={setMultiple}
            />
          </ExampleToolbar>
          <ExampleToolbar>
            <ExampleControlColor value={color} onChange={setColor} />
          </ExampleToolbar>
        </>
      }
    >
      <Surface
        outline
        className={`cladd-color-${color} w-96 overflow-hidden rounded-2xl`}
      >
        <AccordionRoot multiple={multiple} defaultValue="overview">
          <AccordionItem value="overview">
            <AccordionTrigger>
              <AccordionRow label="Overview" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-primary">
                The accent token flows down to anything that reads the surface
                color.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="details">
            <AccordionTrigger>
              <AccordionRow label="Details" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                Toggle <span className="text-cladd-primary">multiple</span> to
                let sections stay open independently.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="more">
            <AccordionTrigger>
              <AccordionRow label="More" />
            </AccordionTrigger>
            <AccordionPanel>
              <div className="px-4 pb-4 text-cladd-fg-soft">
                In single mode, opening this collapses the others.
              </div>
            </AccordionPanel>
          </AccordionItem>
        </AccordionRoot>
      </Surface>
    </Example>
  );
}

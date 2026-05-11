import {
  Button,
  Chip,
  Input,
  List,
  ListItem,
  ListSeparator,
  Popover,
  PopoverRoot,
  PopoverTrigger,
  SectionTitle,
  Surface,
  Switch,
} from '@cladd-ui/react';
import { useState } from 'react';

import { EXAMPLE_SOURCE } from '@/generated/example-source/section-title';

import { Example } from '../Example';

export function OverviewExample() {
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <Surface
        outline
        className="w-80 rounded-3xl"
        contentClassName="flex flex-col gap-8 p-4"
      >
        <div className="flex flex-col gap-2">
          <SectionTitle>Project</SectionTitle>
          <div className="flex items-center justify-between">
            <span className="font-medium">acme-marketing</span>
            <Chip color="green" outline>
              Live
            </Chip>
          </div>
          <p className="text-cladd-fg-soft">
            Landing pages, lifecycle emails, and the press kit microsite.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <SectionTitle>Owner</SectionTitle>
          <div className="flex items-center justify-between">
            <span>Anna Whittaker</span>
            <span className="font-mono text-cladd-fg-softer">anna@acme</span>
          </div>
        </div>
      </Surface>
    </Example>
  );
}

export function InPopoverExample() {
  const [open, setOpen] = useState(true);
  const [notify, setNotify] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [digest, setDigest] = useState(false);
  return (
    <Example source={EXAMPLE_SOURCE.InPopoverExample}>
      <PopoverRoot open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button>Workspace settings</Button>
        </PopoverTrigger>
        <Popover className="w-72" offset={8} contentClassName="p-4 text-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <SectionTitle>Workspace</SectionTitle>
              <div className="flex items-center justify-between">
                <span className="font-medium">acme-marketing</span>
                <Chip color="brand" outline>
                  Pro
                </Chip>
              </div>
              <span className="text-cladd-fg-soft">
                8 members · 42 projects
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <SectionTitle>Notifications</SectionTitle>
              <label className="flex items-center justify-between gap-4">
                <span>Email updates</span>
                <Switch as="div" checked={notify} onChange={setNotify} />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>Mentions</span>
                <Switch as="div" checked={mentions} onChange={setMentions} />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>Weekly digest</span>
                <Switch as="div" checked={digest} onChange={setDigest} />
              </label>
            </div>
          </div>
        </Popover>
      </PopoverRoot>
    </Example>
  );
}

export function FormGroupExample() {
  const [name, setName] = useState('acme-marketing');
  const [slug, setSlug] = useState('acme-marketing');
  const [domain, setDomain] = useState('acme.studio');
  const [analytics, setAnalytics] = useState(true);
  const [indexing, setIndexing] = useState(false);
  return (
    <Example source={EXAMPLE_SOURCE.FormGroupExample}>
      <Surface
        outline
        className="w-96 rounded-3xl"
        contentClassName="flex flex-col gap-8 p-4"
      >
        <div className="flex flex-col gap-2">
          <SectionTitle>General</SectionTitle>
          <Input
            value={name}
            onChange={setName}
            placeholder="Project name"
            size="lg"
          />
          <Input
            value={slug}
            onChange={setSlug}
            placeholder="URL slug"
            inputClassName="pl-1"
            prefix={
              <span className="ml-2 text-xs text-cladd-fg-softer">
                cladd.io/
              </span>
            }
            size="lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <SectionTitle>Publishing</SectionTitle>
          <Input
            value={domain}
            onChange={setDomain}
            placeholder="Custom domain"
            size="lg"
          />
          <label className="flex items-center justify-between gap-4 pt-2">
            <div className="flex flex-col">
              <span>Analytics</span>
              <span className="text-cladd-fg-soft">
                Track page views and referrers
              </span>
            </div>
            <Switch checked={analytics} onChange={setAnalytics} />
          </label>
          <label className="flex items-center justify-between gap-4 pt-2">
            <div className="flex flex-col">
              <span>Search indexing</span>
              <span className="text-cladd-fg-soft">
                Allow search engines to crawl
              </span>
            </div>
            <Switch checked={indexing} onChange={setIndexing} />
          </label>
        </div>
      </Surface>
    </Example>
  );
}

export function EndSlotExample() {
  return (
    <Example source={EXAMPLE_SOURCE.EndSlotExample}>
      <Surface
        outline
        className="w-96 rounded-3xl"
        contentClassName="flex flex-col gap-2 p-4"
      >
        <SectionTitle>
          <span>Members</span>
          <Chip color="brand">8</Chip>
          <button
            type="button"
            className="ml-auto cursor-pointer text-cladd-primary normal-case hover:underline"
          >
            Invite
          </button>
        </SectionTitle>
        <div className="mt-4 flex items-center justify-between">
          <span>Anna Whittaker</span>
          <Chip color="brand" outline>
            Owner
          </Chip>
        </div>
        <div className="flex items-center justify-between">
          <span>Jamie Park</span>
          <Chip outline>Editor</Chip>
        </div>
        <div className="flex items-center justify-between">
          <span>Riley Chen</span>
          <Chip outline>Viewer</Chip>
        </div>
      </Surface>
    </Example>
  );
}

export function RichSurfaceExample() {
  return (
    <Example source={EXAMPLE_SOURCE.RichSurfaceExample}>
      <Surface
        outline
        className="w-[28rem] rounded-3xl"
        contentClassName="flex flex-col gap-8 p-4"
      >
        <div className="flex flex-col gap-2">
          <SectionTitle>
            <span>Overview</span>
            <Chip color="green" outline className="ml-auto normal-case">
              Synced
            </Chip>
          </SectionTitle>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-lg font-semibold">acme-marketing</span>
            <span className="font-mono text-cladd-fg-softer">v2.4.1</span>
          </div>
          <p className="text-cladd-fg-soft">
            Landing pages, lifecycle emails, and the press kit microsite. Last
            deploy 14 minutes ago.
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            <Chip color="brand">marketing</Chip>
            <Chip color="cyan">nextjs</Chip>
            <Chip color="purple">mdx</Chip>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <SectionTitle>
            <span>Recent activity</span>
            <button
              type="button"
              className="ml-auto cursor-pointer text-cladd-primary normal-case hover:underline"
            >
              View all
            </button>
          </SectionTitle>
          <List className="-mx-4">
            <ListItem>
              <span className="text-sm">Deployed v2.4.1</span>
              <span className="ml-auto font-mono text-cladd-fg-softer">
                14m
              </span>
            </ListItem>
            <ListSeparator />
            <ListItem>
              <span className="text-sm">Anna merged "lifecycle-emails"</span>
              <span className="ml-auto font-mono text-cladd-fg-softer">2h</span>
            </ListItem>
            <ListSeparator />
            <ListItem>
              <span className="text-sm">Press kit page published</span>
              <span className="ml-auto font-mono text-cladd-fg-softer">1d</span>
            </ListItem>
          </List>
        </div>
      </Surface>
    </Example>
  );
}

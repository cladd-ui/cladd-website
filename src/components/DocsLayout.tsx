import { ListButton, SectionTitle } from '@cladd-ui/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { SiteLayout } from './SiteLayout';

interface DocsLayoutProps {
  children: ReactNode;
  /** Full <title> string. Forwarded to SiteLayout. */
  title: string;
  /** Meta description. Forwarded to SiteLayout. */
  description: string;
}

const componentNames = [
  'Backdrop',
  'Button',
  'Checkbox',
  'Chip',
  'Dialog',
  'Input',
  'Link',
  'List',
  'ListButton',
  'ListItem',
  'ListSeparator',
  'ListTitle',
  'NumberField',
  'OTPField',
  'OTPFieldInput',
  'OTPFieldSeparator',
  'Popover',
  'Popup',
  'PopupContent',
  'Radio',
  'SearchField',
  'SectionTitle',
  'Segmented',
  'SegmentedButton',
  'Select',
  'Shortcut',
  'Slider',
  'Spinner',
  'Surface',
  'SurfaceCut',
  'SurfaceCutContent',
  'Switch',
  'Textarea',
  'Toast',
  'Toolbar',
  'ToolbarButton',
  'ToolbarSeparator',
  'Tooltip',
  'TooltipPrimitive',
  'UIProvider',
];

function toKebab(s: string) {
  return s
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const sections: { title: string; links: { label: string; href: string }[] }[] =
  [
    {
      title: 'Getting started',
      links: [
        { label: 'Introduction', href: '/react/' },
        { label: 'Installation', href: '/react/installation/' },
      ],
    },
    {
      title: 'Components',
      links: componentNames.map((name) => ({
        label: name,
        href: `/react/components/${toKebab(name)}/`,
      })),
    },
  ];

export function DocsLayout({ children, title, description }: DocsLayoutProps) {
  return (
    <SiteLayout title={title} description={description}>
      <div className="mx-auto grid max-w-7xl grid-cols-[220px_1fr] gap-10 px-6 py-10">
        <aside className="flex flex-col gap-6 text-sm">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <SectionTitle>{section.title}</SectionTitle>
              <ul className="flex flex-col">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <ListButton
                      as={Link}
                      href={link.href}
                      className="cursor-pointer"
                      contentClassName="font-normal text-sm"
                    >
                      {link.label}
                    </ListButton>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
        <article className="prose max-w-none">{children}</article>
      </div>
    </SiteLayout>
  );
}

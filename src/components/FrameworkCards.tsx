import { Button } from '@cladd-ui/react';
import NextLink from 'next/link';
import type { ComponentType, SVGProps } from 'react';

import { AstroIcon } from './icons/AstroIcon';
import { NextjsIcon } from './icons/NextjsIcon';
import { ReactIcon } from './icons/ReactIcon';
import { ReactRouterIcon } from './icons/ReactRouterIcon';
import { TanstackIcon } from './icons/TanstackIcon';
import { ViteIcon } from './icons/ViteIcon';

interface Framework {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const frameworks: Framework[] = [
  { label: 'Next.js', href: '/react/installation/next/', Icon: NextjsIcon },
  { label: 'Vite', href: '/react/installation/vite/', Icon: ViteIcon },
  {
    label: 'TanStack Start',
    href: '/react/installation/tanstack-start/',
    Icon: TanstackIcon,
  },
  {
    label: 'React Router',
    href: '/react/installation/react-router/',
    Icon: ReactRouterIcon,
  },
  { label: 'Astro', href: '/react/installation/astro/', Icon: AstroIcon },
  { label: 'Manual', href: '/react/installation/manual/', Icon: ReactIcon },
];

export function FrameworkCards() {
  return (
    <div className="not-prose grid grid-cols-2 gap-4 md:grid-cols-3">
      {frameworks.map(({ label, href, Icon }) => (
        <Button
          key={href}
          as={NextLink}
          href={href}
          multiline
          className="cursor-pointer rounded-2xl"
          contentClassName="flex flex-col items-center justify-center gap-4 px-8 py-16"
        >
          <Icon className="size-12!" />
          <span className="text-sm font-medium">{label}</span>
        </Button>
      ))}
    </div>
  );
}

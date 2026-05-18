import { Surface, SurfaceCut } from '@cladd-ui/react';
import type { ReactNode } from 'react';

import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { MarketingKicker, MarketingTitle } from '../Marketing';

interface FitRow {
  text: string;
}

interface AltRow {
  text: string;
  alt: string;
}

const FITS: FitRow[] = [
  { text: 'Building an editor, dashboard, or internal tool' },
  { text: 'Users will spend hours in it, not seconds' },
  { text: 'You want dense, breathable UIs with depth' },
  { text: 'Dark-first is a feature, not a chore' },
  { text: 'You want decisions made — not a blank canvas' },
];

const ALTS: AltRow[] = [
  { text: 'Marketing site or landing page', alt: 'shadcn · Tailwind UI' },
  {
    text: 'You want unstyled primitives to skin yourself',
    alt: 'Radix · Base UI · React Aria',
  },
  {
    text: 'You need a massive component catalog',
    alt: 'Material UI · Ant Design',
  },
  { text: "You're on Vue or Svelte", alt: 'cladd is React only, sorry' },
];

function ColumnHeader({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm font-semibold tracking-tight text-cladd-fg">
      {children}
    </h3>
  );
}

export function IsCladdForYou() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <MarketingKicker>Is cladd for you?</MarketingKicker>
        <MarketingTitle>
          Built for one kind of job. Not every kind.
        </MarketingTitle>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Surface
          outline
          variant="gradient"
          className="rounded-2xl"
          contentClassName="flex flex-col gap-4 p-4 sm:p-8"
        >
          <ColumnHeader>Reach for cladd when…</ColumnHeader>
          <ul className="flex flex-col gap-4">
            {FITS.map((row) => (
              <li
                key={row.text}
                className="flex items-start gap-2 text-sm leading-snug text-cladd-fg-soft"
              >
                <span className="cladd-color-green mt-0.5 inline-flex shrink-0">
                  <CheckIcon className="size-4 text-cladd-primary" />
                </span>
                <span>{row.text}</span>
              </li>
            ))}
          </ul>
        </Surface>
        <SurfaceCut
          outline
          className="rounded-2xl"
          contentClassName="flex flex-col gap-4 p-4 sm:p-8"
        >
          <ColumnHeader>Reach for something else when…</ColumnHeader>
          <ul className="flex flex-col gap-4">
            {ALTS.map((row) => (
              <li key={row.text} className="flex items-start gap-2">
                <ArrowRightIcon className="mt-0.5 size-4 shrink-0 text-cladd-fg-softer" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm leading-snug text-cladd-fg-soft">
                    {row.text}
                  </span>
                  <span className="text-xs text-cladd-fg-softer">
                    {row.alt}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </SurfaceCut>
      </div>
    </section>
  );
}

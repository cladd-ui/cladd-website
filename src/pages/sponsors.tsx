import {
  Button,
  Link,
  SectionTitle,
  Surface,
  SurfaceCut,
} from '@cladd-ui/react';

import { CheckIcon } from '@/components/icons/CheckIcon';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { SiteLayout } from '@/components/SiteLayout';
import {
  GITHUB_SPONSORS_URL,
  goldSponsors,
  regularSponsors,
  SponsorLogo,
  SponsorPlaceholder,
  SPONSORS_PORTAL_URL,
  type Sponsor,
  type SponsorPlan,
} from '@/components/Sponsors';

interface Tier {
  plan: SponsorPlan;
  perks: string[];
}

const TIERS: Tier[] = [
  {
    plan: 'Gold Sponsor',
    perks: [
      'Logo in the docs side navigation',
      'Large logo on the cladd.io homepage',
      'Large logo on this page',
      'Logo in the GitHub README and BACKERS.md',
    ],
  },
  {
    plan: 'Sponsor',
    perks: [
      'Logo on the cladd.io homepage',
      'Logo on this page',
      'Logo in the GitHub README and BACKERS.md',
    ],
  },
];

function PerkList({ perks }: { perks: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {perks.map((perk) => (
        <li
          key={perk}
          className="flex items-start gap-2 text-sm leading-snug text-cladd-fg-soft"
        >
          <CheckIcon className="mt-0.5 size-4 shrink-0 text-cladd-primary" />
          <span>{perk}</span>
        </li>
      ))}
    </ul>
  );
}

function TierCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {TIERS.map(({ plan, perks }) => {
        const gold = plan === 'Gold Sponsor';
        const Root = gold ? Surface : SurfaceCut;
        return (
          <Root
            key={plan}
            outline
            {...(gold ? { variant: 'gradient' as const } : {})}
            className="rounded-2xl"
            contentClassName="flex flex-col gap-4 p-4 sm:p-8"
          >
            <h2 className="text-lg font-semibold tracking-tight text-cladd-fg">
              {plan}
            </h2>
            <PerkList perks={perks} />
            <Button
              as="a"
              href={SPONSORS_PORTAL_URL}
              target="_blank"
              rel="noopener"
              color={gold ? 'brand' : undefined}
              variant={gold ? undefined : 'solid'}
              size="lg"
              rounded
              className="mt-auto self-start"
              contentClassName="px-4"
            >
              Become a {plan}
            </Button>
          </Root>
        );
      })}
    </div>
  );
}

function TierLogos({
  plan,
  items,
  tileClassName,
}: {
  plan: SponsorPlan;
  items: Sponsor[];
  tileClassName: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>{plan}s</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {items.map((sponsor, index) => (
          <SponsorLogo
            key={sponsor.title + index}
            sponsor={sponsor}
            className={tileClassName}
          />
        ))}
        <SponsorPlaceholder plan={plan} className={tileClassName} />
      </div>
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <SiteLayout
      title="Sponsors — Cladd"
      description="Support cladd and get your logo on cladd.io and in the GitHub repo."
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-16 sm:px-6">
        <section className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white light:text-black">
            Sponsor cladd
          </h1>
          <p className="max-w-2xl text-base text-cladd-fg-soft">
            Cladd is MIT-licensed and free forever. Sponsorships fund the time
            that goes into new components, docs, and fixes. Sponsor through the{' '}
            <Link
              as="a"
              color="brand"
              href={SPONSORS_PORTAL_URL}
              target="_blank"
            >
              sponsors portal
            </Link>{' '}
            to get your logo and link featured on cladd.io and in the GitHub
            repo, or support the developer directly on{' '}
            <Link
              as="a"
              color="brand"
              href={GITHUB_SPONSORS_URL}
              target="_blank"
            >
              GitHub Sponsors
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              as="a"
              href={SPONSORS_PORTAL_URL}
              target="_blank"
              rel="noopener"
              color="brand"
              size="xl"
              rounded
              contentClassName="px-8 text-sm"
            >
              Become a sponsor
            </Button>
            <Button
              as="a"
              href={GITHUB_SPONSORS_URL}
              target="_blank"
              rel="noopener"
              size="xl"
              variant="solid"
              rounded
              contentClassName="px-8 text-sm"
            >
              <GithubIcon className="size-4" />
              GitHub Sponsors
            </Button>
          </div>
        </section>

        <TierCards />

        <section className="flex flex-col gap-8">
          <TierLogos
            plan="Gold Sponsor"
            items={goldSponsors}
            tileClassName="size-24 p-2"
          />
          <TierLogos
            plan="Sponsor"
            items={regularSponsors}
            tileClassName="size-16"
          />
        </section>
      </div>
    </SiteLayout>
  );
}

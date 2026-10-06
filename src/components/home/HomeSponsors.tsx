import { Button, Link } from '@cladd-ui/react';
import NextLink from 'next/link';

import { HeartIcon } from '../icons/HeartIcon';
import { MarketingKicker, MarketingText, MarketingTitle } from '../Marketing';
import {
  GITHUB_SPONSORS_URL,
  goldSponsors,
  regularSponsors,
  SponsorLogo,
  SPONSORS_PORTAL_URL,
} from '../Sponsors';

export function HomeSponsors() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 pb-24 text-center sm:px-6">
      <div className="flex flex-col items-center gap-2">
        <MarketingKicker>Sponsors</MarketingKicker>
        <MarketingTitle>Keep cladd free and moving.</MarketingTitle>
        <MarketingText className="mt-2 max-w-xl">
          Sponsor cladd through the{' '}
          <Link as="a" color="brand" href={SPONSORS_PORTAL_URL} target="_blank">
            sponsors portal
          </Link>{' '}
          and get your logo and link featured on the website, or support the
          developer on{' '}
          <Link as="a" color="brand" href={GITHUB_SPONSORS_URL} target="_blank">
            GitHub Sponsors
          </Link>
          .
        </MarketingText>
      </div>

      {goldSponsors.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {goldSponsors.map((sponsor, index) => (
            <SponsorLogo
              key={sponsor.title + index}
              sponsor={sponsor}
              className="size-24 p-2"
            />
          ))}
        </div>
      )}
      {regularSponsors.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {regularSponsors.map((sponsor, index) => (
            <SponsorLogo
              key={sponsor.title + index}
              sponsor={sponsor}
              className="size-16"
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
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
          as={NextLink}
          href="/sponsors/"
          size="xl"
          variant="solid"
          rounded
          contentClassName="px-8 text-sm"
        >
          <span className="cladd-color-pink inline-flex">
            <HeartIcon className="size-4 text-cladd-primary" />
          </span>
          All sponsors
        </Button>
      </div>
    </section>
  );
}

import { cn, Link, SectionTitle, Surface } from '@cladd-ui/react';

import sponsorsData from '@/generated/sponsors.json';

// Sponsor data is snapshotted at build time by scripts/fetch-sponsors.mjs
// from the nolimits4web sponsors portal — no runtime fetch.

export const SPONSORS_PORTAL_URL = 'https://sponsors.nolimits4web.com';
export const GITHUB_SPONSORS_URL = 'https://github.com/sponsors/nolimits4web';

export type SponsorPlan = 'Gold Sponsor' | 'Sponsor';

export interface Sponsor {
  title: string;
  link: string;
  image: string;
  plan: SponsorPlan;
  createdAt: string;
}

export const sponsors = sponsorsData as Sponsor[];
export const goldSponsors = sponsors.filter((s) => s.plan === 'Gold Sponsor');
export const regularSponsors = sponsors.filter((s) => s.plan === 'Sponsor');

// Logos arrive in whatever colors the sponsor uploaded, so they sit on a
// fixed white tile in both themes — same treatment as GitHub READMEs.
export function SponsorLogo({
  sponsor,
  className,
}: {
  sponsor: Sponsor;
  className?: string;
}) {
  const { title, link, image } = sponsor;
  const Tag = link ? 'a' : 'div';
  return (
    <Tag
      {...(link
        ? { href: link, target: '_blank', rel: 'sponsored noopener' }
        : {})}
      title={title}
      aria-label={title}
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-cladd-md bg-white p-1 text-sm font-semibold text-black outline outline-cladd-outline transition hover:opacity-80',
        className,
      )}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        title.slice(0, 1)
      )}
    </Tag>
  );
}

// "Your logo here" slot — shown next to real logos on the sponsors page so an
// empty tier still reads as an open invitation rather than a blank row.
export function SponsorPlaceholder({
  plan,
  className,
}: {
  plan: SponsorPlan;
  className?: string;
}) {
  return (
    <Surface
      as="a"
      href={SPONSORS_PORTAL_URL}
      target="_blank"
      rel="noopener"
      outline
      hoverable
      clickable
      aria-label={`Become a ${plan}`}
      title={`Become a ${plan}`}
      className={cn('shrink-0 rounded-cladd-md', className)}
      wrapContent={false}
    >
      <span className="relative flex size-full items-center justify-center text-center text-xs leading-tight text-cladd-fg-soft">
        Your logo here
      </span>
    </Surface>
  );
}

// Gold sponsors in the docs sidebar. Renders nothing until there's at least
// one — an empty "Sponsors" block above the nav would just be noise.
export function SidebarSponsors() {
  if (!goldSponsors.length) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 pr-2">
        <SectionTitle>Sponsors</SectionTitle>
        <Link
          as="a"
          color="brand"
          href={SPONSORS_PORTAL_URL}
          target="_blank"
          rel="noopener"
          className="text-xs"
        >
          Become a sponsor
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-2 px-2">
        {goldSponsors.map((sponsor, index) => (
          <SponsorLogo
            key={sponsor.title + index}
            sponsor={sponsor}
            className="aspect-square w-full"
          />
        ))}
      </div>
    </div>
  );
}

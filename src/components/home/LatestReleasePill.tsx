import { Link } from '@cladd-ui/react';
import NextLink from 'next/link';

import latestRelease from '@/generated/latest-release.json';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return dateFormatter.format(new Date(Date.UTC(y, m - 1, d)));
}

export function LatestReleasePill() {
  return (
    <Link
      as={NextLink}
      href="/changelog/"
      className="flex items-center gap-2 hover:opacity-75"
      color="brand"
    >
      <span>v{latestRelease.version}</span>
      <span className="text-cladd-fg-softer">released</span>
      <span>{formatDate(latestRelease.date)}</span>
    </Link>
  );
}

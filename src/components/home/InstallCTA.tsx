import { Button, Surface, SurfaceCut } from '@cladd-ui/react';
import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { CheckIcon } from '../icons/CheckIcon';
import { CopyIcon } from '../icons/CopyIcon';
import { GithubIcon } from '../icons/GithubIcon';
import { MarketingText, MarketingTitle } from '../Marketing';

const INSTALL_CMD = 'npm i @cladd-ui/react';

function InstallBlock() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1200);
  };

  return (
    <SurfaceCut
      outline
      className="w-full max-w-md rounded-cladd-lg"
      contentClassName="flex items-center gap-4 px-4 py-3"
    >
      <span className="text-cladd-fg-softer select-none">$</span>
      <code className="flex-1 font-mono text-sm text-cladd-fg select-all">
        {INSTALL_CMD}
      </code>
      <Button
        variant="transparent"
        outline={false}
        rounded
        size="sm"
        onClick={copy}
        aria-label="Copy install command"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </SurfaceCut>
  );
}

export function InstallCTA() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6">
      <Surface
        outline
        variant="gradient"
        className="rounded-2xl"
        contentClassName="flex flex-col items-center gap-8 px-8 py-16 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <MarketingTitle className="max-w-xl">
            Ready to build a real app?
          </MarketingTitle>
          <MarketingText>
            One install. No theme generator, no CLI scaffolding, no headless
            wiring to write yourself.
          </MarketingText>
        </div>
        <InstallBlock />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            as={NextLink}
            href="/react/"
            color="brand"
            size="2xl"
            rounded
            contentClassName="px-8 text-sm"
          >
            Get started
          </Button>
          <Button
            as="a"
            href="https://github.com/cladd-ui/cladd"
            target="_blank"
            rel="noreferrer"
            size="2xl"
            variant="solid"
            rounded
            contentClassName="px-8 text-sm"
          >
            <GithubIcon />
            Star on GitHub
          </Button>
        </div>
      </Surface>
    </section>
  );
}

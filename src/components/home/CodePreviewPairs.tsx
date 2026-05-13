import {
  Button,
  cn,
  Surface,
  SurfaceCut,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from '@cladd-ui/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { BoldIcon } from '../icons/BoldIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { CopyIcon } from '../icons/CopyIcon';
import { ItalicIcon } from '../icons/ItalicIcon';
import { UnderlineIcon } from '../icons/UnderlineIcon';
import { MarketingKicker, MarketingText, MarketingTitle } from '../Marketing';

interface PairProps {
  code: string;
  children: ReactNode;
  previewClassName?: string;
}

function Pair({ code, children, previewClassName }: PairProps) {
  return (
    <Surface
      outline
      variant="transparent"
      className="rounded-2xl"
      wrapContent={false}
    >
      <div className="flex flex-col-reverse md:grid md:grid-cols-2">
        <Surface
          variant="gradient"
          outline
          className="rounded-b-2xl md:rounded-l-2xl md:rounded-br-none"
        >
          <CodeBlock code={code} />
        </Surface>
        <div
          className={cn(
            'flex min-h-44 items-center justify-center p-8',
            previewClassName,
          )}
        >
          {children}
        </div>
      </div>
    </Surface>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('shiki').then(async ({ codeToHtml }) => {
      const out = await codeToHtml(code, {
        lang: 'tsx',
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
        transformers: [
          {
            pre(node) {
              delete node.properties.style;
              delete node.properties.tabindex;
            },
            code(node) {
              node.children = node.children.filter(
                (c) => c.type !== 'text' || c.value.trim() !== '',
              );
            },
            line(node) {
              node.properties['data-line'] = '';
            },
          },
        ],
      });
      if (!cancelled) setHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [code]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div data-rehype-pretty-code-figure="" className="relative h-full">
      {html ? (
        <div
          tabIndex={-1}
          className="overflow-x-auto px-8 py-6 text-[13px] leading-relaxed [&_pre]:bg-transparent [&_pre]:font-mono"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre
          tabIndex={-1}
          className="overflow-x-auto px-8 py-6 font-mono text-[13px] leading-relaxed text-cladd-fg-soft"
        >
          <code>{code}</code>
        </pre>
      )}
      <Button
        variant="transparent"
        outline={false}
        rounded
        size="sm"
        className="absolute top-2 right-2"
        onClick={copy}
        aria-label="Copy code"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}

const TOOLBAR_CODE = `<Toolbar size="sm">
  <ToolbarButton><BoldIcon /></ToolbarButton>
  <ToolbarButton><ItalicIcon /></ToolbarButton>
  <ToolbarButton><UnderlineIcon /></ToolbarButton>
  <ToolbarSeparator />
  <ToolbarButton color="brand" outline>
    Save
  </ToolbarButton>
</Toolbar>`;

const SURFACE_CODE = `<Surface level={1} outline>
  Outer
  <Surface outline>
    Nested — auto-bumps to level 2
    <SurfaceCut outline>
      Recessed cut inside
    </SurfaceCut>
  </Surface>
</Surface>`;

const BUTTON_CODE = `<Button color="brand" size="lg" variant="gradient-fill">
  Save changes
</Button>
<Button size="lg">Cancel</Button>`;

export function CodePreviewPairs() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <MarketingKicker>API</MarketingKicker>
        <MarketingTitle>Short code. Real output.</MarketingTitle>
        <MarketingText>
          No render props, no className gymnastics. Props that match the
          vocabulary of an actual UI.
        </MarketingText>
      </div>
      <div className="flex flex-col gap-4">
        <Pair code={TOOLBAR_CODE}>
          <Toolbar size="sm">
            <ToolbarButton>
              <BoldIcon />
            </ToolbarButton>
            <ToolbarButton>
              <ItalicIcon />
            </ToolbarButton>
            <ToolbarButton>
              <UnderlineIcon />
            </ToolbarButton>
            <ToolbarSeparator />
            <ToolbarButton color="brand" variant="gradient" outline>
              Save
            </ToolbarButton>
          </Toolbar>
        </Pair>
        <Pair code={SURFACE_CODE}>
          <Surface
            level={1}
            outline
            className="w-full max-w-sm rounded-2xl"
            contentClassName="flex flex-col gap-2 p-4"
          >
            <span className="text-xs text-cladd-fg-soft">Outer</span>
            <Surface
              outline
              className="rounded-2xl"
              contentClassName="flex flex-col gap-2 p-4"
            >
              <span className="text-xs text-cladd-fg-soft">
                Nested — level 2
              </span>
              <SurfaceCut
                outline
                className="rounded-2xl"
                contentClassName="p-4"
              >
                <span className="text-xs text-cladd-fg-soft">Recessed</span>
              </SurfaceCut>
            </Surface>
          </Surface>
        </Pair>
        <Pair code={BUTTON_CODE}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button color="brand" size="lg" variant="gradient-fill">
              Save changes
            </Button>
            <Button size="lg">Cancel</Button>
          </div>
        </Pair>
      </div>
    </section>
  );
}

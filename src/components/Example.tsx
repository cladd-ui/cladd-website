import { Button, cn, Surface, Toolbar, ToolbarButton } from '@cladd-ui/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { CheckIcon } from './icons/CheckIcon';
import { CopyIcon } from './icons/CopyIcon';

interface ExampleProps {
  /** The demo itself — rendered in the centered preview area. */
  children: ReactNode;
  /** Optional controls strip rendered below the preview, separated by a hairline. */
  controls?: ReactNode;
  /** JSX template extracted from this Example's children at build time
   *  (see scripts/extract-example-source.mjs). */
  source?: string;
  /** Live values for any `{name}` placeholders in `source`. Strings render
   *  as quoted attrs, `true` renders as a flag attr, `false` removes the attr,
   *  numbers render as `{n}` expressions. */
  state?: Record<string, unknown>;
  /** Extra classes on the outer Surface. */
  className?: string;
  /** Extra classes on the preview area (override min-height, padding, layout). */
  previewClassName?: string;
  /** Extra classes on the controls strip. */
  controlsClassName?: string;
  /** Wrap the preview children in a raised `<Surface outline>` so recessed
   *  controls (Input, SurfaceCut, etc.) read against a lifted background.
   *  Visual chrome only — not included in the extracted source. */
  previewSurface?: boolean;
}

export function Example({
  children,
  controls,
  source,
  state,
  className,
  previewClassName,
  controlsClassName,
  previewSurface,
}: ExampleProps) {
  const code = source ? fillTemplate(source, state) : null;
  const preview = previewSurface ? (
    <div className="flex min-h-55 flex-1 items-center justify-center p-8">
      <Surface
        outline
        className="rounded-2xl"
        variant="gradient"
        contentClassName={cn(
          'flex items-center justify-center p-4',
          previewClassName,
        )}
      >
        {children}
      </Surface>
    </div>
  ) : (
    <div
      className={cn(
        'flex min-h-55 flex-1 items-center justify-center p-8',
        previewClassName,
      )}
    >
      {children}
    </div>
  );
  return (
    <Surface
      variant="transparent"
      className={cn(
        'not-prose my-6 rounded-2xl text-sm [&_.font-mono]:text-[13px] [&_code]:text-[13px]',
        className,
      )}
      wrapContent={false}
      outline
    >
      <div className="flex flex-col">
        {preview}
        {controls ? (
          <div
            className={cn(
              'flex flex-wrap items-center justify-center gap-1 border-t border-cladd-outline/60 p-4',
              controlsClassName,
            )}
          >
            {controls}
          </div>
        ) : null}
        {code ? <ExampleCode code={code} /> : null}
      </div>
    </Surface>
  );
}

// Resolve `{name}` placeholders against the current state map. Operates on
// the raw template string — no parsing — so it stays cheap to run on every
// render.
function fillTemplate(template: string, state?: Record<string, unknown>) {
  if (!state) return template;
  let out = template;
  function attrPattern(name: string) {
    return new RegExp(`(\\w+)=\\{${name}\\}`, 'g');
  }
  for (const [name, value] of Object.entries(state)) {
    if (typeof value === 'boolean') {
      // True → flag attribute (idiomatic JSX). False → explicit `prop={false}`
      // so toggles read correctly when the prop's default is `true`
      // (e.g. Toolbar/Segmented `rounded`).
      out = out.replace(attrPattern(name), value ? '$1' : '$1={false}');
    } else if (typeof value === 'string') {
      out = out.replace(attrPattern(name), `$1="${value}"`);
    } else if (typeof value === 'number') {
      out = out.replace(attrPattern(name), `$1={${value}}`);
    } else {
      out = out.replace(attrPattern(name), `$1={${JSON.stringify(value)}}`);
    }
  }
  // Anything still on the form `{name}` is now a child/text expression.
  for (const [name, value] of Object.entries(state)) {
    out = out.replace(new RegExp(`\\{${name}\\}`, 'g'), String(value));
  }
  return out;
}

function ExampleCode({ code }: { code: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
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

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Surface
      data-rehype-pretty-code-figure=""
      outline={!collapsed}
      className={cn('relative mx-2 mb-2 rounded-xl')}
      contentClassName={cn()}
      wrapContent={false}
    >
      <div
        className={cn(
          collapsed &&
            'max-h-24 overflow-hidden mask-linear-180 mask-linear-from-black/50 mask-linear-to-transparent',
          'relative',
        )}
      >
        {html ? (
          <div
            tabIndex={-1}
            className={cn(
              'overflow-x-auto py-4 leading-relaxed [&_pre]:bg-transparent',
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre
            tabIndex={-1}
            className="overflow-x-auto px-4 py-4 font-mono leading-relaxed text-cladd-fg-soft"
          >
            <code>{code}</code>
          </pre>
        )}
      </div>

      {collapsed && (
        <Toolbar
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          surfaceLevel={3}
        >
          <ToolbarButton onClick={() => setCollapsed(false)}>
            View Code
          </ToolbarButton>
        </Toolbar>
      )}
      {!collapsed && (
        <Button
          variant="transparent"
          outline={false}
          rounded
          className="absolute top-1 right-1 z-1"
          onClick={copy}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      )}
    </Surface>
  );
}

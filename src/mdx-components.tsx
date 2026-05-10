import { Button, Surface } from '@cladd-ui/react';
import type { MDXComponents } from 'mdx/types';
import { useRef, useState } from 'react';

import { CheckIcon } from './components/icons/CheckIcon';
import { CopyIcon } from './components/icons/CopyIcon';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: ({ children, className, ...rest }) => {
      const [copied, setCopied] = useState(false);
      const preRef = useRef<HTMLPreElement>(null);
      const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
      const copy = () => {
        const text = preRef.current?.textContent ?? '';
        navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, 1000);
      };
      return (
        <Surface
          variant="solid"
          outline
          className="my-4 rounded-2xl"
          wrapContent={false}
        >
          <pre
            ref={preRef}
            {...rest}
            className={`relative overflow-x-auto py-4 text-sm leading-relaxed ${className ?? ''}`}
          >
            {children}
          </pre>
          <Button
            variant="transparent"
            rounded
            className="absolute top-1 right-1 z-1"
            onClick={copy}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </Surface>
      );
    },
  };
}

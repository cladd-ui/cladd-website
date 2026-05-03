import { SurfaceCut } from '@cladd-ui/react';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: ({ children, className, ...rest }) => (
      <SurfaceCut className="my-4 rounded-2xl" wrapContent={false}>
        <pre
          {...rest}
          className={`relative overflow-x-auto py-4 text-sm leading-relaxed ${className ?? ''}`}
        >
          {children}
        </pre>
      </SurfaceCut>
    ),
  };
}

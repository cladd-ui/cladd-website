import { cn, SurfaceCut } from '@cladd-ui/react';
import type { ReactNode } from 'react';

interface ExampleProps {
  /** The demo itself — rendered in the centered preview area. */
  children: ReactNode;
  /** Optional controls strip rendered below the preview, separated by a hairline. */
  controls?: ReactNode;
  /** Extra classes on the outer SurfaceCut. */
  className?: string;
  /** Extra classes on the preview area (override min-height, padding, layout). */
  previewClassName?: string;
  /** Extra classes on the controls strip. */
  controlsClassName?: string;
}

export function Example({
  children,
  controls,
  className,
  previewClassName,
  controlsClassName,
}: ExampleProps) {
  return (
    <SurfaceCut
      className={cn('my-6 rounded-2xl', className)}
      wrapContent={false}
    >
      <div className="flex flex-col">
        <div
          className={cn(
            'flex min-h-[220px] flex-1 items-center justify-center p-8',
            previewClassName,
          )}
        >
          {children}
        </div>
        {controls ? (
          <div
            className={cn(
              'flex flex-wrap items-center justify-center gap-3 border-t border-cladd-outline/60 px-3 py-3',
              controlsClassName,
            )}
          >
            {controls}
          </div>
        ) : null}
      </div>
    </SurfaceCut>
  );
}

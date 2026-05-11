import { Backdrop, Button, Spinner, Surface } from '@cladd-ui/react';
import { useEffect, useState } from 'react';

import { EXAMPLE_SOURCE } from '@/generated/example-source/backdrop';

import { Example } from '../Example';

export function OverviewExample() {
  const [open, setOpen] = useState(false);
  return (
    <Example source={EXAMPLE_SOURCE.OverviewExample}>
      <Button onClick={() => setOpen(true)}>Show overlay</Button>
      {open && (
        <>
          <Backdrop onClick={() => setOpen(false)} />
          <Surface
            outline
            className="fixed top-1/2 left-1/2 z-50 w-80 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-cladd-dialog"
            contentClassName="flex flex-col gap-4 p-4"
          >
            <h2 className="text-cladd-lg font-semibold">Custom overlay</h2>
            <p className="text-cladd-fg-soft">
              The card sits as a sibling of the backdrop. Click the dimmed area
              to dismiss, or use the button below.
            </p>
            <Button onClick={() => setOpen(false)} className="self-end">
              Close
            </Button>
          </Surface>
        </>
      )}
    </Example>
  );
}

export function LoadingScrimExample() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, [loading]);
  return (
    <Example source={EXAMPLE_SOURCE.LoadingScrimExample}>
      <Button onClick={() => setLoading(true)} disabled={loading}>
        Run task
      </Button>
      {loading && (
        <Backdrop className="flex items-center justify-center gap-4">
          <Spinner size="lg" color="brand" />
          <span className="text-cladd-fg">Working…</span>
        </Backdrop>
      )}
    </Example>
  );
}

export function TintedExample() {
  const [open, setOpen] = useState(false);
  return (
    <Example source={EXAMPLE_SOURCE.TintedExample}>
      <Button onClick={() => setOpen(true)}>Show tinted backdrop</Button>
      {open && (
        <Backdrop
          onClick={() => setOpen(false)}
          className="bg-cladd-primary/30 backdrop-blur-sm"
        />
      )}
    </Example>
  );
}

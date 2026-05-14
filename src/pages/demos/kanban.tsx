import { Spinner } from '@cladd-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const KanbanDemo = dynamic(
  () =>
    import('@/components/demos/KanbanDemo').then((m) => ({
      default: m.KanbanDemo,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <Spinner size="xl" />
      </div>
    ),
  },
);

export default function KanbanDemoPage() {
  return (
    <>
      <Head>
        <title>Kanban demo — cladd</title>
        <meta
          name="description"
          content="A dense kanban board built entirely from cladd primitives."
        />
      </Head>
      <div className="h-full w-full overflow-hidden bg-cladd-bg">
        <KanbanDemo />
      </div>
    </>
  );
}

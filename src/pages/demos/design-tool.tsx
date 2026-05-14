import { Spinner } from '@cladd-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const DesignToolDemo = dynamic(
  () =>
    import('@/components/demos/DesignToolDemo').then((m) => ({
      default: m.DesignToolDemo,
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

export default function DesignToolDemoPage() {
  return (
    <>
      <Head>
        <title>Design tool demo — cladd</title>
        <meta
          name="description"
          content="A design tool built entirely from cladd primitives."
        />
      </Head>
      <div className="h-screen w-screen overflow-hidden bg-cladd-bg">
        <DesignToolDemo />
      </div>
    </>
  );
}

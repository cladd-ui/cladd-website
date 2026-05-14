import { Spinner } from '@cladd-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const SettingsDemo = dynamic(
  () =>
    import('@/components/demos/SettingsDemo').then((m) => ({
      default: m.SettingsDemo,
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

export default function SettingsDemoPage() {
  return (
    <>
      <Head>
        <title>Settings demo — cladd</title>
        <meta
          name="description"
          content="A dense settings pane built entirely from cladd primitives."
        />
      </Head>
      <div className="h-screen w-screen overflow-hidden bg-cladd-bg">
        <SettingsDemo />
      </div>
    </>
  );
}

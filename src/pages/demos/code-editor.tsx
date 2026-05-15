import { Spinner } from '@cladd-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const CodeEditorDemo = dynamic(
  () =>
    import('@/components/demos/CodeEditorDemo').then((m) => ({
      default: m.CodeEditorDemo,
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

export default function CodeEditorDemoPage() {
  return (
    <>
      <Head>
        <title>Code editor demo — cladd</title>
        <meta
          name="description"
          content="A code editor shell built entirely from cladd primitives."
        />
      </Head>
      <div className="h-screen w-screen overflow-hidden bg-cladd-bg">
        <CodeEditorDemo />
      </div>
    </>
  );
}

import createMDX from '@next/mdx';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  // Don't paint the Shiki theme background — let cladd's surface show through.
  keepBackground: false,
  // Block-only fallback. Leaving `inline` unset means plain `\`code\`` stays
  // as a vanilla <code> element (no Shiki wrapping) and renders as a chip via
  // CSS. Add `{:lang}` to opt an inline span into highlighting.
  defaultLang: {
    block: 'plaintext',
  },
};

/** @type {import('rehype-autolink-headings').Options} */
const autolinkOptions = {
  behavior: 'wrap',
  properties: {
    className: ['heading-anchor'],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Plugins are passed as module specifier strings so Turbopack can
    // serialize the loader options (Next 16 default bundler).
    rehypePlugins: [
      'rehype-slug',
      ['rehype-autolink-headings', autolinkOptions],
      ['rehype-pretty-code', prettyCodeOptions],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default withMDX(nextConfig);

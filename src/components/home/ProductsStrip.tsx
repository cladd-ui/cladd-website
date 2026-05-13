import { MarketingKicker } from '../Marketing';

interface Product {
  name: string;
  title: string;
  href: string;
  src: string;
}

const PRODUCTS: Product[] = [
  {
    name: 't0ggles',
    title: 't0ggles — multiple-projects management tool',
    href: 'https://t0ggles.com',
    src: '/assets/products/logo-t0ggles.svg',
  },
  {
    name: 'PaneFlow',
    title: 'PaneFlow — visual slideshow builder',
    href: 'https://paneflow.com',
    src: '/assets/products/logo-paneflow.svg',
  },
  {
    name: 'Swiper Studio',
    title: 'Swiper Studio — visual slider editor',
    href: 'https://studio.swiperjs.com',
    src: '/assets/products/logo-swiper-studio.svg',
  },
  {
    name: 'Start Page HQ',
    title: 'Start Page HQ — homepage replacement',
    href: 'https://startpagehq.com',
    src: '/assets/products/logo-startpagehq.svg',
  },
];

export function ProductsStrip() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-4 pb-24 text-center sm:px-6">
      <MarketingKicker>Built with cladd</MarketingKicker>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {PRODUCTS.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            title={p.title}
            aria-label={p.title}
            className="flex items-center gap-2 text-sm text-cladd-fg-softer opacity-70 grayscale transition hover:text-cladd-fg hover:opacity-100 hover:grayscale-0"
          >
            <img loading="lazy" src={p.src} alt={p.name} className="size-8" />
            <span className="hidden sm:inline">{p.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

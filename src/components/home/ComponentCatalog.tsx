import { ComponentTilesGrid } from '../ComponentTilesGrid';
import { componentNames } from '../componentNames';
import { MarketingKicker, MarketingText, MarketingTitle } from '../Marketing';

export function ComponentCatalog() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <MarketingKicker>Catalog</MarketingKicker>
        <MarketingTitle>Every part of an app shell, in the box.</MarketingTitle>
        <MarketingText>
          {componentNames.length} components — not headless primitives. Every
          one ships styled, sized, and ready for a real product.
        </MarketingText>
      </div>
      <ComponentTilesGrid />
    </section>
  );
}

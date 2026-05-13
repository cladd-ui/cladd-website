/** Source of truth for the component documentation list.
 *  Shared by the docs sidebar (DocsLayout) and the home-page catalog tile grid
 *  so adding a new component in one place flows through to the other. */
export const componentNames = [
  'Backdrop',
  'Button',
  'Checkbox',
  'Chip',
  'Dialog',
  'Input',
  'Link',
  'List',
  'NumberField',
  'NumberScrubber',
  'OTPField',
  'Popover',
  'Popup',
  'Radio',
  'SearchField',
  'SectionTitle',
  'Segmented',
  'Select',
  'Shortcut',
  'Slider',
  'Spinner',
  'Surface',
  'SurfaceCut',
  'Switch',
  'Textarea',
  'Toast',
  'Toolbar',
  'Tooltip',
  'CladdProvider',
] as const;

export type ComponentName = (typeof componentNames)[number];

export function componentHref(name: string) {
  const kebab = name
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  return `/react/components/${kebab}/`;
}

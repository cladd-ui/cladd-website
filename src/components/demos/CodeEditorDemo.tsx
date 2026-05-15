import {
  Button,
  Chip,
  cn,
  List,
  ListButton,
  SectionTitle,
  Shortcut,
  Surface,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
  type Color,
} from '@cladd-ui/react';
import { type SVGProps, useState } from 'react';

import { CladdLogo } from '../CladdLogo';
import { SidebarIcon } from '../icons/SidebarIcon';

// ---------- Icons ----------

function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path
        d="M6 4l4 4-4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 6l4 4 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <circle cx="7" cy="7" r="4.5" strokeWidth="1.5" />
      <path d="M10.5 10.5l3 3" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function SplitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" strokeWidth="1.4" />
      <path d="M8 2.5v11" strokeWidth="1.4" />
    </svg>
  );
}

function PanelBottomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" {...props}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" strokeWidth="1.4" />
      <path d="M2.5 10h11" strokeWidth="1.4" />
    </svg>
  );
}

function GitBranchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M13.25,5c-.414,0-.75,.336-.75,.75v1c0,.689-.561,1.25-1.25,1.25H6.75c-.452,0-.873,.12-1.25,.314v-2.564c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v6.5c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.5c0-.689,.561-1.25,1.25-1.25h4.5c1.517,0,2.75-1.233,2.75-2.75v-1c0-.414-.336-.75-.75-.75Z"></path>
        <circle cx="4.75" cy="3.75" r="2.5"></circle>
        <circle cx="13.25" cy="3.75" r="2.5"></circle>
        <circle cx="4.75" cy="14.25" r="2.5"></circle>
      </g>
    </svg>
  );
}

function ErrorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm-.75 3h1.5v4.75h-1.5V4.5zm0 6h1.5v1.5h-1.5v-1.5z" />
    </svg>
  );
}

function WarningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M16.4364 12.5151L11.0101 3.11316C10.5902 2.39096 9.83872 1.96045 8.99982 1.96045C8.16092 1.96045 7.40952 2.39106 6.98952 3.11316C6.98902 3.11366 6.98902 3.11473 6.98852 3.11523L1.56272 12.5156C1.14332 13.2436 1.14332 14.1128 1.56372 14.8398C1.98362 15.5664 2.73562 16 3.57492 16H14.4245C15.2639 16 16.0158 15.5664 16.4357 14.8398C16.8561 14.1127 16.8563 13.2436 16.4364 12.5151ZM8.24992 6.75C8.24992 6.3359 8.58582 6 8.99992 6C9.41402 6 9.74992 6.3359 9.74992 6.75V9.75C9.74992 10.1641 9.41402 10.5 8.99992 10.5C8.58582 10.5 8.24992 10.1641 8.24992 9.75V6.75ZM8.99992 13.5C8.44792 13.5 7.99992 13.0498 7.99992 12.5C7.99992 11.9502 8.44792 11.5 8.99992 11.5C9.55192 11.5 9.99992 11.9502 9.99992 12.5C9.99992 13.0498 9.55192 13.5 8.99992 13.5Z"></path>
      </g>
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M6.5,14c-.192,0-.384-.073-.53-.22l-3.75-3.75c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l3.22,3.22L14.72,3.97c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061L7.03,13.78c-.146,.146-.338,.22-.53,.22Z"></path>
      </g>
    </svg>
  );
}

function NewFileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M12.5,15.75v-.25h-.25c-1.241,0-2.25-1.009-2.25-2.25s1.009-2.25,2.25-2.25h.25v-.25c0-1.241,1.009-2.25,2.25-2.25,.462,0,.892,.141,1.25,.381v-2.217c0-.467-.182-.907-.513-1.237l-3.914-3.914c-.331-.331-.77-.513-1.237-.513H4.75c-1.517,0-2.75,1.233-2.75,2.75V14.25c0,1.517,1.233,2.75,2.75,2.75H12.881c-.24-.358-.381-.788-.381-1.25ZM10.5,2.579c.009-.004,.004-.001,.013-.005l3.922,3.921s-.001,.003-.002,.005h-2.932c-.55,0-1-.45-1-1V2.579Zm-4.75,3.421h2c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75h-2c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75Zm-.75,3.75c0-.414,.336-.75,.75-.75h4.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75H5.75c-.414,0-.75-.336-.75-.75Z"></path>
        <path d="M17.25,12.5h-1.75v-1.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.75h-1.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1.75v1.75c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.75h1.75c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"></path>
      </g>
    </svg>
  );
}

function NewFolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M10,14.75c0-1.241,1.009-2.25,2.25-2.25h.25v-.25c0-1.241,1.009-2.25,2.25-2.25,.71,0,1.337,.337,1.75,.853V6.25c0-1.516-1.233-2.75-2.75-2.75h-5.026l-.378-.471c-.525-.654-1.307-1.029-2.145-1.029h-1.951c-1.517,0-2.75,1.234-2.75,2.75V13.25c0,1.517,1.233,2.75,2.75,2.75h6.131c-.24-.358-.381-.788-.381-1.25ZM3,6.314v-1.564c0-.689,.561-1.25,1.25-1.25h1.951c.381,0,.737,.17,.975,.467l.603,.752c.142,.177,.357,.281,.585,.281h5.386c.689,0,1.25,.561,1.25,1.25v.064c-.377-.194-.798-.314-1.25-.314H4.25c-.452,0-.873,.12-1.25,.314Z"></path>
        <path d="M17.25,14h-1.75v-1.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.75h-1.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1.75v1.75c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.75h1.75c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"></path>
      </g>
    </svg>
  );
}

function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M8.99995 1C6.51035 1 4.23015 2.1479 2.73785 4.0332L2.62244 3.20215C2.56584 2.79195 2.18784 2.5048 1.77674 2.5625C1.36654 2.6191 1.07995 2.998 1.13715 3.4082L1.54534 6.35303C1.59714 6.72853 1.91834 7 2.28704 7C2.32124 7 2.35584 6.99756 2.39054 6.99316L5.33434 6.58606C5.74494 6.52896 6.03165 6.15056 5.97495 5.74036C5.91785 5.33016 5.53695 5.04843 5.12925 5.09973L3.67275 5.30139C4.87065 3.57289 6.83514 2.50012 8.99984 2.50012C12.5452 2.50012 15.3992 5.27453 15.4974 8.81653C15.5086 9.22373 15.8417 9.54602 16.2465 9.54602C16.2538 9.54602 16.2606 9.54603 16.2674 9.54553C16.6815 9.53433 17.0082 9.18951 16.9965 8.77551C16.8764 4.41511 13.3637 1 8.99995 1Z"></path>{' '}
        <path d="M15.6094 11.0068L12.6656 11.4139C12.255 11.471 11.9683 11.8494 12.025 12.2596C12.0821 12.6698 12.4601 12.9496 12.8707 12.9003L14.3274 12.6986C13.1286 14.4266 11.1622 15.4999 9.00009 15.4999C5.45419 15.4999 2.60019 12.7245 2.50249 9.18201C2.49129 8.76791 2.15038 8.4208 1.73248 8.453C1.31838 8.4642 0.991779 8.80902 1.00348 9.22302C1.12308 13.5838 4.63579 16.9999 9.00009 16.9999C11.4873 16.9999 13.7687 15.8494 15.2618 13.9637L15.3775 14.7979C15.4293 15.1734 15.7505 15.4448 16.1192 15.4448C16.1534 15.4448 16.188 15.4424 16.2232 15.4375C16.6334 15.3809 16.92 15.002 16.8628 14.5918L16.4546 11.647C16.398 11.2364 16.0166 10.9526 15.6094 11.0068Z"></path>
      </g>
    </svg>
  );
}

function CollapseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M15.25,6.5h-2.689l3.22-3.22c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0l-3.22,3.22V2.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75V7.25c0,.414,.336,.75,.75,.75h4.5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"></path>
        <path d="M7.25,10H2.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h2.689l-3.22,3.22c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l3.22-3.22v2.689c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-4.5c0-.414-.336-.75-.75-.75Z"></path>
      </g>
    </svg>
  );
}

function CircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <circle cx="8" cy="8" r="3.5" />
    </svg>
  );
}

function CloudArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M14.146,6.327c-.442-2.463-2.611-4.327-5.146-4.327-2.895,0-5.25,2.355-5.25,5.25,0,.128,.005,.258,.017,.39-1.604,.431-2.767,1.885-2.767,3.61,0,2.068,1.682,3.75,3.75,3.75h7.75c2.481,0,4.5-2.019,4.5-4.5,0-1.854-1.15-3.503-2.854-4.173Zm-2.366,3.204c-.146,.146-.338,.22-.53,.22s-.384-.073-.53-.22l-.97-.97v3.189c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-3.189l-.97,.97c-.293,.293-.768,.293-1.061,0s-.293-.768,0-1.061l2.25-2.25c.293-.293,.768-.293,1.061,0l2.25,2.25c.293,.293,.293,.768,0,1.061Z"></path>
      </g>
    </svg>
  );
}

// ---------- File icon ----------

type FileKind = 'tsx' | 'ts' | 'css' | 'json' | 'md';

const FILE_KIND_META: Record<FileKind, { label: string; color: Color }> = {
  tsx: { label: 'TSX', color: 'blue' },
  ts: { label: 'TS', color: 'cyan' },
  css: { label: '#', color: 'pink' },
  json: { label: '{}', color: 'yellow' },
  md: { label: 'M↓', color: 'neutral' },
};

function FileIcon({ kind, className }: { kind: FileKind; className?: string }) {
  const { label, color } = FILE_KIND_META[kind];
  return (
    <span
      className={cn(
        `cladd-color-${color}`,
        'inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded bg-cladd-primary/15 px-1 font-mono text-[8px] leading-none font-bold text-cladd-primary',
        className,
      )}
    >
      {label}
    </span>
  );
}

// ---------- Code tokens ----------

type TokenKind =
  | 'kw'
  | 'str'
  | 'fn'
  | 'tag'
  | 'attr'
  | 'imp'
  | 'num'
  | 'cmt'
  | 'p'
  | 'cssprop'
  | 'cssval';

const TOKEN_CLS: Record<TokenKind, string> = {
  kw: 'cladd-color-purple text-cladd-primary',
  str: 'cladd-color-orange text-cladd-primary',
  fn: 'cladd-color-yellow text-cladd-primary',
  tag: 'cladd-color-pink text-cladd-primary',
  attr: 'cladd-color-cyan text-cladd-primary',
  imp: 'cladd-color-blue text-cladd-primary',
  num: 'cladd-color-lime text-cladd-primary',
  cmt: 'text-cladd-fg-softest italic',
  p: 'text-cladd-fg-softer',
  cssprop: 'cladd-color-cyan text-cladd-primary',
  cssval: 'cladd-color-orange text-cladd-primary',
};

function T({ k, children }: { k: TokenKind; children: React.ReactNode }) {
  return <span className={TOKEN_CLS[k]}>{children}</span>;
}

function Line({
  n,
  active,
  onClick,
  children,
}: {
  n: number;
  active?: boolean;
  onClick?: (n: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={() => onClick?.(n)}
      className={cn(
        'group flex cursor-text items-center hover:bg-cladd-fg/[0.03]',
        active && 'bg-cladd-fg/[0.06]',
      )}
    >
      <span className="w-10 shrink-0 pr-3 text-right font-mono text-[11px] text-cladd-fg-softest tabular-nums select-none">
        {n}
      </span>
      <span className="flex-1 pr-4 font-mono text-[12.5px] leading-6 whitespace-pre text-cladd-fg">
        {children}
      </span>
    </div>
  );
}

// ---------- File contents ----------

function IndexFile({
  activeLine,
  onLineClick,
}: {
  activeLine: number;
  onLineClick: (n: number) => void;
}) {
  return (
    <>
      <Line n={1} active={activeLine === 1} onClick={onLineClick}>
        <T k="kw">import</T> <T k="p">{'{'}</T> <T k="imp">Surface</T>,{' '}
        <T k="imp">Toolbar</T>, <T k="imp">Button</T> <T k="p">{'}'}</T>{' '}
        <T k="kw">from</T> <T k="str">'@cladd-ui/react'</T>
        <T k="p">;</T>
      </Line>
      <Line n={2} active={activeLine === 2} onClick={onLineClick}>
        {' '}
      </Line>
      <Line n={3} active={activeLine === 3} onClick={onLineClick}>
        <T k="kw">export</T> <T k="kw">default</T> <T k="kw">function</T>{' '}
        <T k="fn">Page</T>
        <T k="p">{'()'}</T> <T k="p">{'{'}</T>
      </Line>
      <Line n={4} active={activeLine === 4} onClick={onLineClick}>
        {'  '}
        <T k="kw">return</T> <T k="p">(</T>
      </Line>
      <Line n={5} active={activeLine === 5} onClick={onLineClick}>
        {'    '}
        <T k="p">{'<'}</T>
        <T k="tag">Surface</T> <T k="attr">level</T>
        <T k="p">{'={'}</T>
        <T k="num">1</T>
        <T k="p">{'}>'}</T>
      </Line>
      <Line n={6} active={activeLine === 6} onClick={onLineClick}>
        {'      '}
        <T k="p">{'<'}</T>
        <T k="tag">Toolbar</T> <T k="attr">size</T>
        <T k="p">{'='}</T>
        <T k="str">"sm"</T>
        <T k="p">{'>'}</T>
      </Line>
      <Line n={7} active={activeLine === 7} onClick={onLineClick}>
        {'        '}
        <T k="p">{'<'}</T>
        <T k="tag">Button</T> <T k="attr">color</T>
        <T k="p">{'='}</T>
        <T k="str">"brand"</T> <T k="attr">size</T>
        <T k="p">{'='}</T>
        <T k="str">"lg"</T> <T k="attr">rounded</T>
        <T k="p">{'>'}</T>
      </Line>
      <Line n={8} active={activeLine === 8} onClick={onLineClick}>
        {'          '}Get started
      </Line>
      <Line n={9} active={activeLine === 9} onClick={onLineClick}>
        {'        '}
        <T k="p">{'</'}</T>
        <T k="tag">Button</T>
        <T k="p">{'>'}</T>
      </Line>
      <Line n={10} active={activeLine === 10} onClick={onLineClick}>
        {'      '}
        <T k="p">{'</'}</T>
        <T k="tag">Toolbar</T>
        <T k="p">{'>'}</T>
      </Line>
      <Line n={11} active={activeLine === 11} onClick={onLineClick}>
        {'    '}
        <T k="p">{'</'}</T>
        <T k="tag">Surface</T>
        <T k="p">{'>'}</T>
      </Line>
      <Line n={12} active={activeLine === 12} onClick={onLineClick}>
        {'  '}
        <T k="p">{');'}</T>
      </Line>
      <Line n={13} active={activeLine === 13} onClick={onLineClick}>
        <T k="p">{'}'}</T>
      </Line>
    </>
  );
}

function SurfaceFile({
  activeLine,
  onLineClick,
}: {
  activeLine: number;
  onLineClick: (n: number) => void;
}) {
  return (
    <>
      <Line n={1} active={activeLine === 1} onClick={onLineClick}>
        <T k="kw">import</T> <T k="p">{'{'}</T> <T k="imp">useSurfaceLevel</T>{' '}
        <T k="p">{'}'}</T> <T k="kw">from</T> <T k="str">'./useSurface'</T>
        <T k="p">;</T>
      </Line>
      <Line n={2} active={activeLine === 2} onClick={onLineClick}>
        <T k="kw">import</T> <T k="p">{'{'}</T> <T k="imp">cn</T>{' '}
        <T k="p">{'}'}</T> <T k="kw">from</T> <T k="str">'../utils'</T>
        <T k="p">;</T>
      </Line>
      <Line n={3} active={activeLine === 3} onClick={onLineClick}>
        {' '}
      </Line>
      <Line n={4} active={activeLine === 4} onClick={onLineClick}>
        <T k="cmt">
          {'// Surfaces nest. Pass `level` to override the context.'}
        </T>
      </Line>
      <Line n={5} active={activeLine === 5} onClick={onLineClick}>
        <T k="kw">export</T> <T k="kw">interface</T> <T k="imp">SurfaceProps</T>{' '}
        <T k="p">{'{'}</T>
      </Line>
      <Line n={6} active={activeLine === 6} onClick={onLineClick}>
        {'  '}
        <T k="attr">level</T>
        <T k="p">{'?:'}</T> <T k="num">1</T> <T k="p">|</T> <T k="num">2</T>{' '}
        <T k="p">|</T> <T k="num">3</T> <T k="p">|</T> <T k="num">4</T>{' '}
        <T k="p">|</T> <T k="num">5</T>
        <T k="p">;</T>
      </Line>
      <Line n={7} active={activeLine === 7} onClick={onLineClick}>
        {'  '}
        <T k="attr">outline</T>
        <T k="p">{'?:'}</T> <T k="imp">boolean</T>
        <T k="p">;</T>
      </Line>
      <Line n={8} active={activeLine === 8} onClick={onLineClick}>
        {'  '}
        <T k="attr">variant</T>
        <T k="p">{'?:'}</T> <T k="str">'solid'</T> <T k="p">|</T>{' '}
        <T k="str">'gradient'</T>
        <T k="p">;</T>
      </Line>
      <Line n={9} active={activeLine === 9} onClick={onLineClick}>
        <T k="p">{'}'}</T>
      </Line>
      <Line n={10} active={activeLine === 10} onClick={onLineClick}>
        {' '}
      </Line>
      <Line n={11} active={activeLine === 11} onClick={onLineClick}>
        <T k="kw">export</T> <T k="kw">function</T> <T k="fn">Surface</T>
        <T k="p">{'({'}</T> level, outline, variant <T k="p">{'}: '}</T>
        <T k="imp">SurfaceProps</T>
        <T k="p">{') {'}</T>
      </Line>
      <Line n={12} active={activeLine === 12} onClick={onLineClick}>
        {'  '}
        <T k="kw">const</T> parent <T k="p">{'='}</T>{' '}
        <T k="fn">useSurfaceLevel</T>
        <T k="p">{'();'}</T>
      </Line>
      <Line n={13} active={activeLine === 13} onClick={onLineClick}>
        {'  '}
        <T k="kw">const</T> resolved <T k="p">{'='}</T> level <T k="p">??</T>{' '}
        <T k="p">{'('}</T>parent <T k="p">+</T> <T k="num">1</T>
        <T k="p">{')'}</T>
        <T k="p">;</T>
      </Line>
      <Line n={14} active={activeLine === 14} onClick={onLineClick}>
        {'  '}
        <T k="kw">return</T> <T k="p">(</T>
      </Line>
      <Line n={15} active={activeLine === 15} onClick={onLineClick}>
        {'    '}
        <T k="p">{'<'}</T>
        <T k="tag">div</T> <T k="attr">data-level</T>
        <T k="p">{'={'}</T>resolved<T k="p">{'}'}</T>
      </Line>
      <Line n={16} active={activeLine === 16} onClick={onLineClick}>
        {'      '}
        <T k="attr">className</T>
        <T k="p">{'={'}</T>
        <T k="fn">cn</T>
        <T k="p">(</T>
        <T k="str">'cladd-surface'</T>, outline <T k="p">&&</T>{' '}
        <T k="str">'cladd-outline'</T>
        <T k="p">{')}'}</T>
      </Line>
      <Line n={17} active={activeLine === 17} onClick={onLineClick}>
        {'    '}
        <T k="p">{'/>'}</T>
      </Line>
      <Line n={18} active={activeLine === 18} onClick={onLineClick}>
        {'  '}
        <T k="p">{');'}</T>
      </Line>
      <Line n={19} active={activeLine === 19} onClick={onLineClick}>
        <T k="p">{'}'}</T>
      </Line>
    </>
  );
}

function GlobalsFile({
  activeLine,
  onLineClick,
}: {
  activeLine: number;
  onLineClick: (n: number) => void;
}) {
  return (
    <>
      <Line n={1} active={activeLine === 1} onClick={onLineClick}>
        <T k="kw">@import</T> <T k="str">'tailwindcss'</T>
        <T k="p">;</T>
      </Line>
      <Line n={2} active={activeLine === 2} onClick={onLineClick}>
        <T k="kw">@import</T> <T k="str">'@cladd-ui/react/styles.css'</T>
        <T k="p">;</T>
      </Line>
      <Line n={3} active={activeLine === 3} onClick={onLineClick}>
        {' '}
      </Line>
      <Line n={4} active={activeLine === 4} onClick={onLineClick}>
        <T k="cmt">{'/* Map cladd theme tokens to project fonts. */'}</T>
      </Line>
      <Line n={5} active={activeLine === 5} onClick={onLineClick}>
        <T k="kw">@theme</T> <T k="p">{'{'}</T>
      </Line>
      <Line n={6} active={activeLine === 6} onClick={onLineClick}>
        {'  '}
        <T k="cssprop">--font-sans</T>
        <T k="p">:</T> <T k="cssval">'Geist'</T>, sans-serif
        <T k="p">;</T>
      </Line>
      <Line n={7} active={activeLine === 7} onClick={onLineClick}>
        {'  '}
        <T k="cssprop">--font-mono</T>
        <T k="p">:</T> <T k="cssval">'Geist Mono'</T>, monospace
        <T k="p">;</T>
      </Line>
      <Line n={8} active={activeLine === 8} onClick={onLineClick}>
        <T k="p">{'}'}</T>
      </Line>
      <Line n={9} active={activeLine === 9} onClick={onLineClick}>
        {' '}
      </Line>
      <Line n={10} active={activeLine === 10} onClick={onLineClick}>
        <T k="tag">body</T> <T k="p">{'{'}</T>
      </Line>
      <Line n={11} active={activeLine === 11} onClick={onLineClick}>
        {'  '}
        <T k="cssprop">background</T>
        <T k="p">:</T> <T k="fn">var</T>
        <T k="p">(</T>
        <T k="cssval">--cladd-bg</T>
        <T k="p">);</T>
      </Line>
      <Line n={12} active={activeLine === 12} onClick={onLineClick}>
        {'  '}
        <T k="cssprop">color</T>
        <T k="p">:</T> <T k="fn">var</T>
        <T k="p">(</T>
        <T k="cssval">--cladd-fg</T>
        <T k="p">);</T>
      </Line>
      <Line n={13} active={activeLine === 13} onClick={onLineClick}>
        {'  '}
        <T k="cssprop">font-family</T>
        <T k="p">:</T> <T k="fn">var</T>
        <T k="p">(</T>
        <T k="cssval">--font-sans</T>
        <T k="p">);</T>
      </Line>
      <Line n={14} active={activeLine === 14} onClick={onLineClick}>
        <T k="p">{'}'}</T>
      </Line>
    </>
  );
}

// ---------- File registry ----------

type FileId = 'index' | 'surface' | 'globals';

interface FileMeta {
  id: FileId;
  name: string;
  kind: FileKind;
  path: string[];
  language: string;
  lineCount: number;
  problems: { errors: number; warnings: number };
  render: (props: {
    activeLine: number;
    onLineClick: (n: number) => void;
  }) => React.ReactNode;
}

const FILES: Record<FileId, FileMeta> = {
  index: {
    id: 'index',
    name: 'index.tsx',
    kind: 'tsx',
    path: ['src', 'pages', 'index.tsx'],
    language: 'TypeScript JSX',
    lineCount: 13,
    problems: { errors: 0, warnings: 0 },
    render: (p) => <IndexFile {...p} />,
  },
  surface: {
    id: 'surface',
    name: 'Surface.tsx',
    kind: 'tsx',
    path: ['src', 'components', 'Surface.tsx'],
    language: 'TypeScript JSX',
    lineCount: 19,
    problems: { errors: 0, warnings: 2 },
    render: (p) => <SurfaceFile {...p} />,
  },
  globals: {
    id: 'globals',
    name: 'globals.css',
    kind: 'css',
    path: ['src', 'styles', 'globals.css'],
    language: 'CSS',
    lineCount: 14,
    problems: { errors: 0, warnings: 0 },
    render: (p) => <GlobalsFile {...p} />,
  },
};

// ---------- Tree ----------

interface TreeNode {
  type: 'folder' | 'file';
  name: string;
  path: string;
  /** Only for files */
  fileId?: FileId;
  /** Only for files — used to render the icon badge */
  kind?: FileKind;
  children?: TreeNode[];
}

const TREE: TreeNode[] = [
  {
    type: 'folder',
    name: 'src',
    path: 'src',
    children: [
      {
        type: 'folder',
        name: 'pages',
        path: 'src/pages',
        children: [
          {
            type: 'file',
            name: '_app.tsx',
            path: 'src/pages/_app.tsx',
            kind: 'tsx',
          },
          {
            type: 'file',
            name: '_document.tsx',
            path: 'src/pages/_document.tsx',
            kind: 'tsx',
          },
          {
            type: 'file',
            name: 'index.tsx',
            path: 'src/pages/index.tsx',
            kind: 'tsx',
            fileId: 'index',
          },
        ],
      },
      {
        type: 'folder',
        name: 'components',
        path: 'src/components',
        children: [
          {
            type: 'file',
            name: 'Surface.tsx',
            path: 'src/components/Surface.tsx',
            kind: 'tsx',
            fileId: 'surface',
          },
          {
            type: 'file',
            name: 'Toolbar.tsx',
            path: 'src/components/Toolbar.tsx',
            kind: 'tsx',
          },
        ],
      },
      {
        type: 'folder',
        name: 'styles',
        path: 'src/styles',
        children: [
          {
            type: 'file',
            name: 'globals.css',
            path: 'src/styles/globals.css',
            kind: 'css',
            fileId: 'globals',
          },
        ],
      },
    ],
  },
  {
    type: 'file',
    name: 'package.json',
    path: 'package.json',
    kind: 'json',
  },
  {
    type: 'file',
    name: 'tsconfig.json',
    path: 'tsconfig.json',
    kind: 'json',
  },
  {
    type: 'file',
    name: 'README.md',
    path: 'README.md',
    kind: 'md',
  },
];

function TreeView({
  nodes,
  depth,
  openFolders,
  onToggleFolder,
  onOpenFile,
  activeFileId,
}: {
  nodes: TreeNode[];
  depth: number;
  openFolders: Set<string>;
  onToggleFolder: (path: string) => void;
  onOpenFile: (id: FileId) => void;
  activeFileId: FileId;
}) {
  return (
    <>
      {nodes.map((node) => {
        if (node.type === 'folder') {
          const isOpen = openFolders.has(node.path);
          return (
            <div key={node.path}>
              <ListButton
                size="sm"
                contentClassName="gap-2"
                onClick={() => onToggleFolder(node.path)}
                icon={
                  isOpen ? (
                    <ChevronDownIcon className="size-3!" />
                  ) : (
                    <ChevronRightIcon className="size-3!" />
                  )
                }
                style={{ paddingLeft: depth * 12 }}
              >
                {node.name}
              </ListButton>
              {isOpen && node.children && (
                <TreeView
                  nodes={node.children}
                  depth={depth + 1}
                  openFolders={openFolders}
                  onToggleFolder={onToggleFolder}
                  onOpenFile={onOpenFile}
                  activeFileId={activeFileId}
                />
              )}
            </div>
          );
        }
        const clickable = !!node.fileId;
        const isActive = clickable && node.fileId === activeFileId;
        return (
          <ListButton
            size="sm"
            contentClassName="gap-2"
            key={node.path}
            selected={isActive}
            onClick={
              clickable ? () => onOpenFile(node.fileId as FileId) : undefined
            }
            icon={<FileIcon kind={node.kind ?? 'tsx'} />}
            style={{ paddingLeft: depth * 12 + 4 }}
            className={cn(!clickable && 'text-cladd-fg-softer')}
          >
            {node.name}
          </ListButton>
        );
      })}
    </>
  );
}

// ---------- Main ----------

export function CodeEditorDemo() {
  const [openTabs, setOpenTabs] = useState<FileId[]>([
    'index',
    'surface',
    'globals',
  ]);
  const [activeFile, setActiveFile] = useState<FileId>('index');
  const [activeLine, setActiveLine] = useState<number>(6);
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(['src', 'src/pages', 'src/components', 'src/styles']),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modified] = useState<Set<FileId>>(new Set(['surface']));

  const active = FILES[activeFile];

  function openFile(id: FileId) {
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveFile(id);
    setActiveLine(1);
  }

  function closeTab(id: FileId, e: React.MouseEvent) {
    e.stopPropagation();
    setOpenTabs((prev) => {
      const idx = prev.indexOf(id);
      const next = prev.filter((t) => t !== id);
      if (activeFile === id && next.length > 0) {
        const fallback = next[Math.max(0, idx - 1)];
        setActiveFile(fallback);
        setActiveLine(1);
      }
      return next;
    });
  }

  function toggleFolder(path: string) {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  return (
    <div className="relative flex h-full bg-cladd-bg">
      {/* Backdrop for mobile sidebar */}
      <div
        className={cn(
          'absolute inset-0 z-19 bg-cladd-bg/40 opacity-0 transition-opacity md:hidden',
          sidebarOpen ? 'opacity-100' : 'pointer-events-none',
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Explorer/Sidebar */}
      <Surface
        variant="gradient"
        className={cn(
          'absolute inset-y-0 left-0 z-20 m-2 mr-0 flex w-56 shrink-0 flex-col rounded-2xl border border-cladd-outline duration-200 md:relative md:translate-x-0',
          !sidebarOpen && '-translate-x-[110%] md:translate-x-0',
        )}
      >
        <div className="flex h-9 shrink-0 items-center justify-between pt-1 pr-1 pl-4 text-xs font-medium tracking-wide text-cladd-fg-soft uppercase">
          Explorer
          <Toolbar size="sm">
            <Tooltip tooltip="New file">
              <ToolbarButton contentClassName="px-1.5" aria-label="New file">
                <NewFileIcon />
              </ToolbarButton>
            </Tooltip>
            <Tooltip tooltip="New folder">
              <ToolbarButton contentClassName="px-1.5" aria-label="New folder">
                <NewFolderIcon />
              </ToolbarButton>
            </Tooltip>
            <Tooltip tooltip="Refresh">
              <ToolbarButton contentClassName="px-1.5" aria-label="Refresh">
                <RefreshIcon />
              </ToolbarButton>
            </Tooltip>
            <Tooltip tooltip="Collapse all">
              <ToolbarButton
                contentClassName="px-1.5"
                aria-label="Collapse all"
              >
                <CollapseIcon />
              </ToolbarButton>
            </Tooltip>
          </Toolbar>
        </div>
        <div className="flex-1 overflow-auto pb-1">
          <List>
            <TreeView
              nodes={TREE}
              depth={0}
              openFolders={openFolders}
              onToggleFolder={toggleFolder}
              onOpenFile={openFile}
              activeFileId={activeFile}
            />
          </List>
        </div>
        <div className="border-t border-cladd-outline px-3 py-2">
          <SectionTitle className="mb-2">Outline</SectionTitle>
          <div className="mt-1 flex flex-col gap-0.5 text-xs">
            <span className="flex items-center gap-1.5 text-cladd-fg-soft">
              <T k="fn">f</T> {active.name.replace(/\.[^.]+$/, '')}
            </span>
            <span className="ml-3 flex items-center gap-1.5 text-cladd-fg-softer">
              <T k="tag">{'<>'}</T> return
            </span>
          </div>
        </div>
      </Surface>
      <div className="flex h-full w-full min-w-0 shrink flex-col">
        {/* Title bar */}
        <div className="relative flex h-12 shrink-0 items-center gap-1 px-2">
          <div className="shrink-0 md:hidden">
            <Toolbar>
              <ToolbarButton
                size="sm"
                rounded
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle explorer"
              >
                <SidebarIcon />
              </ToolbarButton>
            </Toolbar>
          </div>
          <div className="relative flex min-w-0 shrink items-center gap-1 overflow-hidden pr-8 text-xs whitespace-nowrap">
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-cladd-surface-cut">
              <CladdLogo className="size-3.5" />
            </span>
            <span className="font-medium text-cladd-fg">cladd-website</span>
            {active.path.map((seg, i) => {
              const isLast = i === active.path.length - 1;
              return (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRightIcon className="size-2.5 text-cladd-fg-softer" />
                  <span
                    className={cn(
                      isLast ? 'text-cladd-fg' : 'text-cladd-fg-soft',
                    )}
                  >
                    {seg}
                  </span>
                </span>
              );
            })}
            <span className="absolute top-0 -right-1.5 h-full w-8 bg-linear-90 from-transparent to-cladd-bg" />
          </div>

          <Button
            rounded
            size="lg"
            variant="solid"
            className="ml-auto shrink-0 font-normal"
            contentClassName="gap-2 pl-3 pr-2 text-cladd-fg-soft"
          >
            <SearchIcon className="text-cladd-fg-softer" />
            <span className="hidden text-xs sm:block">Search files…</span>
            <Shortcut size="sm">⌘ P</Shortcut>
          </Button>

          <Toolbar size="sm" className="shrink-0">
            <Tooltip tooltip="Split editor">
              <ToolbarButton aria-label="Split editor">
                <SplitIcon />
              </ToolbarButton>
            </Tooltip>
            <Tooltip tooltip="Toggle panel">
              <ToolbarButton aria-label="Toggle panel">
                <PanelBottomIcon />
              </ToolbarButton>
            </Tooltip>
          </Toolbar>
        </div>

        {/* Body */}
        <div className="relative ml-2 flex min-h-0 flex-1">
          {/* Editor pane */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Tabs */}
            <div className="no-scrollbar mr-2 flex h-8 shrink-0 items-stretch gap-1 overflow-x-auto overflow-y-hidden pr-2">
              {openTabs.map((id) => {
                const f = FILES[id];
                const isActive = id === activeFile;
                const isModified = modified.has(id);
                return (
                  <Button
                    type="button"
                    size="lg"
                    key={id}
                    variant="solid"
                    onClick={() => setActiveFile(id)}
                    outline={false}
                    className={cn(
                      'group rounded-b-none border-t border-r border-l border-cladd-outline font-medium whitespace-nowrap',
                      !isActive && 'opacity-50 hover:text-cladd-fg',
                    )}
                  >
                    <FileIcon kind={f.kind} />
                    <span>{f.name}</span>
                    <span
                      role="button"
                      onClick={(e) => closeTab(id, e)}
                      className={cn(
                        'ml-1 inline-flex size-4 items-center justify-center rounded text-cladd-fg-softer hover:bg-cladd-surface-cut hover:text-cladd-fg',
                        isModified
                          ? 'opacity-100'
                          : isActive
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100',
                      )}
                    >
                      {isModified ? (
                        <CircleIcon className="size-2 text-cladd-fg-soft" />
                      ) : (
                        <CloseIcon className="size-3" />
                      )}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* Editor body */}
            <Surface
              className="mr-2 min-h-0 flex-1 rounded-r-lg rounded-bl-lg"
              contentClassName="py-4 overflow-auto no-scrollbar"
              outline
            >
              {active.render({
                activeLine,
                onLineClick: setActiveLine,
              })}
              <div className="mt-2 flex">
                <span className="w-10 shrink-0 pr-3 text-right font-mono text-[11px] text-cladd-fg-softest select-none">
                  {active.lineCount + 1}
                </span>
                <span className="flex h-6 w-2 items-center">
                  <span className="block h-4 w-px animate-pulse bg-cladd-fg" />
                </span>
              </div>
            </Surface>
          </div>
        </div>

        {/* Status bar */}
        <div className="no-scrollbar relative flex h-7 shrink-0 items-center gap-3 overflow-x-auto overflow-y-hidden px-2 text-[11px] whitespace-nowrap text-cladd-fg-softer">
          <span className="cladd-color-brand flex shrink-0 items-center gap-1.5 text-cladd-primary">
            <GitBranchIcon className="size-4" />
            main
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <CheckIcon className="size-4 text-cladd-fg-softest" />
            <span>synced</span>
          </span>
          <ToolbarSeparator />
          <span className="flex shrink-0 items-center gap-1">
            <ErrorIcon
              className={cn(
                'size-4',
                active.problems.errors > 0
                  ? 'cladd-color-red text-cladd-primary'
                  : 'text-cladd-fg-softest',
              )}
            />
            {active.problems.errors}
            <WarningIcon
              className={cn(
                'ml-2 size-4',
                active.problems.warnings > 0
                  ? 'cladd-color-yellow text-cladd-primary'
                  : 'text-cladd-fg-softest',
              )}
            />
            {active.problems.warnings}
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-3">
            <span className="hidden md:inline">Ln {activeLine}, Col 1</span>
            <span className="hidden lg:inline">Spaces: 2</span>
            <span className="hidden lg:inline">UTF-8</span>
            <span className="hidden lg:inline">LF</span>
            <Chip size="sm" rounded>
              {active.language}
            </Chip>
            <CloudArrowIcon className="size-4 text-cladd-fg-softest" />
          </span>
        </div>
      </div>
    </div>
  );
}

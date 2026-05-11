import { cn, Surface } from '@cladd-ui/react';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

export interface PropRow {
  name: string;
  type: string;
  optional: boolean;
  default: string | null;
  description: string;
}

export interface TypeParam {
  name: string;
  constraint: string | null;
  default: string | null;
}

export interface PropsTableProps {
  component: string;
  rows: PropRow[];
  typeParams?: TypeParam[];
  extendsList?: string[];
}

// Polymorphic components export an `XxxOwnProps` interface alongside the
// public `XxxProps` type. Only the public form has a docs page, so collapse
// `OwnProps` to `Props` for both the displayed name and the link target.
function normalizeExtendsName(propsType: string): string {
  return propsType.replace(/OwnProps$/, 'Props');
}

function propsTypeToKebab(propsType: string): string {
  return normalizeExtendsName(propsType)
    .replace(/Props$/, '')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// Render a string with inline `backtick` segments as styled <code>. Multi-line
// descriptions are joined with line breaks.
function renderDescription(text: string): ReactNode {
  if (!text) return null;
  return text.split('\n').map((line, lineIdx, lines) => (
    <Fragment key={lineIdx}>
      {renderInline(line)}
      {lineIdx < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

function renderInline(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /`([^`]+)`|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) out.push(line.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(
        <code
          key={`c${i++}`}
          className="rounded bg-cladd-surface-cut px-1 py-px font-mono text-[0.85em] text-cladd-fg"
        >
          {m[1]}
        </code>,
      );
    } else if (m[2] !== undefined) {
      out.push(
        <strong key={`b${i++}`} className="font-semibold text-cladd-fg">
          {m[2]}
        </strong>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

export function PropsTable({ rows, typeParams, extendsList }: PropsTableProps) {
  const hasGenerics = typeParams && typeParams.length > 0;
  const hasExtends = extendsList && extendsList.length > 0;

  return (
    <div className="my-4 flex flex-col gap-4">
      {(hasGenerics || hasExtends) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cladd-fg-soft">
          {hasGenerics && (
            <span className="font-mono">
              {typeParams!
                .map(
                  (tp) =>
                    `${tp.name}${tp.constraint ? ` extends ${tp.constraint}` : ''}${tp.default ? ` = ${tp.default}` : ''}`,
                )
                .join(', ')}
            </span>
          )}
          {hasExtends && (
            <>
              {hasGenerics && <span>/</span>}

              <span>
                Inherits from{' '}
                {extendsList!.map((p, i) => (
                  <Fragment key={p}>
                    {i > 0 ? ', ' : null}
                    <Link
                      href={`/react/components/${propsTypeToKebab(p)}/`}
                      className="font-mono text-cladd-fg underline-offset-2 hover:underline"
                    >
                      {normalizeExtendsName(p)}
                    </Link>
                  </Fragment>
                ))}
              </span>
            </>
          )}
        </div>
      )}

      <Surface
        className="overflow-hidden rounded-2xl"
        outline
        contentClassName="overflow-x-auto"
      >
        <div className="overflow-x-auto">
          <table className="props-table w-full border-collapse text-left text-sm">
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-cladd-outline text-xs tracking-wide text-cladd-fg-soft uppercase">
                <th className="w-1/4 p-4 font-medium">Name: Type</th>
                <th className="w-1/4 p-4 font-medium">Default</th>
                <th className="w-1/2 p-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="block sm:table-row-group">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-cladd-fg-soft italic">
                    No own props — see inherited types above.
                  </td>
                </tr>
              )}
              {rows.map((row, idx) => (
                <tr
                  key={row.name}
                  className={cn(
                    'flex flex-row flex-wrap align-top sm:table-row',
                    idx % 2 === 0 && 'bg-cladd-surface-plus',
                    idx < rows.length - 1 && 'border-b border-cladd-outline',
                  )}
                >
                  <td className="p-4 font-mono text-xs sm:w-1/6">
                    <span className="cladd-color-blue text-cladd-primary">
                      {row.name}
                      {!row.optional && (
                        <span
                          className="ml-1 text-cladd-fg-softer"
                          aria-label="required"
                          title="required"
                        >
                          *
                        </span>
                      )}
                    </span>
                    :{' '}
                    <span className="cladd-color-orange wrap-break-word text-cladd-primary">
                      {row.type}
                    </span>
                  </td>

                  <td className="cladd-color-green p-4 font-mono text-xs text-cladd-primary sm:w-1/6">
                    {row.default ?? '—'}
                  </td>
                  <td className="w-full p-4 pt-0 leading-relaxed text-cladd-fg sm:w-3/6 sm:p-4">
                    {renderDescription(row.description)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Surface>
    </div>
  );
}

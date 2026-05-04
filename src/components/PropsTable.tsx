import { cn, Surface } from '@cladd-ui/react';
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
    <div className="my-6 flex flex-col gap-3">
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
            <span>
              Inherits from{' '}
              {extendsList!.map((p, i) => (
                <Fragment key={p}>
                  {i > 0 ? ', ' : null}
                  <code className="font-mono text-cladd-fg">{p}</code>
                </Fragment>
              ))}
            </span>
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
            <thead>
              <tr className="border-b border-cladd-outline text-xs tracking-wide text-cladd-fg-soft uppercase">
                <th className="w-1/6 px-4 py-3 font-medium">Name</th>
                <th className="w-1/6 px-4 py-3 font-medium">Type</th>
                <th className="w-1/6 px-4 py-3 font-medium">Default</th>
                <th className="w-3/6 px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-cladd-fg-soft italic"
                  >
                    No own props — see inherited types above.
                  </td>
                </tr>
              )}
              {rows.map((row, idx) => (
                <tr
                  key={row.name}
                  className={cn(
                    idx % 2 === 1 && 'bg-cladd-surface-plus',
                    idx < rows.length - 1
                      ? 'border-b border-cladd-outline/60 align-top'
                      : 'align-top',
                  )}
                >
                  <td className="cladd-color-blue w-1/6 px-4 py-3 font-mono text-xs text-cladd-primary">
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
                  </td>
                  <td className="cladd-color-orange w-1/6 px-4 py-3 font-mono text-xs text-cladd-primary">
                    <span className="break-words">{row.type}</span>
                  </td>
                  <td className="cladd-color-green w-1/6 px-4 py-3 font-mono text-xs text-cladd-primary">
                    {row.default ?? '—'}
                  </td>
                  <td className="w-3/6 px-4 py-3 leading-relaxed text-cladd-fg">
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

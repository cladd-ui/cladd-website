import {
  Button,
  Chip,
  cn,
  List,
  ListButton,
  Popover,
  PopoverClose,
  PopoverRoot,
  PopoverTrigger,
  SearchField,
  Surface,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  type Color,
} from '@cladd-ui/react';
import { type SVGProps, useState } from 'react';

import { CladdLogo } from '../CladdLogo';

type ColumnId = 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done';

interface Column {
  id: ColumnId;
  name: string;
  color: Color | 'neutral';
}

interface Tag {
  label: string;
  color: Color;
}

interface Task {
  id: string;
  title: string;
  column: ColumnId;
  /** 'high' shows red double-chevron, 'low' shows blue down-chevron, 'none' renders a faint --, undefined renders nothing */
  priority?: 'high' | 'low' | 'none';
  tags?: Tag[];
  dateRange?: { start: string; end: string; overdue?: boolean };
  reactions?: number;
  reacted?: boolean;
  hasDescription?: boolean;
  comments?: number;
  subtasks?: { done: number; total: number };
  github?: number;
  dependencies?: number;
  assignee?: { initial: string; color: Color };
}

const COLUMNS: Column[] = [
  { id: 'backlog', name: 'Backlog', color: 'neutral' },
  { id: 'todo', name: 'To-Do', color: 'blue' },
  { id: 'in-progress', name: 'In Progress', color: 'green' },
  { id: 'in-review', name: 'In Review', color: 'orange' },
  { id: 'done', name: 'Done', color: 'red' },
];

const VK = { initial: 'V', color: 'brand' as Color };

const INITIAL_TASKS: Task[] = [
  // Backlog
  {
    id: 'CLADD-454',
    title: 'Storybook playground for component variants',
    column: 'backlog',
    reactions: 0,
    subtasks: { done: 0, total: 20 },
  },
  {
    id: 'CLADD-401',
    title: 'Animated focus rings for keyboard navigation',
    column: 'backlog',
    priority: 'low',
    tags: [{ label: 'Feature', color: 'cyan' }],
    reactions: 0,
    comments: 1,
    hasDescription: true,
  },
  {
    id: 'CLADD-19',
    title: 'Density mode — compact vs comfortable spacing',
    column: 'backlog',
    priority: 'none',
    tags: [
      { label: 'UI/UX', color: 'red' },
      { label: 'Feature', color: 'cyan' },
    ],
    reactions: 0,
    hasDescription: true,
  },
  {
    id: 'CLADD-178',
    title: 'RTL support across all components',
    column: 'backlog',
    priority: 'none',
    tags: [{ label: 'Feature', color: 'cyan' }],
    reactions: 0,
    hasDescription: true,
    subtasks: { done: 0, total: 3 },
  },
  // To-Do
  {
    id: 'CLADD-434',
    title: 'Audit unused tokens in default theme',
    column: 'todo',
    reactions: 0,
  },
  {
    id: 'CLADD-384',
    title: 'Combobox with async virtualization',
    column: 'todo',
    priority: 'high',
    tags: [{ label: 'Feature', color: 'cyan' }],
    dateRange: { start: 'May 01', end: 'May 02', overdue: true },
    reactions: 1,
    reacted: true,
    dependencies: 1,
    hasDescription: true,
  },
  {
    id: 'CLADD-425',
    title: 'Tooltip arrow positioning regression',
    column: 'todo',
    priority: 'high',
    tags: [{ label: 'Planned', color: 'purple' }],
    reactions: 0,
    hasDescription: true,
  },
  {
    id: 'CLADD-390',
    title: 'Drag-and-drop reorder for List items',
    column: 'todo',
    priority: 'none',
    tags: [
      { label: 'UI/UX', color: 'red' },
      { label: 'Feature', color: 'cyan' },
    ],
    dateRange: { start: 'May 03', end: 'May 05', overdue: true },
    reactions: 0,
    dependencies: 1,
    hasDescription: true,
  },
  // In Review (rendered with check icon — like the t0ggles "ready" state)
  {
    id: 'CLADD-470',
    title: 'New Pagination component',
    column: 'in-review',
    tags: [{ label: 'Planned', color: 'purple' }],
    reactions: 0,
    hasDescription: true,
    comments: 1,
    assignee: VK,
  },
  {
    id: 'CLADD-375',
    title: 'Color contrast warnings in docs',
    column: 'in-review',
    priority: 'high',
    tags: [{ label: 'Feature', color: 'cyan' }],
    github: 56,
    reactions: 0,
    hasDescription: true,
    comments: 1,
    assignee: VK,
  },
];

// ---------- Icons ----------

function ArrowRightCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      {...props}
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M6 5.5L8.5 8L6 10.5" />
    </svg>
  );
}

function ArrowLeftCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      {...props}
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M10 5.5L7.5 8L10 10.5" />
    </svg>
  );
}

function EditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      {...props}
    >
      <path d="M11.5 2.5l2 2-7.5 7.5L3 13l.5-3z" />
      <path d="M10 4l2 2" />
    </svg>
  );
}

function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      {...props}
    >
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4a1.5 1.5 0 0 0-1.5 1.5v5A1.5 1.5 0 0 0 4 10.5h1.5" />
    </svg>
  );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
      {...props}
    >
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  );
}

function MoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <circle cx="8" cy="3.5" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="8" cy="12.5" r="1.25" />
    </svg>
  );
}

function ChevronsUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      {...props}
    >
      <path d="M4 9l4-4 4 4" />
      <path d="M4 13l4-4 4 4" />
    </svg>
  );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      {...props}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 13.5s-5-3.18-5-7a3 3 0 0 1 5-2.24A3 3 0 0 1 13 6.5c0 3.82-5 7-5 7z" />
    </svg>
  );
}

function HeartOutlineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      {...props}
    >
      <path d="M8 13.5s-5-3.18-5-7a3 3 0 0 1 5-2.24A3 3 0 0 1 13 6.5c0 3.82-5 7-5 7z" />
    </svg>
  );
}

function NoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      {...props}
    >
      <path d="M3.5 2.5h6L12.5 5.5v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z" />
      <path d="M9 2.5v3h3.5" />
      <path d="M5 8.5h6M5 11h4" />
    </svg>
  );
}

function CommentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.3"
      {...props}
    >
      <path d="M3 3.5h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8l-3 2.5V11.5H3a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      {...props}
    >
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
      <path d="M5 2v3M11 2v3M2.5 7h11" />
    </svg>
  );
}

function SubtasksIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      {...props}
    >
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" />
      <path d="M5.5 8.5L7.25 10.25L10.5 7" />
    </svg>
  );
}

function DependenciesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      {...props}
    >
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="12" cy="8" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <path d="M5.5 4h2a3 3 0 0 1 3 3v.5" />
      <path d="M5.5 12h2a3 3 0 0 0 3-3V8.5" />
    </svg>
  );
}

function PullRequestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      {...props}
    >
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M4 5.5v5" />
      <path d="M12 10.5v-3a3 3 0 0 0-3-3H7m0 0l1.5-1.5M7 4.5l1.5 1.5" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 1.5a6.5 6.5 0 0 0-2.05 12.67c.32.06.44-.14.44-.31v-1.18c-1.8.39-2.18-.77-2.18-.77-.29-.74-.72-.94-.72-.94-.6-.4.04-.4.04-.4.66.05 1 .68 1 .68.58 1 1.52.71 1.9.55.06-.42.23-.71.41-.87-1.44-.16-2.95-.72-2.95-3.2 0-.71.26-1.29.67-1.74-.07-.16-.29-.83.06-1.72 0 0 .55-.18 1.8.66a6.2 6.2 0 0 1 3.27 0c1.25-.84 1.8-.66 1.8-.66.36.89.13 1.56.06 1.72.42.45.67 1.03.67 1.74 0 2.49-1.52 3.04-2.96 3.2.23.2.45.6.45 1.21v1.79c0 .17.12.38.45.31A6.5 6.5 0 0 0 8 1.5z" />
    </svg>
  );
}

function BoardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <rect x="2" y="2.5" width="3" height="11" rx="1" />
      <rect x="6.5" y="2.5" width="3" height="7" rx="1" />
      <rect x="11" y="2.5" width="3" height="9" rx="1" />
    </svg>
  );
}

function ListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
      {...props}
    >
      <path d="M3 4.5h10M3 8h10M3 11.5h10" />
    </svg>
  );
}

function GanttIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <rect x="2" y="3" width="7" height="2.5" rx="1" />
      <rect x="5" y="6.75" width="8" height="2.5" rx="1" />
      <rect x="3" y="10.5" width="6" height="2.5" rx="1" />
    </svg>
  );
}

function NotesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      {...props}
    >
      <path d="M3.5 2.5h7L12.5 4.5v9a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z" />
      <path d="M5 7h6M5 9.5h6M5 12h4" />
    </svg>
  );
}

function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <rect x="2.5" y="9" width="2.5" height="5" rx="0.5" />
      <rect x="6.75" y="5.5" width="2.5" height="8.5" rx="0.5" />
      <rect x="11" y="2.5" width="2.5" height="11.5" rx="0.5" />
    </svg>
  );
}

function ArchiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      {...props}
    >
      <rect x="2" y="3" width="12" height="3" rx="1" />
      <path d="M3 6v6.5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6" />
      <path d="M6.5 9h3" />
    </svg>
  );
}

function FilterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      {...props}
    >
      <path d="M2.5 3.5h11l-4 5v4l-3 1.5v-5.5l-4-5z" />
    </svg>
  );
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      {...props}
    >
      <circle cx="8" cy="8" r="2" />
      <path d="M13 8c0-.31-.03-.6-.08-.9l1.06-.83-1-1.73-1.27.4a5 5 0 0 0-1.55-.9l-.16-1.34h-2l-.16 1.34a5 5 0 0 0-1.55.9l-1.27-.4-1 1.73 1.06.83A5 5 0 0 0 5 8c0 .31.03.6.08.9l-1.06.83 1 1.73 1.27-.4a5 5 0 0 0 1.55.9l.16 1.34h2l.16-1.34a5 5 0 0 0 1.55-.9l1.27.4 1-1.73-1.06-.83c.05-.3.08-.59.08-.9z" />
    </svg>
  );
}

// ---------- Subcomponents ----------

function WorkspacePill() {
  return (
    <div className="flex shrink-0 items-center gap-2 px-1 text-sm whitespace-nowrap">
      <span className="inline-flex size-6 items-center justify-center rounded-md bg-cladd-surface-cut">
        <CladdLogo className="size-3.5" />
      </span>
      <span className="font-medium text-cladd-fg">cladd</span>
    </div>
  );
}

function PriorityIndicator({ priority }: { priority?: Task['priority'] }) {
  if (priority === 'high') {
    return (
      <span className="cladd-color-red flex size-4 items-center justify-center text-cladd-primary">
        <ChevronsUpIcon className="size-4" />
      </span>
    );
  }
  if (priority === 'low') {
    return (
      <span className="cladd-color-blue flex size-4 items-center justify-center text-cladd-primary">
        <ChevronDownIcon className="size-4" />
      </span>
    );
  }
  if (priority === 'none') {
    return (
      <span className="text-[10px] font-medium tracking-wider text-cladd-fg-softest">
        --
      </span>
    );
  }
  return null;
}

function Avatar({ initial, color }: { initial: string; color: Color }) {
  return (
    <span
      className={cn(
        `cladd-color-${color}`,
        'inline-flex size-5 items-center justify-center rounded-full bg-cladd-primary text-[10px] font-semibold text-cladd-on-primary',
      )}
    >
      {initial}
    </span>
  );
}

function CardChip({ tag }: { tag: Tag }) {
  return (
    <Chip size="md" rounded color={tag.color}>
      {tag.label}
    </Chip>
  );
}

function TaskCard({
  task,
  columnColor,
  selected,
  onSelect,
  onCycleStatus,
}: {
  task: Task;
  columnColor: Color | 'neutral';
  selected: boolean;
  onSelect: () => void;
  onCycleStatus: () => void;
}) {
  const hasFooter =
    task.reactions !== undefined ||
    task.hasDescription ||
    task.comments !== undefined ||
    task.subtasks !== undefined ||
    task.dependencies !== undefined ||
    task.github !== undefined ||
    task.assignee !== undefined;

  const columnIndex = COLUMNS.findIndex((c) => c.id === task.column);
  const isLastColumn = columnIndex === COLUMNS.length - 1;
  const CycleIcon = isLastColumn ? ArrowLeftCircleIcon : ArrowRightCircleIcon;

  return (
    <Surface
      hoverable
      clickable
      pressed={selected}
      outline
      variant="gradient"
      color={columnColor === 'neutral' ? undefined : (columnColor as Color)}
      className="shrink-0 rounded-2xl select-none"
      contentClassName="flex flex-col gap-2.5 p-3"
      onClick={onSelect}
    >
      {/* Row 1 — icon, id, priority, more */}
      <div className="flex items-center gap-2">
        <Button
          rounded
          className="aspect-square text-cladd-fg-soft"
          contentClassName="p-0"
          aria-label={
            isLastColumn ? 'Move task to backlog' : 'Move task to next status'
          }
          onClick={(e) => {
            e.stopPropagation();
            onCycleStatus();
          }}
        >
          <CycleIcon />
        </Button>
        <span className="font-mono text-[10px] tracking-wider text-cladd-fg-softer">
          {task.id}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <PriorityIndicator priority={task.priority} />
          <PopoverRoot>
            <PopoverTrigger>
              <Button
                outline={false}
                variant="solid"
                rounded
                className="aspect-square text-cladd-fg-softer"
                contentClassName="p-0"
                aria-label="Task actions"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MoreIcon className="size-3" />
              </Button>
            </PopoverTrigger>
            <Popover
              className="w-48"
              position="bottom-end"
              offset={[-24, 4]}
              color={
                columnColor === 'neutral' ? undefined : (columnColor as Color)
              }
              onClick={(e) => e.stopPropagation()}
            >
              <List>
                <PopoverClose>
                  <ListButton icon={<EditIcon />}>Edit task</ListButton>
                </PopoverClose>
                <PopoverClose>
                  <ListButton icon={<SubtasksIcon />}>Add subtask</ListButton>
                </PopoverClose>
                <PopoverClose>
                  <ListButton icon={<CopyIcon />}>Duplicate task</ListButton>
                </PopoverClose>
                <PopoverClose>
                  <ListButton icon={<ArchiveIcon />}>Archive task</ListButton>
                </PopoverClose>
              </List>
            </Popover>
          </PopoverRoot>
        </span>
      </div>

      {/* Title */}
      <div className="text-sm leading-snug font-medium text-cladd-fg">
        {task.title}
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <CardChip key={tag.label} tag={tag} />
          ))}
        </div>
      )}

      {/* Date range */}
      {task.dateRange && (
        <div className="flex items-center gap-1.5 text-xs text-cladd-fg-soft">
          <CalendarIcon className="size-3" />
          <span>{task.dateRange.start}</span>
          <span className="text-cladd-fg-softest">-</span>
          <span
            className={cn(
              task.dateRange.overdue && 'cladd-color-red text-cladd-primary',
            )}
          >
            {task.dateRange.end}
          </span>
        </div>
      )}

      {/* Footer metadata */}
      {hasFooter && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-cladd-fg-softer">
          {task.reactions !== undefined && (
            <span
              className={cn(
                'flex items-center gap-1',
                task.reacted && 'cladd-color-brand text-cladd-primary',
              )}
            >
              {task.reacted ? (
                <HeartIcon className="size-4" />
              ) : (
                <HeartOutlineIcon className="size-4" />
              )}
              <span>{task.reactions}</span>
            </span>
          )}
          {task.github !== undefined && (
            <span className="flex items-center gap-1">
              <GithubIcon className="size-4" />
              <PullRequestIcon className="size-4" />
              <span>#{task.github}</span>
            </span>
          )}
          {task.dependencies !== undefined && (
            <span className="flex items-center gap-1">
              <DependenciesIcon className="size-4" />
              <span>{task.dependencies}</span>
            </span>
          )}
          {task.hasDescription && <NoteIcon className="size-4" />}
          {task.comments !== undefined && task.comments > 0 && (
            <span className="flex items-center gap-1">
              <CommentIcon className="size-4" />
              {task.comments > 1 && <span>{task.comments}</span>}
            </span>
          )}
          {task.subtasks && (
            <span className="flex items-center gap-1">
              <SubtasksIcon className="size-4" />
              <span>
                {task.subtasks.done}/{task.subtasks.total}
              </span>
            </span>
          )}
          {task.assignee && (
            <span className="ml-auto">
              <Avatar
                initial={task.assignee.initial}
                color={task.assignee.color}
              />
            </span>
          )}
        </div>
      )}
    </Surface>
  );
}

function ColumnHeaderButton({ column }: { column: Column }) {
  const isAccent = column.color !== 'neutral';
  return (
    <Button
      color={isAccent ? (column.color as Color) : undefined}
      variant={'solid'}
      outline={false}
      rounded
      size="lg"
      className="w-full opacity-75 hover:opacity-100 focus-visible:opacity-100"
      contentClassName="justify-center"
    >
      <PlusIcon className="opacity-80" />
      <span className="text-xs font-medium">{column.name} task</span>
    </Button>
  );
}

function BoardColumn({
  column,
  tasks,
  selectedId,
  onSelect,
  onCycleStatus,
}: {
  column: Column;
  tasks: Task[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCycleStatus: (id: string) => void;
}) {
  return (
    <div className="flex w-64 shrink-0 flex-col">
      <div className="flex flex-col gap-2 pb-4">
        <ColumnHeaderButton column={column} />
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnColor={column.color}
            selected={selectedId === task.id}
            onSelect={() => onSelect(task.id)}
            onCycleStatus={() => onCycleStatus(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Main ----------

export function KanbanDemo() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = search.trim()
    ? tasks.filter((t) =>
        (t.title + ' ' + t.id).toLowerCase().includes(search.toLowerCase()),
      )
    : tasks;

  function cycleStatus(id: string) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = COLUMNS.findIndex((c) => c.id === t.column);
        const nextIdx = idx === COLUMNS.length - 1 ? 0 : idx + 1;
        return { ...t, column: COLUMNS[nextIdx].id };
      }),
    );
  }

  return (
    <div className="flex h-full flex-col bg-cladd-bg">
      {/* Top bar */}
      <div className="no-scrollbar relative flex h-16 shrink-0 items-center gap-4 overflow-x-auto overflow-y-hidden border-b border-cladd-outline/50 px-4">
        <Toolbar className="shrink-0">
          <WorkspacePill />
          <ToolbarSeparator />
          <ToolbarButton
            color="green"
            variant="gradient"
            outline
            readOnly
            className="font-medium"
          >
            <BoardIcon />
            Board
          </ToolbarButton>
          <ToolbarButton>
            <ListIcon />
            List
          </ToolbarButton>
          <ToolbarButton>
            <GanttIcon />
            Gantt
          </ToolbarButton>
          <ToolbarButton>
            <CalendarIcon />
            Calendar
          </ToolbarButton>
          <ToolbarButton>
            <NotesIcon />
            Notes
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="Stats">
            <ChartIcon />
          </ToolbarButton>
          <ToolbarButton aria-label="Archive">
            <ArchiveIcon />
          </ToolbarButton>
        </Toolbar>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Toolbar>
            <div className="w-40">
              <SearchField
                size="md"
                inset
                value={search}
                onChange={setSearch}
                placeholder="Search"
                className="mx-0"
              />
            </div>
            <ToolbarSeparator />
            <ToolbarButton aria-label="Filter">
              <FilterIcon />
            </ToolbarButton>
            <ToolbarButton aria-label="Settings">
              <SettingsIcon />
            </ToolbarButton>
            <ToolbarSeparator />
            <ToolbarButton aria-label="Account" rounded>
              <Avatar initial="V" color="brand" />
            </ToolbarButton>
          </Toolbar>
        </div>
      </div>

      {/* Board */}
      <div className="relative flex flex-1 gap-4 overflow-auto p-4">
        {COLUMNS.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={filtered.filter((t) => t.column === column.id)}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onCycleStatus={cycleStatus}
          />
        ))}
      </div>
    </div>
  );
}

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

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M15,9.75H2.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H15c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"></path>
        <path d="M11,14c-.192,0-.384-.073-.53-.22-.293-.293-.293-.768,0-1.061l3.72-3.72-3.72-3.72c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l4.25,4.25c.293,.293,.293,.768,0,1.061l-4.25,4.25c-.146,.146-.338,.22-.53,.22Z"></path>
      </g>
    </svg>
  );
}

function ArriwLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M15.25,9.75H3c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H15.25c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"></path>
        <path d="M7,14c-.192,0-.384-.073-.53-.22L2.22,9.53c-.293-.293-.293-.768,0-1.061L6.47,4.22c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-3.72,3.72,3.72,3.72c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z"></path>
      </g>
    </svg>
  );
}

function EditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M11.414,2.848L3.605,10.657c-.863,.864-1.401,3.406-1.593,4.459-.044,.242,.034,.491,.208,.665,.142,.142,.333,.22,.53,.22,.044,0,.089-.004,.134-.012,1.053-.191,3.595-.729,4.459-1.593l7.809-7.809c1.03-1.031,1.03-2.707,0-3.738-.998-.998-2.74-.997-3.738,0Zm2.677,2.677l-.94,.94-1.617-1.617,.94-.94c.216-.216,.503-.334,.809-.334s.592,.119,.808,.334c.445,.446,.445,1.171,0,1.617Z"></path>
      </g>
    </svg>
  );
}

function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M4.75,13h-1c-1.517,0-2.75-1.233-2.75-2.75V4.75c0-1.517,1.233-2.75,2.75-2.75h7.5c1.517,0,2.75,1.233,2.75,2.75v1h-1.5v-1c0-.689-.561-1.25-1.25-1.25H3.75c-.689,0-1.25,.561-1.25,1.25v5.5c0,.689,.561,1.25,1.25,1.25h1v1.5Z"></path>
        <rect x="4" y="5" width="13" height="11" rx="2.75" ry="2.75"></rect>
      </g>
    </svg>
  );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M14.75,9.75H3.25c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H14.75c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"></path>
        <path d="M9,15.5c-.414,0-.75-.336-.75-.75V3.25c0-.414,.336-.75,.75-.75s.75,.336,.75,.75V14.75c0,.414-.336,.75-.75,.75Z"></path>
      </g>
    </svg>
  );
}

function MoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <circle cx="9" cy="9" r="1.25"></circle>
        <circle cx="9" cy="3.25" r="1.25"></circle>
        <circle cx="9" cy="14.75" r="1.25"></circle>
      </g>
    </svg>
  );
}

function ChevronsUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M9.53,3.47c-.293-.293-.768-.293-1.061,0L4.22,7.72c-.293,.293-.293,.768,0,1.061s.768,.293,1.061,0l3.72-3.72,3.72,3.72c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061L9.53,3.47Z"></path>
        <path d="M9.53,8.22c-.293-.293-.768-.293-1.061,0l-4.25,4.25c-.293,.293-.293,.768,0,1.061s.768,.293,1.061,0l3.72-3.72,3.72,3.72c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061l-4.25-4.25Z"></path>
      </g>
    </svg>
  );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M9,13.5c-.192,0-.384-.073-.53-.22L2.22,7.03c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l5.72,5.72,5.72-5.72c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-6.25,6.25c-.146,.146-.338,.22-.53,.22Z"></path>
      </g>
    </svg>
  );
}

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M12.164,2c-1.195,.015-2.324,.49-3.164,1.306-.84-.815-1.972-1.291-3.178-1.306-2.53,.015-4.582,2.084-4.572,4.609,0,5.253,5.306,8.429,6.932,9.278,.256,.133,.537,.2,.818,.2s.562-.067,.817-.2c1.626-.848,6.933-4.024,6.933-9.275,.009-2.528-2.042-4.597-4.586-4.612Z"></path>
      </g>
    </svg>
  );
}

function HeartOutlineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
    >
      <g
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        stroke="currentColor"
        {...props}
      >
        <path d="M8.529,15.222c.297,.155,.644,.155,.941,0,1.57-.819,6.529-3.787,6.529-8.613,.008-2.12-1.704-3.846-3.826-3.859-1.277,.016-2.464,.66-3.173,1.72-.71-1.06-1.897-1.704-3.173-1.72-2.123,.013-3.834,1.739-3.826,3.859,0,4.826,4.959,7.794,6.529,8.613Z"></path>
      </g>
    </svg>
  );
}

function NoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M13.25,1H4.75c-1.517,0-2.75,1.233-2.75,2.75V14.25c0,1.517,1.233,2.75,2.75,2.75H13.25c1.517,0,2.75-1.233,2.75-2.75V3.75c0-1.517-1.233-2.75-2.75-2.75Zm-4.25,11h-3.25c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h3.25c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm3.25-3H5.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h6.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm0-3H5.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h6.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"></path>
      </g>
    </svg>
  );
}

function CommentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M14.25,1.5H3.75c-1.517,0-2.75,1.233-2.75,2.75v7c0,1.517,1.233,2.75,2.75,2.75h1.25v2.25c0,.288,.165,.551,.425,.676,.103,.05,.214,.074,.325,.074,.167,0,.333-.056,.469-.165l3.544-2.835h4.487c1.517,0,2.75-1.233,2.75-2.75V4.25c0-1.517-1.233-2.75-2.75-2.75Z"></path>
      </g>
    </svg>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path
          d="m5.75,4c-.4141,0-.75-.3359-.75-.75V1.25c0-.4141.3359-.75.75-.75s.75.3359.75.75v2c0,.4141-.3359.75-.75.75Z"
          stroke-width="0"
        ></path>
        <path
          d="m12.25,4c-.4141,0-.75-.3359-.75-.75V1.25c0-.4141.3359-.75.75-.75s.75.3359.75.75v2c0,.4141-.3359.75-.75.75Z"
          stroke-width="0"
        ></path>
        <path
          d="m13.75,2.5H4.25c-1.5166,0-2.75,1.2334-2.75,2.75v8.5c0,1.5166,1.2334,2.75,2.75,2.75h9.5c1.5166,0,2.75-1.2334,2.75-2.75V5.25c0-1.5166-1.2334-2.75-2.75-2.75Zm0,12.5H4.25c-.6895,0-1.25-.5605-1.25-1.25v-6.25h12v6.25c0,.6895-.5605,1.25-1.25,1.25Z"
          stroke-width="0"
        ></path>
      </g>
    </svg>
  );
}

function SubtasksIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M13.25 2H10.75C9.7835 2 9 2.7835 9 3.75V6.25C9 7.2165 9.7835 8 10.75 8H13.25C14.2165 8 15 7.2165 15 6.25V3.75C15 2.7835 14.2165 2 13.25 2Z"></path>{' '}
        <path d="M13.25 10H10.75C9.7835 10 9 10.7835 9 11.75V14.25C9 15.2165 9.7835 16 10.75 16H13.25C14.2165 16 15 15.2165 15 14.25V11.75C15 10.7835 14.2165 10 13.25 10Z"></path>{' '}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.5 1.75C4.5 1.33579 4.16421 1 3.75 1C3.33579 1 3 1.33579 3 1.75V3.5V3.75V11.75C3 12.9922 4.00779 14 5.25 14H6.75C7.16421 14 7.5 13.6642 7.5 13.25C7.5 12.8358 7.16421 12.5 6.75 12.5H5.25C4.83621 12.5 4.5 12.1638 4.5 11.75V5.87187C4.73461 5.95484 4.98705 6 5.25 6H6.75C7.16421 6 7.5 5.66421 7.5 5.25C7.5 4.83579 7.16421 4.5 6.75 4.5H5.25C4.83621 4.5 4.5 4.16379 4.5 3.75V3.5V1.75Z"
        ></path>
      </g>
    </svg>
  );
}

function DependenciesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path
          d="m6.25,13.5c-.4141,0-.75-.3359-.75-.75v-2.25c0-1.2407,1.0098-2.25,2.25-2.25h2.5c.4131,0,.75-.3364.75-.75v-2.25c0-.4141.3359-.75.75-.75s.75.3359.75.75v2.25c0,1.2407-1.0098,2.25-2.25,2.25h-2.5c-.4131,0-.75.3364-.75.75v2.25c0,.4141-.3359.75-.75.75Z"
          stroke-width="0"
        ></path>
        <rect
          x="7"
          y="1.5"
          width="9.5"
          height="4.5"
          rx="1.75"
          ry="1.75"
          stroke-width="0"
        ></rect>
        <rect
          x="1.5"
          y="12"
          width="9.5"
          height="4.5"
          rx="1.75"
          ry="1.75"
          stroke-width="0"
        ></rect>
      </g>
    </svg>
  );
}

function PullRequestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M12.25,3h-1.689l.97-.97c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0l-2.25,2.25c-.293,.293-.293,.768,0,1.061l2.25,2.25c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061l-.97-.97h1.689c.689,0,1.25,.561,1.25,1.25v6.5c0,.414,.336,.75,.75,.75s.75-.336,.75-.75V5.75c0-1.517-1.233-2.75-2.75-2.75Z"></path>
        <path d="M3.75,13c-.414,0-.75-.336-.75-.75V5.75c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v6.5c0,.414-.336,.75-.75,.75Z"></path>
        <circle cx="14.25" cy="14.25" r="2.5"></circle>
        <circle cx="3.75" cy="14.25" r="2.5"></circle>
        <circle cx="3.75" cy="3.75" r="2.5"></circle>
      </g>
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
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M14.25,4H3.75c-1.517,0-2.75,1.233-2.75,2.75v7c0,1.517,1.233,2.75,2.75,2.75H14.25c1.517,0,2.75-1.233,2.75-2.75V6.75c0-1.517-1.233-2.75-2.75-2.75Zm-5,8.5H5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h4.25c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm3.75-3H5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H13c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"></path>
        <path d="M14.25,2.5H3.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H14.25c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"></path>
      </g>
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
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M15.25,2H2.75c-.965,0-1.75,.785-1.75,1.75v1.5c0,.879,.654,1.602,1.5,1.725v6.275c0,1.517,1.233,2.75,2.75,2.75h7.5c1.517,0,2.75-1.233,2.75-2.75V6.975c.846-.123,1.5-.845,1.5-1.725v-1.5c0-.965-.785-1.75-1.75-1.75Zm-4.25,8H7c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h4c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm4.5-4.75c0,.138-.112,.25-.25,.25H2.75c-.138,0-.25-.112-.25-.25v-1.5c0-.138,.112-.25,.25-.25H15.25c.138,0,.25,.112,.25,.25v1.5Z"></path>
      </g>
    </svg>
  );
}

function FilterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M15.25,2H2.75c-.285,0-.545,.161-.671,.416-.127,.255-.098,.56,.074,.787l4.848,6.399v6.648c0,.265,.14,.511,.368,.646,.118,.07,.25,.104,.382,.104,.125,0,.249-.031,.361-.093l2.5-1.375c.24-.132,.389-.384,.389-.657v-5.273L15.848,3.203c.172-.227,.201-.532,.074-.787-.126-.255-.387-.416-.671-.416Z"></path>
      </g>
    </svg>
  );
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M15.94 7.44101L14.878 7.27802C14.754 6.85402 14.586 6.447 14.373 6.06L15.009 5.19299C15.377 4.69199 15.325 4.00801 14.885 3.57001L14.429 3.11401C13.991 2.67501 13.308 2.62299 12.805 2.98999L11.938 3.62701C11.551 3.41401 11.144 3.24601 10.721 3.12201L10.557 2.05899C10.462 1.44499 9.943 0.998993 9.322 0.998993H8.677C8.056 0.998993 7.536 1.445 7.442 2.06L7.279 3.12201C6.855 3.24601 6.448 3.41401 6.061 3.62701L5.194 2.991C4.692 2.624 4.009 2.676 3.571 3.116L3.115 3.57199C2.676 4.01099 2.624 4.69401 2.991 5.19601L3.628 6.06299C3.416 6.44999 3.247 6.857 3.123 7.28L2.06 7.444C1.446 7.539 1 8.05799 1 8.67899V9.32401C1 9.94501 1.446 10.465 2.061 10.559L3.123 10.722C3.247 11.146 3.415 11.553 3.628 11.94L2.992 12.807C2.625 13.308 2.677 13.991 3.117 14.43L3.573 14.886C4.012 15.326 4.696 15.378 5.197 15.01L6.064 14.373C6.451 14.585 6.858 14.754 7.281 14.878L7.445 15.941C7.54 16.555 8.059 17.001 8.68 17.001H9.325C9.946 17.001 10.466 16.555 10.56 15.94L10.723 14.878C11.147 14.754 11.554 14.586 11.941 14.373L12.808 15.009C13.309 15.377 13.992 15.324 14.431 14.885L14.887 14.429C15.326 13.99 15.378 13.307 15.011 12.805L14.374 11.938C14.587 11.551 14.755 11.144 14.879 10.721L15.942 10.557C16.556 10.462 17.002 9.94299 17.002 9.32199V8.677C17.002 8.056 16.556 7.53599 15.942 7.44199L15.94 7.44101ZM9 11.5C7.6189 11.5 6.5 10.3811 6.5 9C6.5 7.6189 7.6189 6.5 9 6.5C10.3811 6.5 11.5 7.6189 11.5 9C11.5 10.3811 10.3811 11.5 9 11.5Z"></path>
      </g>
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
      <span className="hidden font-medium text-cladd-fg md:block">cladd</span>
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
  const CycleIcon = isLastColumn ? ArriwLeftIcon : ArrowRightIcon;

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
          className="aspect-square"
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
        <span className="font-mono text-xs text-cladd-fg-softer">
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
                className="aspect-square text-cladd-fg-softer hover:text-cladd-fg"
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
          <CalendarIcon className="size-4" />
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
            <Button
              size="sm"
              contentClassName="px-2 gap-1"
              variant="solid"
              outline={false}
              className={cn(
                'flex items-center gap-1 font-mono',
                task.reacted && 'cladd-color-brand text-cladd-primary',
              )}
            >
              {task.reacted ? (
                <HeartIcon className="size-4" />
              ) : (
                <HeartOutlineIcon className="size-4" />
              )}
              <span>{task.reactions}</span>
            </Button>
          )}
          {task.github !== undefined && (
            <Chip className="flex items-center gap-1">
              <GithubIcon className="size-4" />
              <PullRequestIcon className="size-4" />
              <span className="font-mono text-xs">#{task.github}</span>
            </Chip>
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
      <div className="flex flex-col gap-4 pb-4">
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
            color="brand"
            variant="gradient"
            outline
            readOnly
            className="font-medium"
          >
            <BoardIcon />
            <span className="hidden lg:block">Board</span>
          </ToolbarButton>
          <ToolbarButton>
            <ListIcon />
            <span className="hidden lg:block">List</span>
          </ToolbarButton>
          <ToolbarButton>
            <GanttIcon />
            <span className="hidden lg:block">Gantt</span>
          </ToolbarButton>
          <ToolbarButton>
            <CalendarIcon />
            <span className="hidden lg:block">Calendar</span>
          </ToolbarButton>
          <ToolbarButton>
            <NotesIcon />
            <span className="hidden lg:block">Notes</span>
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
            <div className="w-24 md:w-40">
              <SearchField
                size="md"
                inset
                value={search}
                onChange={setSearch}
                placeholder="Search"
                className="mx-0"
                clearButton={false}
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
            <ToolbarButton aria-label="Account" rounded contentClassName="px-1">
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

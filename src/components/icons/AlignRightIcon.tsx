import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function AlignRightIcon({ fill = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill={fill}>
        <path d="M14.75 5h-11.5a.75.75 0 0 1 0-1.5h11.5a.75.75 0 0 1 0 1.5Z" />
        <path d="M14.75 8.25h-7.5a.75.75 0 0 1 0-1.5h7.5a.75.75 0 0 1 0 1.5Z" />
        <path d="M14.75 11.5h-11.5a.75.75 0 0 1 0-1.5h11.5a.75.75 0 0 1 0 1.5Z" />
        <path d="M14.75 14.75h-7.5a.75.75 0 0 1 0-1.5h7.5a.75.75 0 0 1 0 1.5Z" />
      </g>
    </svg>
  );
}

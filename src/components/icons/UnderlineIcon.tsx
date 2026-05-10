import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function UnderlineIcon({ fill = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill={fill}>
        <path d="M9 13c-2.62 0-4.75-2.13-4.75-4.75v-5a.75.75 0 0 1 1.5 0v5a3.25 3.25 0 0 0 6.5 0v-5a.75.75 0 0 1 1.5 0v5C13.75 10.87 11.62 13 9 13Z" />
        <path d="M14.25 15.5h-10.5a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 0 1.5Z" />
      </g>
    </svg>
  );
}

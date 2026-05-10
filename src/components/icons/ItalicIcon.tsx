import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function ItalicIcon({ fill = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.25 3.5h-6.5a.75.75 0 0 0 0 1.5h2.32L7.64 13H5.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5H9.43l2.43-8h2.39a.75.75 0 0 0 0-1.5Z"
        fill={fill}
      />
    </svg>
  );
}

import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function BoldIcon({ fill = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5 8.6c1-.6 1.6-1.7 1.6-3C13.1 3.6 11.5 2 9.4 2H4.8c-.4 0-.8.3-.8.7v12.6c0 .4.3.7.8.7h5.4c2.2 0 4-1.8 4-4 0-1.4-.7-2.6-1.8-3.3ZM6.4 4.2h2.8c.9 0 1.6.7 1.6 1.6S10.1 7.4 9.2 7.4H6.4V4.2Zm3.8 9.5H6.4v-3.8h3.8c1.1 0 1.9.9 1.9 1.9s-.8 1.9-1.9 1.9Z"
        fill={fill}
      />
    </svg>
  );
}

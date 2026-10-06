import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {};

export function HeartIcon({ fill = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill={fill}>
        <path d="M12.164,2c-1.195,.015-2.324,.49-3.164,1.306-.84-.815-1.969-1.291-3.164-1.306C3.212,2.034,1.25,4.24,1.25,6.871c0,5.03,6.736,9.022,7.389,9.381,.112,.062,.237,.093,.361,.093s.249-.031,.361-.093c.653-.359,7.389-4.351,7.389-9.381,0-2.631-1.962-4.837-4.586-4.871Z" />
      </g>
    </svg>
  );
}

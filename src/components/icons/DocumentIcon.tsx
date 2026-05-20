import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

export function DocumentIcon({ fill = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill={fill}>
        <path d="M14.5,5.5h-2.25c-.689,0-1.25-.561-1.25-1.25V2c0-.13,.034-.252,.094-.358-.354-.092-.722-.142-1.094-.142H5.75c-1.517,0-2.75,1.233-2.75,2.75V13.75c0,1.517,1.233,2.75,2.75,2.75h6.5c1.517,0,2.75-1.233,2.75-2.75V6.594c0-.372-.05-.74-.142-1.094-.106,.06-.228,.094-.358,.094Zm-3,7H6.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm0-3H6.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z" />
        <path d="M14.219,4l-2.469-2.469c-.052-.052-.113-.085-.171-.124v2.843h2.843c-.039-.058-.072-.119-.124-.171Z" />
      </g>
    </svg>
  );
}

import React, { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

export function CalendarIcon({
  fill = 'currentColor',
  secondaryfill,
  ...props
}: IconProps) {
  secondaryfill = secondaryfill || fill;

  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill={fill}>
        <path
          d="m5.75,4c-.4141,0-.75-.3359-.75-.75V1.25c0-.4141.3359-.75.75-.75s.75.3359.75.75v2c0,.4141-.3359.75-.75.75Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <path
          d="m12.25,4c-.4141,0-.75-.3359-.75-.75V1.25c0-.4141.3359-.75.75-.75s.75.3359.75.75v2c0,.4141-.3359.75-.75.75Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <path
          d="m13.75,2.5H4.25c-1.5166,0-2.75,1.2334-2.75,2.75v8.5c0,1.5166,1.2334,2.75,2.75,2.75h9.5c1.5166,0,2.75-1.2334,2.75-2.75V5.25c0-1.5166-1.2334-2.75-2.75-2.75Zm0,12.5H4.25c-.6895,0-1.25-.5605-1.25-1.25v-6.25h12v6.25c0,.6895-.5605,1.25-1.25,1.25Z"
          fill={fill}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

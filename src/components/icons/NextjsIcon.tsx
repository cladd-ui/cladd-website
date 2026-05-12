import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function NextjsIcon({ fill = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill={fill}
        fill-rule="evenodd"
        d="M128,0 C198.692448,0 256,57.307552 256,128 C256,166.24595 239.225997,200.574122 212.633451,224.029054 L177.831,179.2 L180.622223,179.2 L180.622223,76.8 L163.555556,76.8 L163.555,160.81 L98.3352889,76.8 L76.8,76.8 L76.8,179.157333 L94.0282311,179.157333 L94.0282311,98.6788978 L199.109233,234.446782 C178.770433,248.060625 154.312387,256 128,256 C57.307552,256 0,198.692448 0,128 C0,57.307552 57.307552,0 128,0 Z"
      />
    </svg>
  );
}

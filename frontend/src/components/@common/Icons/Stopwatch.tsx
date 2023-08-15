import { SVGProps } from 'react';

const Stopwatch = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="black"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 13.5A6.5 6.5 0 1 1 13.5 7a7.23 7.23 0 0 1-2 5"></path>
        <path d="m13.5 11.5l-2 .5l-.5-2M9 9L7 6.5H4"></path>
      </g>
    </svg>
  );
};

export default Stopwatch;

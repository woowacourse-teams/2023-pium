import type { SVGProps } from 'react';

const Water = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="#75AEDC"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.5 9C11.5 6.51 7 .5 7 .5S2.5 6.51 2.5 9a4.5 4.5 0 0 0 9 0Z"
      ></path>
    </svg>
  );
};

export default Water;

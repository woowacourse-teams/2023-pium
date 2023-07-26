import type { SVGProps } from 'react';

const Plant = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28px"
      height="28px"
      viewBox="0 0 14 14"
      {...props}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.51 5.38c2 2.82.47 6.05-.27 7.31a1.42 1.42 0 0 1-1 .66c-1.45.25-5.06.53-7-2.29C1.33 8.4 1.41 3.72 1.58 1.49A1.05 1.05 0 0 1 3 .55c2.15.62 6.63 2.17 8.51 4.83Z"></path>
        <path d="M4.77 4.45a52.26 52.26 0 0 1 6 8.73"></path>
      </g>
    </svg>
  );
};
export default Plant;

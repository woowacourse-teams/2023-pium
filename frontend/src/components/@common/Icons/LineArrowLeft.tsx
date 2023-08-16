import { SVGProps } from 'react';

const LineArrowLeft = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14" {...props}>
      <path
        fill="none"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.15.5L4 6.65a.48.48 0 0 0 0 .7l6.15 6.15"
      ></path>
    </svg>
  );
};

export default LineArrowLeft;

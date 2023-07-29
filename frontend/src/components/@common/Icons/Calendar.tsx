import type { SVGProps } from 'react';

export const Calendar = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 14 14"
      {...props}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 6.5h1V11m-1 0h2"></path>
        <path d="M1.5 2.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2m-7-2v4m7-4v4m-7-2h5"></path>
        <path d="M3.5 6.5H6l-1.5 2s1.5 0 1.5 1A1.33 1.33 0 0 1 4.5 11h-1"></path>
      </g>
    </svg>
  );
};

export default Calendar;

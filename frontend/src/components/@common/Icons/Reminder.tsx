import { SVGProps } from 'react';

const Reminder = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 14 14"
      {...props}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="1" cy="2.5" r=".5"></circle>
        <path d="M4.5 2.5h9"></path>
        <circle cx="1" cy="7" r=".5"></circle>
        <path d="M4.5 7h9"></path>
        <circle cx="1" cy="11.5" r=".5"></circle>
        <path d="M4.5 11.5h9"></path>
      </g>
    </svg>
  );
};

export default Reminder;

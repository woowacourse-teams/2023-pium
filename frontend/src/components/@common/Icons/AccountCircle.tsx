import type { SVGProps } from 'react';

export const AccountCircle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 14 14"
      {...props}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="5.5" r="2.5"></circle>
        <path d="M2.73 11.9a5 5 0 0 1 8.54 0"></path>
        <circle cx="7" cy="7" r="6.5"></circle>
      </g>
    </svg>
  );
};

export default AccountCircle;

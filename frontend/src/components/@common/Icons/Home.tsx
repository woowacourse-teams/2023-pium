import type { SVGProps } from 'react';

const Home = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M.5 7L7 .5L13.5 7m-11 1.5v5h9v-5"
      ></path>
    </svg>
  );
};

export default Home;

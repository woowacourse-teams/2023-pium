const CarbonWindyStrong = (props: React.SVGProps<SVGSVGElement>) => {
  const { color = '#000000' } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path
        fill={color}
        d="M13 30a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3H4v-2h9a5 5 0 0 1 0 10Z"
      ></path>
      <path
        fill={color}
        d="M25 25a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3H2v-2h23a5 5 0 0 1 0 10zm-4-13H6v-2h15a3 3 0 1 0-3-3h-2a5 5 0 1 1 5 5z"
      ></path>
    </svg>
  );
};

export default CarbonWindyStrong;

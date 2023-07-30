const ArcticonsDictionary = (props: React.SVGProps<SVGSVGElement>) => {
  const { color = '#000000' } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.73 4.5H10.4a2 2 0 0 0-2 2v35a2 2 0 0 0 2 2h2.33m0-39v39H37.6a2 2 0 0 0 2-2v-35a2 2 0 0 0-2-2Z"
      ></path>
      <circle
        cx="28.195"
        cy="22.671"
        r="6.329"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m23.723 27.142l-6.052 6.052"
      ></path>
    </svg>
  );
};

export default ArcticonsDictionary;

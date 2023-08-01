import type { SVGProps } from 'react';
import { CSSProp, styled } from 'styled-components';

interface SVGPropsExtends extends SVGProps<SVGSVGElement> {
  customCSS?: CSSProp;
}

const Svg = styled.svg<SVGPropsExtends>`
  ${({ customCSS }) => customCSS && customCSS}
`;

const MdiCheckboxBlankOutline = (props: SVGPropsExtends) => {
  const { customCSS, ...args } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      customCSS={customCSS}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...args}
    >
      <path
        fill="currentColor"
        d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14Z"
      ></path>
    </Svg>
  );
};

export default MdiCheckboxBlankOutline;

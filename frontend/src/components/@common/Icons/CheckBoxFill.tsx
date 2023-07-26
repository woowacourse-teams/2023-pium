import type { SVGProps } from 'react';
import { styled, type CSSProp } from 'styled-components';

interface SVGPropsExtends extends SVGProps<SVGSVGElement> {
  customCSS?: CSSProp;
}

const Svg = styled.svg<SVGPropsExtends>`
  ${({ customCSS }) => customCSS && customCSS}
`;

const MdiCheckboxMarked = (props: SVGPropsExtends) => {
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
        d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
      ></path>
    </Svg>
  );
};

export default MdiCheckboxMarked;

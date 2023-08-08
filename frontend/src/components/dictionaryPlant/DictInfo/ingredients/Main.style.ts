import { styled } from 'styled-components';

interface FlexBoxProps {
  $flexDirection: 'row' | 'column';
}

interface SizedFlexBoxProps extends FlexBoxProps {
  $width?: string;
  $height?: string;
}

export const Flexbox = styled.div<FlexBoxProps>`
  display: inline-flex;
  flex-direction: ${({ $flexDirection }) => $flexDirection};
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
`;

export const SizedFlexBox = styled(Flexbox)<SizedFlexBoxProps>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;

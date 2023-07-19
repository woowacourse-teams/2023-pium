import styled from 'styled-components';
import theme from '../../style/theme.style';

export interface LabelStyleProps {
  $variant?: 'default' | 'primary' | 'sub' | 'accent';
  $dimmed?: boolean;
  $hasHoverEffect?: boolean;
}

const getBgColor = ({ $variant = 'default', $dimmed = true }: LabelStyleProps) => {
  const opacity = $dimmed ? '4C' : 'FF';
  return $variant === 'default' ? `#BBBBBB${opacity}` : `${theme.color[$variant]}${opacity}`;
};

export const Wrapper = styled.div<LabelStyleProps>`
  display: inline-block;
  align-self: start;

  padding: 7px 12px;

  background-color: ${(props) => getBgColor(props)};
  border-radius: 77px;

  &:hover {
    ${({ $hasHoverEffect, $variant = 'default' }) =>
      $hasHoverEffect &&
      `background-color: ${$variant === 'default' ? '#BBBBBB' : theme.color[$variant]}7F`}
  }
`;

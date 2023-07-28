import styled from 'styled-components';

interface WrapperProps {
  $width: string | undefined;
  $height: string | undefined;
}

interface BarProps {
  $color: string | undefined;
  $percentage: number | undefined;
}

export const Wrapper = styled.div<WrapperProps>`
  width: ${({ $width = '100%' }) => $width};
  height: ${({ $height = '10px' }) => $height};
  border: 1px solid ${({ theme }) => theme.color.gray};
  border-radius: 5px;
`;

export const Bar = styled.div<BarProps>`
  width: ${({ $percentage = 0 }) => $percentage}%;
  height: 100%;

  background-color: ${({ $color, theme }) => $color ?? theme.color.primary};
  border-radius: 5px;

  transition: all 0.5s ease-out;
`;

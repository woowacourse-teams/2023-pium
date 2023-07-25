import { keyframes, styled } from 'styled-components';

export interface StyledImageProps {
  type: 'circle' | 'square' | 'wide';
  size: string;
}

const wave = (size: string) => keyframes`
  0% {
    background-position: -${size} 0;
  }

  100% {
    background-position: ${size} 0;
  }
`;

export const StyledImage = styled.img<StyledImageProps>`
  display: inline-flex;

  width: ${({ type, size }) => (type === 'wide' ? '100%' : size)};
  min-width: ${({ type, theme }) => (type === 'wide' ? theme.width.mobile : '')};
  min-width: ${({ type, theme }) => (type === 'wide' ? theme.width.pad : '')};
  height: ${({ size }) => size};
  margin: ${({ type }) => (type === 'wide' ? '0 auto' : '')};

  object-fit: cover;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.color.primary}33 7%,
    ${({ theme }) => theme.color.primary}4C 17%,
    ${({ theme }) => theme.color.primary}33 37%
  );
  background-size: 77px 77px;
  border-radius: ${({ type }) => (type === 'circle' ? '50%' : 0)};

  animation: ${({ size }) => wave(size)} 2.5s linear infinite;
`;

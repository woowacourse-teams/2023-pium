import { styled } from 'styled-components';

export const Wrapper = styled.div<{ $hiddenOver: boolean; $maxHeight: string }>`
  position: relative;
  width: 100%;
  height: ${({ $hiddenOver, $maxHeight }) => ($hiddenOver ? $maxHeight : 'max-content')};
`;

export const ContentBox = styled.div<{ $hiddenOver: boolean; $maxHeight: string }>`
  overflow: hidden;
  max-height: ${({ $hiddenOver, $maxHeight }) =>
    $hiddenOver ? `calc(${$maxHeight} - 1.6rem)` : ''};
`;

export const SeeMoreButtonArea = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: start;

  width: 100%;
`;

export const SeeMoreButton = styled.button`
  width: max-content;
  height: 1.2rem;
  font-size: 1.2rem;
`;

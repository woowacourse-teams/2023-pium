import { styled } from 'styled-components';

export const Wrapper = styled.div<{ isSeeMore: boolean; maxHeight: string }>`
  position: relative;

  overflow: hidden;

  width: 100%;
  height: max-content;
  max-height: ${({ isSeeMore, maxHeight }) => (isSeeMore ? 'max-content' : maxHeight)};
  padding-bottom: 1rem;

  /* font-size: 1rem; */

  background-color: transparent;

  transition: height 1s;
`;

export const SeeMoreButtonArea = styled.div`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.fixed};
  bottom: 0;

  display: flex;
  justify-content: start;

  width: 100%;

  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 30%);
`;

export const SeeMoreButton = styled.button`
  width: max-content;
  height: 1.2rem;
  font-size: 1.2rem;
  background-color: white;
`;

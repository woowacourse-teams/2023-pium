import { styled } from 'styled-components';

export const Wrapper = styled.div<{ isSeeMore: boolean; maxHeight: string }>`
  position: relative;
  width: 100%;
  height: ${({ isSeeMore, maxHeight }) => (isSeeMore ? 'max-content' : maxHeight)};
`;

export const ContentArea = styled.div<{ isSeeMore: boolean }>`
  overflow: hidden;
  max-height: ${(props) => (props.isSeeMore ? 'max-content' : 'calc(100% - 1.6rem)')};
`;

export const SeeMoreButtonArea = styled.div`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.fixed};
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

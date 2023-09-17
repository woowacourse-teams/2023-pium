import { styled } from 'styled-components';

export const Wrapper = styled.header`
  position: sticky;
  z-index: ${(props) => props.theme.zIndex.fixed};
  top: 0;

  display: flex;
  flex-direction: column;

  padding: 8px;

  background-color: ${(props) => props.theme.color.background};
  border-bottom: solid 1px ${(props) => props.theme.color.gray};
`;

export const FilterArea = styled.div`
  display: flex;
  align-items: end;

  height: 20px;
  margin-top: 8px;
  padding-left: 16px;
`;

export const FilterTag = styled.p`
  display: flex;
  column-gap: 4px;
  align-items: center;
  font-size: 1.4rem;
`;

export const DeleteFilterButton = styled.button`
  font-size: 1.2rem;
`;

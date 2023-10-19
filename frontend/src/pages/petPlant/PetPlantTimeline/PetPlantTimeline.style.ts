import { styled } from 'styled-components';

export const FilterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 48px;
  padding-left: 28px;

  box-shadow: 0 2px 2px -2px ${(props) => props.theme.color.gray};
`;

export const ButtonLabel = styled.span`
  margin-left: 1rem;
`;

export const Main = styled.main`
  position: relative;

  width: 100%;
  min-height: 100%;
  padding: 80px 0;

  background-color: white;
`;

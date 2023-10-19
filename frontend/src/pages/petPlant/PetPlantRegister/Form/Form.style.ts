import { styled } from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  padding: 64px 16px;
`;

export const DictionaryPlantName = styled.p`
  font-size: 3rem;
  line-height: 3.6rem;
`;

export const DictionaryPlantButton = styled.button`
  display: flex;
  align-items: center;

  margin-top: 12px;

  font-size: 1.6rem;
  color: ${(props) => props.theme.color.sub};

  & > * + * {
    margin-left: 4px;
  }
`;

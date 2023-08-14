import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding-bottom: 68px;
`;

export const Title = styled.p`
  margin: 32px 0;
  font-size: 2rem;
`;

export const CardList = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 32px;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-template-rows: 224px;
  justify-content: space-evenly;

  width: 100%;
  height: 100%;
  padding: 24px 0;
`;

export const RegisterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 160px;
  height: 224px;

  font-size: 3.6rem;
  color: ${(props) => props.theme.color.primary};

  background: ${(props) => props.theme.color.background};
  border: solid 1px ${(props) => props.theme.color.primary};
  border-radius: 16px;
`;

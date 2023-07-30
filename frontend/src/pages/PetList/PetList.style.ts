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

export const PetCardList = styled.div`
  overflow-y: auto;
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 32px;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-template-rows: 224px;
  justify-content: space-evenly;

  width: 100%;
  height: 100%;
  padding-bottom: 16px;
`;

export const RegisterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 160px;
  height: 224px;

  font-size: 8rem;
  line-height: 16px;
  color: white;

  background: ${(props) => props.theme.color.primary + 'bb'};
  border-radius: 16px;
`;

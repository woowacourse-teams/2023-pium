import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-height: 100%;
  padding: 32px 0;
`;

export const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const DictionaryPlantName = styled.p`
  font-size: 3rem;
`;

export const DictionaryPlantImageArea = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;
`;

export const ButtonArea = styled.div`
  width: 100%;
  margin-top: 16px;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;

  font-size: 1.6rem;
  font-weight: 500;
  color: ${(props) => props.theme.color.sub};

  background: ${(props) => props.theme.color.primary};
  border-radius: 16px;

  &:disabled {
    color: ${(props) => props.theme.color.sub + '40'};
    background: ${(props) => props.theme.color.primary + '40'};
  }
`;

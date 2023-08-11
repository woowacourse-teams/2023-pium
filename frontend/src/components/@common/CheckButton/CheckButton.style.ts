import { styled } from 'styled-components';

export const Wrapper = styled.div`
  input {
    display: none;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  width: max-content;
  height: 28px;
  padding: 0 12px;

  font-size: 1.2rem;
  color: ${(props) => props.theme.color.sub};

  background-color: ${(props) => props.theme.color.grayLight};
  border-radius: 8px;

  input:checked ~ & {
    font-weight: 500;
    color: white;
    background-color: ${(props) => props.theme.color.primary};
  }
`;

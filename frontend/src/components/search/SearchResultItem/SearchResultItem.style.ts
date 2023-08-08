import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  column-gap: 20px;
  align-items: center;

  width: 100%;
  height: 70px;
  padding: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.color.grayLight};
  }
`;

export const Name = styled.p`
  display: flex;
  align-items: center;
  font: ${({ theme }) => theme.font.input};
`;

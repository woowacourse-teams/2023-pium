import styled from 'styled-components';

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 68px);
`;

export const ButtonBox = styled.section`
  position: absolute;
  bottom: 68px;

  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

  width: 100%;

  button {
    cursor: pointer;
  }
`;

export const Button = styled.button`
  height: 45px;
  color: ${({ theme: { color } }) => color.gray};
  border-radius: 8px;
`;

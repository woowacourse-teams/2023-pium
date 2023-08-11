import styled from 'styled-components';

export const Wrapper = styled.main`
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;

  background: ${({ theme: { color } }) => color.subLight};
`;

export const ContentBox = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 300px;
  height: 300px;

  background: ${({ theme: { color } }) => color.grayLight};
  border-radius: 8px;
`;

export const Title = styled.p`
  width: 270px;
  height: 90px;
  margin: 0 auto;

  font: 900 4rem/5.2rem 'GmarketSans';
  text-align: center;
`;

export const LoginBox = styled.section`
  position: fixed;
  bottom: 40px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
`;

export const GoToMain = styled.button`
  width: 148px;
  height: 59px;
  background: ${({ theme }) => theme.color.grayLight};
  border-radius: 8px;
`;

import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.main`
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;

  background: ${({ theme: { color } }) => color.subLight};
`;

export const ContentBox = styled.section`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  width: 300px;
  max-width: 300px;
  height: 400px;
  max-height: 400px;
`;

const fadeIn = keyframes`
  0%  {
    opacity: 0;
  }
  100%  {
    opacity: 1;
  }
`;

export const PlantImg = styled.img`
  width: 300px;
  height: 300px;
  margin-top: 24px;

  background: transparent;
  border-radius: 8px;

  animation: ${fadeIn} 1s ease-in;
`;

export const Text = styled.p`
  width: 300px;
  font: 900 3.2rem/4rem 'GmarketSans';
  color: white;
`;

export const PrimaryText = styled.span`
  color: ${({ theme: { color } }) => color.primary};
`;

export const LoginBox = styled.section`
  position: fixed;
  bottom: 40px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  min-width: ${(props) => props.theme.width.mobile};
  max-width: ${(props) => props.theme.width.pad};
`;

export const GoToMain = styled(Link)`
  width: 140px;
  height: 52.5px;

  font: 700 1.6rem/5.25rem 'GmarketSans';
  text-align: center;

  background: ${({ theme }) => theme.color.grayLight};
  border-radius: 8px;
`;

export const KakaoLogin = styled.img`
  width: 210px;
  height: 52.5px;
`;

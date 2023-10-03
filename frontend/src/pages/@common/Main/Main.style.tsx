import { keyframes, styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  width: 100%;
  height: 100%;
  padding: 0 16px;
  padding-bottom: 68px;
`;

export const LogoMessage = styled.p`
  margin-top: 10vh;

  font-size: 2.4rem;
  font-weight: 900;
  line-height: 3rem;
  color: ${(props) => props.theme.color.primary};
`;

export const SearchBoxArea = styled.div`
  width: 100%;
  margin-top: 36px;
`;

export const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  5% {
    transform: translateY(-16px);
  }
  10% {
    transform: translateY(0);
  }
`;

export const SearchMessage = styled.p`
  margin-top: 40px;

  font-size: 1.6rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.color.sub};

  animation: ${bounce} 6s infinite;
`;

export const Image = styled.img`
  width: 112px;
`;

export const ImageArea = styled.div`
  height: 128px;
  margin-top: 16px;
`;

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
  margin-top: 10%;
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.primary};
`;

export const Logo = styled.img`
  width: 192px;
  margin-top: 32px;
`;

export const SearchBoxArea = styled.div`
  width: 100%;
  margin-top: 32px;
`;

export const bounce = keyframes`
  0% { 
    margin-top: 80px;
    margin-bottom: 0px;
  }
  5% { 
    margin-top: 64px;
    margin-bottom: 16px;
  }
  10% { 
    margin-top: 80px;
    margin-bottom: 0px;
  }
`;

export const SearchMessage = styled.p`
  margin-top: 80px;
  font-size: 2rem;
  color: #333333;
  animation: ${bounce} 6s infinite;
`;

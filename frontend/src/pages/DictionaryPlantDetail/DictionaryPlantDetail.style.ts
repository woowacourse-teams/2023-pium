import { styled } from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto 100px auto;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: space-around;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  padding: 16px 32px;

  background-color: ${(props) => props.theme.color.background};
  box-shadow: 0 -1px 1px -1px ${(props) => props.theme.color.subLight};
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 36px;
  padding: 0 1rem;

  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;

  border-radius: 4px;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  color: ${({ theme }) => theme.color.background};
  background: ${(props) => props.theme.color.primary};

  &:disabled {
    color: ${(props) => props.theme.color.sub + '40'};
    background: ${(props) => props.theme.color.primary + '40'};
  }
`;

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
`;

export const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 80px;
  padding: 0 32px;
  padding-top: 16px;

  background-image: linear-gradient(
    to bottom,
    transparent 0%,
    ${(props) => props.theme.color.background} 30%
  );
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 36px;
  padding: 0 1rem;

  font: 500 1.5rem/ 1.8rem NanumSquareRound;
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

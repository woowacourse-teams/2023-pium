import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.main`
  position: relative;

  display: flex;
  flex-direction: column;

  height: calc(100% - 68px);
  padding: 16px 0;
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

export const PushAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-around;

  width: 80%;
  margin: 0 auto;

  span {
    font: 400 1.2rem/1.6rem NanumSquareRound;
    color: ${({ theme }) => theme.color.accent};
    text-align: right;
  }
`;

export const PushAlertContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  p {
    font: 600 1.6rem/2rem NanumSquareRound;
  }
`;

export const Button = styled.button`
  height: 45px;
  color: ${({ theme: { color } }) => color.gray};
  border-radius: 8px;
`;

export const BottomSheet = styled(Link)`
  position: absolute;
  right: 12px;
  bottom: 100px;

  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;

  padding: 8px 12px;

  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.color.background};

  background: ${({ theme }) => theme.color.primary};
  border-radius: 28px;
`;

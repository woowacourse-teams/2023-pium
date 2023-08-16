import styled from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
`;

export const TitleBox = styled.div`
  width: 100%;
  height: 68px;
  text-align: center;
`;

export const Title = styled.p`
  font: 900 4rem/6.8rem 'GmarketSans';
`;

export const ButtonBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  width: 100%;
  margin: 300px auto;

  button {
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 270px;
  height: 45px;
  background: #333333;
  border-radius: 8px;
`;

export const Logout = styled(Button)`
  background: ${({ theme: { color } }) => color.grayLight};
`;

export const Withdraw = styled(Button)`
  background: ${({ theme: { color } }) => color.gray};
`;

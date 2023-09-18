import { styled } from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;

  min-width: ${({ theme }) => theme.width.mobile};
  max-width: ${({ theme }) => theme.width.pad};
  margin: 0 auto 0 auto;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: center;

  width: 90%;

  text-align: center;
`;

export const SadPiumiImage = styled.img`
  width: 250px;
`;

export const Title = styled.h1`
  font: ${({ theme }) => theme.font.title};
`;

export const Text = styled.p`
  font: ${({ theme }) => theme.font.subTitle};
`;

export const Button = styled.button`
  width: ${({ theme }) => theme.width.mobile};
  height: 50px;

  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.background};

  background-color: ${({ theme }) => theme.color.sub};
  border-radius: 5px;
`;

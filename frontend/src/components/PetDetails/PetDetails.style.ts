import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const singleLineText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  justify-content: center;

  margin: 0 auto 48px auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  width: calc(${({ theme }) => theme.width.mobile} - 20px);
  margin: 0 auto;
`;

export const Title = styled.h1`
  display: flex;
  column-gap: 2px;
  align-items: center;
  justify-content: center;

  font: ${({ theme }) => theme.font.title};
  font-size: 2.4rem;
`;

export const StyledLink = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.color.primary};
    border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  }
`;

export const SubTitle = styled.h2`
  display: flex;
  column-gap: 2px;
  align-items: center;

  font: ${({ theme }) => theme.font.dictContent};
  font-size: 1.8rem;

  ${singleLineText}
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayLight};
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.span`
  font: ${({ theme }) => theme.font.dictContent};
  font-size: 1.6rem;
`;

export const Strong = styled.strong`
  font: ${({ theme }) => theme.font.dictContent};
  font-size: 2.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.primary};
`;

export const Bold = styled.span`
  font: ${({ theme }) => theme.font.dictContent};
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ExpandedTextBox = styled.p`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  font: ${({ theme }) => theme.font.dictContent};
  font-size: 1.6rem;
`;

export const Environment = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;

  width: 100%;
  padding: 30px;

  background-color: ${({ theme }) => theme.color.primary}13;
  border-radius: 5px;
`;

export const EnvironmentItem = styled.p`
  display: flex;
  column-gap: 8px;
  align-items: center;

  width: 100%;

  font-size: 1.6rem;
`;

export const EnvironmentTitle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  color: ${({ theme }) => theme.color.primary};

  background: ${({ theme }) => theme.color.background};
  border-radius: 50%;
`;

export const EditLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  margin-right: auto;
  margin-left: 0;

  color: ${({ theme }) => theme.color.grayDark};

  transition: color 0.2s linear;

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

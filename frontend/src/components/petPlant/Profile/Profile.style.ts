import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { keyframes, styled } from 'styled-components';

interface SkeletonItemProps {
  width: CSSProperties['width'];
  height: CSSProperties['height'];
}

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  max-width: 90%;
  margin: 40px auto auto auto;
  padding: 20px 30px;

  border: 1px solid ${({ theme: { color } }) => color.grayLight};
  border-radius: 4px;
`;

export const Title = styled.div`
  display: flex;
`;

export const NameArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: calc(100% - 130px);
  margin-left: 20px;
`;

export const Nickname = styled.p`
  overflow: hidden;

  width: 100%;

  font: ${({ theme }) => theme.font.dictTitle};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DictionaryPlantName = styled.p`
  overflow: hidden;

  width: 100%;

  font: ${({ theme }) => theme.font.dictContent};
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Text = styled.p`
  font: ${({ theme }) => theme.font.dictContent};
  font-size: 1.6rem;
`;

export const PrimaryText = styled.strong`
  font: ${({ theme }) => theme.font.dictContent};
  font-size: 2.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.primary};
`;

export const Environment = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  align-items: center;

  width: 100%;
  padding: 12px;

  background-color: ${({ theme }) => theme.color.primary}13;
  border-radius: 8px;
`;

export const EnvironmentItem = styled.p`
  display: flex;
  column-gap: 8px;
  align-items: center;

  width: 100%;

  font-size: 1.2rem;
  line-height: 1.5rem;
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

export const StyledLink = styled(Link)`
  display: block;

  margin-top: 10px;
  margin-right: 5%;

  font-size: 1.2rem;
  line-height: 1.5rem;
  text-align: end;
  text-decoration: underline;
`;

const skeletonBackground = keyframes`
  0%    { background-color: rgba(176, 176, 176, 0.1) }
  50%   { background-color: rgba(176, 176, 176, 0.3) }
  100%  { background-color: rgba(176, 176, 176, 0.1) }
`;

export const SkeletonItem = styled.div<SkeletonItemProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;
  animation: ${skeletonBackground} 1s infinite;
`;

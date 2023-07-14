import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: min-content;

  border: solid 2px #1bcc66;
  border-radius: 29px;
`;

export const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

export const Input = styled.input`
  width: 100%;
  height: 32px;
  margin: 12px 0;
  margin-left: 8px;

  font-size: 2rem;

  border: none;
  outline: none;
`;

export const ResultMessage = styled.p`
  width: 100%;
  height: 40px;

  font-size: 1.8rem;
  color: #333333;
  text-align: center;
`;

export const ResultList = styled.div`
  width: 100%;
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 56px;
  padding-left: 12px;

  border-top: solid 2px rgba(27, 204, 102, 0.3);
`;

const skeletonBackground = keyframes`
  0%    { background-color: rgba(27, 204, 10, 0.2) }
  50%   { background-color: rgba(27, 204, 10, 0.5) }
`;

export const ResultThumbnail = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;

  object-fit: cover;
  border-radius: 50%;

  animation: ${skeletonBackground} 1s infinite;
`;

export const Name = styled.p`
  font-size: 1.8rem;
  color: #333333;
`;

export const EnterButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
`;

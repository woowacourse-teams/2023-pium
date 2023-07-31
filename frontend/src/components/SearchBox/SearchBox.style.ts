import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: min-content;

  border: solid 2px ${(p) => p.theme.color.primary};
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
  color: ${(p) => p.theme.color.sub};
  text-align: center;
`;

export const ResultList = styled.div`
  overflow-x: none;
  overflow-y: auto;
  width: 100%;
  max-height: 336px;
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 56px;
  padding-left: 12px;

  border-top: solid 2px ${(p) => p.theme.color.primary + '40'};
`;

export const Name = styled.p`
  margin-left: 12px;
  font-size: 1.8rem;
  color: ${(p) => p.theme.color.sub};
`;

export const EnterButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
`;

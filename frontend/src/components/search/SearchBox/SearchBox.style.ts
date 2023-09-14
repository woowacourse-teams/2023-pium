import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputBox = styled.div<{ openBottom: boolean }>`
  z-index: ${(props) => (props.openBottom ? props.theme.zIndex.dropdown + 1 : 'none')};

  display: flex;
  align-items: center;

  padding: 0 12px;

  border: solid 2px ${(props) => props.theme.color.primary};
  border-radius: ${(props) => (props.openBottom ? '29px 29px 0 0' : '29px')};
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
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 56px;

  font-size: 1.8rem;
  color: ${(p) => p.theme.color.sub};
  text-align: center;

  border-top: solid 2px ${(p) => p.theme.color.primary + '40'};
`;

export const Backdrop = styled.div`
  position: fixed;
  z-index: ${({ theme: { zIndex } }) => zIndex.dropdown};
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

export const ResultModal = styled.div`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.modal};
  bottom: 2px;
  transform: translateY(100%);

  width: 100%;

  background-color: ${(props) => props.theme.color.background};
  border: solid 2px ${(props) => props.theme.color.primary};
  border-top: 0px;
  border-radius: 0 0 29px 29px;
`;

export const ResultList = styled.ul<{ showRow: number }>`
  overflow-x: none;
  overflow-y: auto;
  width: 100%;
  max-height: ${(props) => props.showRow * 56}px;
`;

export const ResultItem = styled.li`
  cursor: pointer;

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

export const StyledLink = styled(Link)`
  font-weight: normal;
  color: ${({ theme: { color } }) => color.primary};
  text-decoration: underline;
`;

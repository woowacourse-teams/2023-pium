import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div<{ $fontSize: `${number}rem` }>`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;

  font-size: ${(props) => props.$fontSize};
  line-height: ${(props) => {
    const font = Number(props.$fontSize.slice(0, -3));
    return `${Math.ceil(font * 1.2)}rem`;
  }};
`;

export const InputBox = styled.div<{ $openBottom: boolean; $height: string }>`
  z-index: ${(props) => (props.$openBottom ? props.theme.zIndex.dropdown : 'auto')};

  display: flex;
  align-items: center;

  padding: 0 12px;

  border: solid 2px ${(props) => props.theme.color.primary};
  border-radius: ${({ $height, $openBottom }) => {
    const half = `calc(${$height} / 2)`;
    return $openBottom ? `${half} ${half} 0 0` : half;
  }};
`;

export const Input = styled.input<{ $height: string }>`
  display: flex;
  align-items: center;

  width: calc(100% - 72px);
  height: ${(props) => props.$height};
  margin: 0 8px;

  font-size: inherit;

  border: none;
  outline: none;
`;

export const Backdrop = styled.div`
  position: fixed;
  z-index: ${({ theme: { zIndex } }) => zIndex.dropdownBackdrop};
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

export const ResultDropdown = styled.div<{ $height: string }>`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.dropdown};
  bottom: 2px;
  transform: translateY(100%);

  width: 100%;

  background-color: ${(props) => props.theme.color.background};
  border: solid 2px ${(props) => props.theme.color.primary};
  border-top: 0px;
  border-radius: ${({ $height }) => `0 0 calc(${$height} / 2) calc(${$height} / 2)`};
`;

export const ResultList = styled.ul<{ $maxHeight: string }>`
  overflow-x: none;
  overflow-y: auto;
  width: 100%;
  max-height: ${(props) => props.$maxHeight};
`;

export const ResultMessage = styled.p`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 8px 0;

  color: ${(props) => props.theme.color.sub};
  text-align: center;

  border-top: solid 2px ${(props) => props.theme.color.primary + '40'};
`;

export const ResultItem = styled.li<{ $height: string }>`
  cursor: pointer;

  display: flex;
  align-items: center;

  width: 100%;
  height: ${(props) => props.$height};
  padding-left: 12px;

  border-top: solid 2px ${(props) => props.theme.color.primary + '40'};
`;

export const Name = styled.p`
  margin-left: 12px;
  color: ${(props) => props.theme.color.sub};
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

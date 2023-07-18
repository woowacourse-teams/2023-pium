import { styled } from 'styled-components';

interface IconAreaProps {
  rotate: boolean;
}

export const Wrapper = styled.div`
  user-select: none;

  position: relative;

  display: flex;
  justify-content: space-between;

  width: 100%;

  font: ${(props) => props.theme.font.input};
`;

export const SelectedValue = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 32px;

  &:hover {
    background: #0000000c;
  }
`;

export const IconArea = styled.div<IconAreaProps>`
  position: absolute;
  right: 8px;
  transform: ${(props) => props.rotate && 'rotate(0.5turn)'};

  display: flex;
  align-items: center;

  height: 100%;

  transition: transform 0.4s;
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

export const OptionBox = styled.ul`
  position: absolute;
  top: 32px;

  width: 100%;
  padding: 0 8px;

  border-radius: 4px;
  box-shadow: 0 0 4px ${(props) => props.theme.color.sub + '33'};
`;

export const OptionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;

  &:hover {
    background: #0000000c;
  }

  & + & {
    border-top: dotted 1px ${(props) => props.theme.color.sub + '33'};
  }
`;

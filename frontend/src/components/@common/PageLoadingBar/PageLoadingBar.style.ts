import { keyframes, styled } from 'styled-components';

export const ProgressBar = styled.div`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.tooltip};
  top: 0;
  left: 0;

  width: 100%;
  height: 4px;

  background-color: ${(props) => props.theme.color.primary};
  border-radius: 0 4px 4px 0;
`;

export const progressing = keyframes`
  0%    { transform: translateX(-100%); }
  50%   { transform: translateX(-80%); }
  100%  { transform: translateX(0); }
`;

export const Progressing = styled(ProgressBar)`
  animation: ${progressing} 4s ease-out;
`;

export const fillOut = keyframes`
  0%  { 
    opacity: 1; 
    transform: translateX(-100%);
  }
  30% {
    opacity: 1; 
    transform: translateX(0);  }
  100% {
    opacity: 0; 
    transform: translateX(0);
  }
`;

export const Finish = styled(ProgressBar)`
  animation: ${fillOut} 1s;
`;

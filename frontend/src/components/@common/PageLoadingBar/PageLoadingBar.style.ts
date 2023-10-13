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
  50%   { transform: translateX(-20%); }
  100%  { transform: translateX(0); }
`;

export const Progressing = styled(ProgressBar)`
  animation: ${progressing} 6s ease-out;
`;

export const fillOut = keyframes`
  0%  { 
    opacity: 1; 
    transform: translateX(-100%);
  }
  50% {
    opacity: 1; 
    transform: translateX(0);  
  }
  100% {
    opacity: 0; 
    transform: translateX(0);
  }
`;

export const Finish = styled(ProgressBar)<{ $animationTime: number }>`
  animation: ${fillOut} ${(props) => props.$animationTime}ms;
`;

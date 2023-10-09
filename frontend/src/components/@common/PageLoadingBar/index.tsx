import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { keyframes, styled } from 'styled-components';
import { isShowPageLoadingState } from 'store/atoms/@common';
import useToggle from 'hooks/@common/useToggle';

const PageLoadingBar = () => {
  const isShowPageLoading = useRecoilValue(isShowPageLoadingState);

  const { isOn: isShow, on: show, off: hide } = useToggle();
  const { isOn: isShowFinish, on: showFinish, off: hideFinish } = useToggle();

  const root = useMemo(() => document.getElementById('root')!, []);

  useEffect(() => {
    if (isShowPageLoading) {
      show();
    } else {
      showFinish();
      setTimeout(hide, 300);
      setTimeout(hideFinish, 1000);
    }
  }, [isShowPageLoading]);

  return createPortal(
    <>
      {isShow && <Progressing />}
      {isShowFinish && <Finish />}
    </>,
    root
  );
};

export default PageLoadingBar;

const ProgressBar = styled.div`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.tooltip};
  top: 0;
  left: 0;

  width: 100%;
  height: 4px;

  background-color: ${(props) => props.theme.color.primary};
  border-radius: 0 4px 4px 0;
`;

const progressing = keyframes`
  0%    { transform: translateX(-100%); }
  50%   { transform: translateX(-80%); }
  100%  { transform: translateX(0); }
`;

const Progressing = styled(ProgressBar)`
  animation: ${progressing} 4s ease-out;
`;

const fillOut = keyframes`
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

const Finish = styled(ProgressBar)`
  animation: ${fillOut} 1s;
`;

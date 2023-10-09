import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilState } from 'recoil';
import { Finish, Progressing } from './PageLoadingBar.style';
import { isShowPageLoadingState } from 'store/atoms/@common';
import useToggle from 'hooks/@common/useToggle';

const PageLoadingBar = () => {
  const [isShowPageLoading, setIsShowPageLoading] = useRecoilState(isShowPageLoadingState);
  const { isOn: isShowFinish, on: showFinish, off: hideFinish } = useToggle();
  const root = useMemo(() => document.getElementById('root')!, []);

  const setFinishState = () => {
    showFinish();

    setTimeout(() => {
      setIsShowPageLoading(false);
    }, 300);
    setTimeout(hideFinish, 1000);
  };

  useEffect(() => {
    if (!isShowPageLoading) {
      setFinishState();
    }
  }, [isShowPageLoading]);

  return createPortal(
    <>
      {isShowPageLoading && <Progressing />}
      {isShowFinish && <Finish />}
    </>,
    root
  );
};

export default PageLoadingBar;

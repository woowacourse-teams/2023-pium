import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { Finish, Progressing } from './PageLoadingBar.style';
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

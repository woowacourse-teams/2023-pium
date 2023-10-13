import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { Finish, Progressing } from './PageLoadingBar.style';
import { isShowPageLoadingState } from 'store/atoms/@common';
import useToggle from 'hooks/@common/useToggle';

export const FINISH_ANIMATION_TIME = 600;

const PageLoadingBar = () => {
  const isShowPageLoading = useRecoilValue(isShowPageLoadingState);

  const { isOn: isShow, on: show, off: hide } = useToggle();
  const { isOn: isShowFinish, on: showFinish, off: hideFinish } = useToggle();

  const root = useMemo(() => document.getElementById('root')!, []);

  useEffect(() => {
    if (isShowPageLoading) {
      show();
      hideFinish();
      return;
    }

    showFinish();
    const hideId = setTimeout(hide, FINISH_ANIMATION_TIME / 2);
    const hideFinishId = setTimeout(hideFinish, FINISH_ANIMATION_TIME);

    return () => {
      clearTimeout(hideId);
      clearTimeout(hideFinishId);
    };
  }, [isShowPageLoading]);

  return createPortal(
    <>
      {isShow && <Progressing />}
      {isShowFinish && <Finish $animationTime={FINISH_ANIMATION_TIME} />}
    </>,
    root
  );
};

export default PageLoadingBar;

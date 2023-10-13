import { PropsWithChildren, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isShowPageLoadingState, lastPageState } from 'store/atoms/@common';

const PageLogger = (props: PropsWithChildren) => {
  const { children } = props;
  const setLastPage = useSetRecoilState(lastPageState);
  const setIsShowPageLoadingState = useSetRecoilState(isShowPageLoadingState);

  useEffect(() => {
    setLastPage(children);
    setIsShowPageLoadingState(false);
  }, [children, setLastPage, setIsShowPageLoadingState]);

  return children;
};

export default PageLogger;

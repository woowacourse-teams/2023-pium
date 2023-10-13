import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Loading from 'pages/@common/Loading';
import { isShowPageLoadingState, lastPageState } from 'store/atoms/@common';

const LastPageLoading = () => {
  const lastPage = useRecoilValue(lastPageState);
  const setIsShowPageLoading = useSetRecoilState(isShowPageLoadingState);

  useEffect(() => {
    setIsShowPageLoading(true);

    return () => {
      setIsShowPageLoading(false);
    };
  }, [setIsShowPageLoading]);

  return lastPage || <Loading />;
};

export default LastPageLoading;

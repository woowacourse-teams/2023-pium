import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import Loading from 'pages/@common/Loading';
import { isShowPageLoadingState, lastPageState } from 'store/atoms/@common';

const LastPageLoading = () => {
  const lastPageValue = useRecoilValue(lastPageState);
  const setIsShowPageLoading = useSetRecoilState(isShowPageLoadingState);

  useEffect(() => {
    setIsShowPageLoading(true);

    return () => {
      setIsShowPageLoading(false);
    };
  }, []);

  return (
    <>
      {lastPageValue || <Loading />}
      <Backdrop />
    </>
  );
};

export default LastPageLoading;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(168, 168, 168, 0.1);
`;

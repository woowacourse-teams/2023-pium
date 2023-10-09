import { useContext, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import Loading from 'pages/@common/Loading';
import { isShowPageLoadingState } from 'store/atoms/@common';
import { LastPageContext } from '../RootTemplate';

const LastPageLoading = () => {
  const lastPageValue = useContext(LastPageContext);
  const setIsShowPageLoading = useSetRecoilState(isShowPageLoadingState);

  useEffect(() => {
    setIsShowPageLoading(true);

    return () => {
      setIsShowPageLoading(false);
    };
  }, []);

  return (
    <>
      {lastPageValue?.lastPage || <Loading />}
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

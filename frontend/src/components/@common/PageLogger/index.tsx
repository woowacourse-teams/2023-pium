import { PropsWithChildren, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { lastPageState } from 'store/atoms/@common';

const PageLogger = (props: PropsWithChildren) => {
  const { children } = props;
  const setLastPage = useSetRecoilState(lastPageState);

  useEffect(() => {
    setLastPage(children);
  }, []);

  return children;
};

export default PageLogger;

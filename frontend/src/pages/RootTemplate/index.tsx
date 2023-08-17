import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NotFound from 'pages/Error/NotFound';
import Loading from 'pages/Loading';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import Redirect from 'components/@common/Redirect';
import { PageArea, Wrapper } from './RootTemplate.style';
import { GUIDE, URL_PATH } from 'constants/index';

const RootTemplate = () => {
  return (
    <Wrapper>
      <PageArea>
        <ErrorBoundary fallback={<NotFound />}>
          <ErrorBoundary
            fallback={
              <Redirect
                to={URL_PATH.login}
                replace={true}
                toastType="warning"
                toastMessage={GUIDE.login}
              />
            }
            statusCode={401}
          >
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </ErrorBoundary>
      </PageArea>
    </Wrapper>
  );
};

export default RootTemplate;

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NotFound from 'pages/@common/Error/NotFound';
import LastPageLoading from 'pages/@common/LastPageLoading';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import Navbar from 'components/@common/Navbar';
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
            <Suspense fallback={<LastPageLoading />}>
              <Outlet />
            </Suspense>
            <Navbar />
          </ErrorBoundary>
        </ErrorBoundary>
      </PageArea>
    </Wrapper>
  );
};

export default RootTemplate;

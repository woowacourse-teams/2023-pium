import { Suspense } from 'react';
import { Outlet, matchRoutes, useLocation } from 'react-router-dom';
import NotFound from 'pages/@common/Error/NotFound';
import LastPageLoading from 'pages/@common/LastPageLoading';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import Navbar from 'components/@common/Navbar';
import Redirect from 'components/@common/Redirect';
import { PageArea, Wrapper } from './RootTemplate.style';
import { GUIDE, URL_PATH } from 'constants/index';

const NO_NAVIGATION_BAR_URLS = [
  URL_PATH.petRegisterForm,
  URL_PATH.dictDetail,
  URL_PATH.petEdit,
  URL_PATH.login,
  URL_PATH.authorization,
].map((path) => ({ path }));
const RootTemplate = () => {
  const { pathname } = useLocation();

  const showNavBar = matchRoutes(NO_NAVIGATION_BAR_URLS, pathname) === null;

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
            {showNavBar && <Navbar />}
          </ErrorBoundary>
        </ErrorBoundary>
      </PageArea>
    </Wrapper>
  );
};

export default RootTemplate;

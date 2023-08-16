import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NotFound from 'pages/Error/NotFound';
import Unauthorize from 'pages/Error/Unauthorize';
import Loading from 'pages/Loading';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import { PageArea, Wrapper } from './RootTemplate.style';

const RootTemplate = () => {
  return (
    <Wrapper>
      <PageArea>
        <ErrorBoundary fallback={<NotFound />}>
          <ErrorBoundary fallback={<Unauthorize />} statusCode={401}>
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

import { Outlet } from 'react-router-dom';
import { PageArea, Wrapper } from './Root.style';

const Root = () => {
  return (
    <Wrapper>
      <PageArea>
        <Outlet />
      </PageArea>
    </Wrapper>
  );
};

export default Root;

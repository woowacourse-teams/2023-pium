import { Outlet } from 'react-router-dom';
import { PageArea, Wrapper } from './RootTemplate.style';

const RootTemplate = () => {
  return (
    <Wrapper>
      <PageArea>
        <Outlet />
      </PageArea>
    </Wrapper>
  );
};

export default RootTemplate;

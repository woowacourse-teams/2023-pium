import { Wrapper } from './Main.style';
import getFilteredChildren from 'utils/getFilteredChildren';
import Element from './Element';

interface MainProps extends React.PropsWithChildren {
  topIndex: number;
}

const Main = ({ children, topIndex }: MainProps) => {
  const elements = getFilteredChildren(<Element height="" />, children);

  return <Wrapper>{elements.slice(0, topIndex + 1)}</Wrapper>;
};

export default Main;

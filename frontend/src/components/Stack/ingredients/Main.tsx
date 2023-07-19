import { useState } from 'react';
import { Wrapper } from './Main.style';
import getFilteredChildren from 'utils/getFilteredChildren';
import StackProvider from '../contexts/stackContext';
import Element from './Element';

const Main = ({ children }: React.PropsWithChildren) => {
  const [index, setIndex] = useState(0);
  const elements = getFilteredChildren(<Element height="" />, children);

  return (
    <StackProvider index={index} setIndex={setIndex} size={elements.length}>
      <Wrapper>{elements.slice(0, index + 1)}</Wrapper>
    </StackProvider>
  );
};

export default Main;

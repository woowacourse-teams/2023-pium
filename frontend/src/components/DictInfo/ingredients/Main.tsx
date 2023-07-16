import { Wrapper, WrapperProps } from './Main.style';
import Title from './Title.style';
import getFilteredChildren from '../../../utils/getFilteredChildren';
import Content from './Content';

interface MainProps extends React.PropsWithChildren {
  alignment?: 'row' | 'column';
  contentDirection?: 'row' | 'column';
}

type DictInfoProps = MainProps & WrapperProps;

const Main = (props: DictInfoProps) => {
  const {
    children,
    alignment = 'column',
    contentDirection = 'row',
    width = '',
    height = '',
  } = props;

  const [title] = getFilteredChildren(<Title />, children, 1);
  const contents = getFilteredChildren(<Content />, children);

  return (
    <Wrapper flexDirection={alignment} width={width} height={height}>
      <Wrapper flexDirection="row">{title}</Wrapper>
      <Wrapper flexDirection={contentDirection}>{contents}</Wrapper>
    </Wrapper>
  );
};

export default Main;

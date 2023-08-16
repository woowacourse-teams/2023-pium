import Content from 'components/@common/Tag';
import { Flexbox, SizedFlexBox } from './Main.style';
import Title from './Title.style';
import getFilteredChildren from 'utils/getFilteredChildren';

interface DictInfoProps extends React.PropsWithChildren {
  alignment?: 'row' | 'column';
  contentDirection?: 'row' | 'column';
  width?: string;
  height?: string;
}

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
    <SizedFlexBox $flexDirection={alignment} $width={width} $height={height}>
      <Flexbox $flexDirection="row">{title}</Flexbox>
      <Flexbox $flexDirection={contentDirection}>{contents}</Flexbox>
    </SizedFlexBox>
  );
};

export default Main;

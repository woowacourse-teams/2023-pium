import { Link } from 'react-router-dom';
import Image from 'components/Image';
import { Wrapper, Name } from './SearchResultItem.style';

interface SearchResultItemProps {
  id: number;
  name: string;
  imageUrl: string;
}

const SearchResultItem = (props: SearchResultItemProps) => {
  const { id, name, imageUrl } = props;

  return (
    <Link to={`/dict/${id}`}>
      <Wrapper>
        <Image type="circle" size="55px" alt={name} src={imageUrl} />
        <Name>{name}</Name>
      </Wrapper>
    </Link>
  );
};

export default SearchResultItem;

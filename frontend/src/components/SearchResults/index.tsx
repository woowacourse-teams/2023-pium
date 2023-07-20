import SearchResultItem from 'components/SearchResultItem';
import { Title, ResultArea, Wrapper } from './SearchResults.style';
import Dictionary from '../../queries/dictionaryPlants';

interface SearchResultsProps {
  plantName: string;
}

const SearchResults = (props: SearchResultsProps) => {
  const { plantName } = props;
  const { data } = Dictionary.useSearchName(plantName);

  const samePlant = data?.find(({ name }) => name === plantName);
  const similarPlants = data?.filter(({ name }) => name !== plantName);

  const hasSimilarPlant = similarPlants && similarPlants.length > 0;

  if (!data || (!samePlant && !hasSimilarPlant)) {
    return (
      <Wrapper>
        <Title>&quot;{plantName}&quot; 검색 결과가 없어요 😭</Title>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {samePlant && (
        <ResultArea>
          <Title>완전 똑같은 식물!!</Title>
          <SearchResultItem id={samePlant.id} imageUrl={samePlant.image} name={samePlant.name} />
        </ResultArea>
      )}
      {!!similarPlants?.length && (
        <ResultArea>
          <Title>비슷한 이름을 가진 식물</Title>
          {similarPlants.map(({ id, name, image }) => (
            <SearchResultItem key={id} id={id} name={name} imageUrl={image} />
          ))}
        </ResultArea>
      )}
    </Wrapper>
  );
};

export default SearchResults;

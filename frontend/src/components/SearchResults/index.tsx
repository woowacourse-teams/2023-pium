import SearchResultItem from 'components/SearchResultItem';
import { Title, ResultArea, Wrapper } from './SearchResults.style';
import useDictSearch from 'hooks/queries/dictionary/useDictSearch';

interface SearchResultsProps {
  plantName: string;
}

const SearchResults = (props: SearchResultsProps) => {
  const { plantName } = props;
  const { data: searchResults } = useDictSearch(plantName);

  const samePlant = searchResults?.find(({ name }) => name === plantName);
  const similarPlants = searchResults?.filter(({ name }) => name !== plantName);

  const hasSimilarPlant = similarPlants && similarPlants.length > 0;

  if (!searchResults || (!samePlant && !hasSimilarPlant)) {
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

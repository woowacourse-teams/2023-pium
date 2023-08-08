import SearchResultItem from 'components/search/SearchResultItem';
import { Title, ResultList, Wrapper } from './SearchResults.style';
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
        <Title>검색 결과가 없어요 😭</Title>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {samePlant && (
        <>
          <Title>완전 똑같은 식물!!</Title>
          <ResultList>
            <li>
              <SearchResultItem
                id={samePlant.id}
                imageUrl={samePlant.image}
                name={samePlant.name}
              />
            </li>
          </ResultList>
        </>
      )}
      {!!similarPlants?.length && (
        <>
          <Title>비슷한 이름을 가진 식물</Title>
          <ResultList>
            {similarPlants.map(({ id, name, image }) => (
              <li key={id}>
                <SearchResultItem id={id} name={name} imageUrl={image} />
              </li>
            ))}
          </ResultList>
        </>
      )}
    </Wrapper>
  );
};

export default SearchResults;

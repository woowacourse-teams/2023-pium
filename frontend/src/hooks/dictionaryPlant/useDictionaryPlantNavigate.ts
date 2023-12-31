import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useCallback } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { URL_PATH } from 'constants/index';

const useDictionaryPlantNavigate = () => {
  const navigate = useNavigate();

  const goToDictionaryPlantDetailPage = useCallback(
    ({ id }: DictionaryPlantNameSearchResult) => {
      navigate(generatePath(URL_PATH.dictDetail, { id: id.toString() }));
    },
    [navigate]
  );

  const goToProperDictionaryPlantPage = useCallback(
    (searchName: string, searchResults?: DictionaryPlantNameSearchResult[]) => {
      if (!searchName || !searchResults) return;

      const samePlant = searchResults.find(({ name }) => name === searchName);

      if (!samePlant) {
        navigate(`/dict?search=${searchName}`);
        return;
      }

      goToDictionaryPlantDetailPage(samePlant);
    },
    [navigate, goToDictionaryPlantDetailPage]
  );

  return { goToDictionaryPlantDetailPage, goToProperDictionaryPlantPage };
};

export default useDictionaryPlantNavigate;

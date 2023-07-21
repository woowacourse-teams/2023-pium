import type { DictNameSearchResult } from 'types/api/dictionary';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useDictionaryNavigate = () => {
  const navigate = useNavigate();

  const goToDictDetailPage = useCallback((plantId: number) => {
    navigate(`/dict/${plantId}`);
  }, []);

  const goToProperDictPage = useCallback(
    (searchName: string, searchResults?: DictNameSearchResult[]) => {
      if (!searchName || !searchResults) return;

      const samePlant = searchResults.find(({ name }) => name === searchName);

      if (!samePlant) {
        navigate(`/dict?search=${searchName}`);
        return;
      }

      goToDictDetailPage(samePlant.id);
    },
    []
  );

  return { goToDictDetailPage, goToProperDictPage };
};

export default useDictionaryNavigate;

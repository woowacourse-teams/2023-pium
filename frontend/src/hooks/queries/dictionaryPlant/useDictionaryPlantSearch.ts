import type { DataResponse } from 'types/DataResponse';
import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import DictionaryPlantAPI, { DICTIONARY_PLANT_URL } from 'apis/dictionaryPlant';

const useDictionaryPlantSearch = (name: string) =>
  useQuery<
    DataResponse<DictionaryPlantNameSearchResult[]>,
    Error,
    DictionaryPlantNameSearchResult[]
  >({
    queryKey: [DICTIONARY_PLANT_URL, 'search', name],

    queryFn: async () => {
      const response = await DictionaryPlantAPI.getSearch(name);
      const data = await response.json();
      return data;
    },

    select: ({ data }) => data,
    placeholderData: keepPreviousData,

    enabled: name.trim() !== '',
    staleTime: Infinity,
  });

export default useDictionaryPlantSearch;

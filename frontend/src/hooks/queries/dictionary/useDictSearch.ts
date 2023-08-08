import type { DictNameSearchResponse, DictNameSearchResult } from 'types/api/dictionaryPlant';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import DictAPI, { DICT } from 'apis/dictionary';

const useDictSearch = (name: string) =>
  useQuery<DictNameSearchResponse, Error, DictNameSearchResult[]>({
    queryKey: [DICT, 'search', name],

    queryFn: async () => {
      const response = await DictAPI.getSearch(name);
      const data = await response.json();
      return data;
    },
    select: ({ data }) => data,
    placeholderData: keepPreviousData,

    enabled: name.trim() !== '',
    staleTime: Infinity,
  });

export default useDictSearch;

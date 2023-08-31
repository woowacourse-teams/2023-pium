import type { DataResponse } from 'types/DataResponse';
import type { DictNameSearchResult } from 'types/dictionaryPlant';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import DictAPI, { DICT } from 'apis/dictionaryPlant';

const useDictSearch = (name: string) =>
  useQuery<DataResponse<DictNameSearchResult[]>, Error, DictNameSearchResult[]>({
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

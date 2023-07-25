import type {
  DictNameSearchResponse,
  DictNameSearchResult,
  DictionaryPlant,
} from 'types/api/dictionary';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import DictAPI from 'apis/dictionary';

const useSearchName = (name: string) =>
  useQuery<DictNameSearchResponse, Error, DictNameSearchResult[]>({
    queryKey: ['search', name],

    queryFn: async () => {
      const response = await DictAPI.getNameSearch(name);
      const data = await response.json();
      return data;
    },
    select: ({ data }) => data,
    placeholderData: keepPreviousData,

    enabled: name.trim() !== '',
    staleTime: Infinity,
  });

const useDetail = (id: number) =>
  useQuery<DictionaryPlant, Error, DictionaryPlant>({
    queryKey: ['detail', id],
    queryFn: async () => {
      const response = await DictAPI.getDetail(id);
      const data = await response.json();
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

const DictQuery = {
  useSearchName,
  useDetail,
};

export default DictQuery;

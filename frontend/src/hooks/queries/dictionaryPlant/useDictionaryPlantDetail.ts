import type { DictionaryPlant, Season, SeasonKor } from 'types/dictionaryPlant';
import { useQuery } from '@tanstack/react-query';
import DictAPI, { DICT } from 'apis/dictionaryPlant';
import { SEASONS } from 'constants/index';

export interface DictionaryPlantExtendCycles extends DictionaryPlant {
  waterOptions: Record<SeasonKor, string>;
}

const initialWaterOptions: DictionaryPlantExtendCycles['waterOptions'] = {
  봄: '',
  여름: '',
  가을: '',
  겨울: '',
};

const useDictDetail = (id: number) =>
  useQuery<DictionaryPlant, Error, DictionaryPlantExtendCycles>({
    queryKey: [DICT, 'detail', id],
    queryFn: async () => {
      const response = await DictAPI.getDetail(id);

      if (!response.ok) throw Error('뭔가가 잘못되어 벌임;;');
      const data = await response.json();
      return data;
    },
    staleTime: Infinity,
    suspense: true,
    throwOnError: true,
    select: (data) => {
      const { waterCycle } = data;

      const waterOptions = [...Object.entries(waterCycle)].reduce((prev, cur) => {
        const [season, data] = cur as [Season, string];
        const key = SEASONS[season];
        return { ...prev, [key]: data };
      }, initialWaterOptions);

      return { ...data, waterOptions };
    },
  });

export default useDictDetail;

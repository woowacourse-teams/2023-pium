import type { DictionaryPlant, Season, SeasonKor } from 'types/dictionaryPlant';
import { useQuery } from '@tanstack/react-query';
import DictionaryPlantAPI, { DICTIONARY_PLANT_URL } from 'apis/dictionaryPlant';
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

const useDictionaryPlantDetail = (id: number) =>
  useQuery<DictionaryPlant, Error, DictionaryPlantExtendCycles>({
    queryKey: [DICTIONARY_PLANT_URL, 'detail', id],

    queryFn: async () => {
      const response = await DictionaryPlantAPI.getDetail(id);

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

export default useDictionaryPlantDetail;

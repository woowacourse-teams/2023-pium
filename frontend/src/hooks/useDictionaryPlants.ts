import { DictPlantExtendCycles } from 'types/api/dictionary';
import { Season, SeasonKor } from 'types/plants';
import { useQuery } from '@tanstack/react-query';
import DictAPI, { DICT } from 'apis/dictionary';
import { SEASONS } from 'constants/index';

const initialSeasonInfo: Record<SeasonKor, string> = {
  봄: '',
  여름: '',
  가을: '',
  겨울: '',
};

const useDictionaryPlants = (id: number) => {
  const { data: dictionary } = useQuery<DictPlantExtendCycles>({
    queryKey: [`${DICT}/${id}`],
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
      }, initialSeasonInfo);

      return { ...data, waterOptions };
    },
  });

  return { dictionary };
};

export default useDictionaryPlants;

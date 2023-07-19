import { DictionaryPlant } from 'types/api/dictionary';
import { Season, SeasonKor } from 'types/plants';
import { useEffect, useState } from 'react';
import dictAPI from 'apis/dict';
import { seasonConverter } from 'utils/plants';

const initialSeasonInfo: Record<SeasonKor, string> = {
  봄: '',
  여름: '',
  가을: '',
  겨울: '',
};

const useDictionaryPlants = (id: string | undefined) => {
  const [dictionary, setDictionary] = useState<DictionaryPlant | null>(null);
  const [waterOption, setWaterOption] = useState<Record<SeasonKor, string>>(initialSeasonInfo);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      if (!id) throw new Error('id가 유효하지 않습니다.');
      const response = await dictAPI.getDictInfo(id);

      if (!response.ok) throw new Error('무엇인가 잘못됐습니다.');

      const data = (await response.json()) as DictionaryPlant;

      const seasonOptions = [...Object.entries(data.waterCycle)].reduce((prev, cur) => {
        const [season, data] = cur as [Season, string];
        const key = seasonConverter(season);
        return { ...prev, [key]: data };
      }, waterOption);

      setWaterOption(seasonOptions);
      setDictionary(data);
    } catch (e) {
      console.log(e);
    }
  };

  return { dictionary, waterOption };
};

export default useDictionaryPlants;

import { DictionaryPlant } from 'types/api/dictionary';
import { useEffect, useState } from 'react';
import dictAPI from 'apis/dict';

const useDictionaryPlants = (id: string | undefined) => {
  const [dictionary, setDictionary] = useState<DictionaryPlant | null>(null);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      if (!id) throw new Error('id가 유효하지 않습니다.');
      const response = await dictAPI.getDictInfo(id);

      if (!response.ok) throw new Error('무엇인가 잘못됐습니다.');

      const data = await response.json();
      setDictionary(data);
    } catch (e) {
      console.log(e);
    }
  };

  return { dictionary };
};

export default useDictionaryPlants;

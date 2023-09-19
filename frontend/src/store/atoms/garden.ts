import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { atom } from 'recoil';

const selectedDictionaryPlantAtom = atom<DictionaryPlantNameSearchResult | null>({
  key: 'selectedDictionaryPlant',
  default: null,
});

export default selectedDictionaryPlantAtom;

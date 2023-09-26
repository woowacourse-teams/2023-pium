import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { atom } from 'recoil';

export const selectedDictionaryPlantState = atom<DictionaryPlantNameSearchResult | null>({
  key: 'selectedDictionaryPlant',
  default: null,
});

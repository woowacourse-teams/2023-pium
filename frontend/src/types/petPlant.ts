import type { DateFormat } from './date';
import type { DictionaryPlant } from './dictionaryPlant';

export interface PetPlantDetails {
  id: number;
  nickname: string;
  imageUrl: string;
  dictionaryPlant: Pick<DictionaryPlant, 'id' | 'name'>;
  location: string;
  flowerpot: string;
  light: string;
  wind: string;
  birthDate: DateFormat;
  secondLastWaterDate: DateFormat | null;
  lastWaterDate: DateFormat;
  waterCycle: number;
  dday: number;
  daySince: number;
  nextWaterDate: DateFormat;
}

export interface NewPetPlantRequest
  extends Pick<
    PetPlantDetails,
    | 'nickname'
    | 'location'
    | 'flowerpot'
    | 'light'
    | 'wind'
    | 'birthDate'
    | 'lastWaterDate'
    | 'waterCycle'
  > {
  dictionaryPlantId: DictionaryPlant['id'];
}

export interface PetPlantItem
  extends Pick<PetPlantDetails, 'id' | 'nickname' | 'imageUrl' | 'birthDate' | 'daySince'> {
  dictionaryPlantName: DictionaryPlant['name'];
}

export type EditPetPlantRequest = Omit<NewPetPlantRequest, 'dictionaryPlantId'>;

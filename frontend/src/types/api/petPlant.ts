import type { DataResponse } from './DataResponse';
import type { DictionaryPlant } from './dictionary';

export interface PetPlantDetails {
  id: number;
  nickname: string;
  imageUrl: string;
  dictionaryPlant: Pick<DictionaryPlant, 'id' | 'name'>;
  location: string;
  flowerpot: string;
  light: string;
  wind: string;
  birthDate: string;
  lastWaterDate: string;
  waterCycle: number;
  dDay: number;
  daySince: number;
  nextWaterDate: string;
}

export interface NewPetPlantRequest
  extends Pick<
    PetPlantDetails,
    'nickname' | 'birthDate' | 'waterCycle' | 'location' | 'flowerpot' | 'light' | 'wind'
  > {
  dictionaryPlantId: DictionaryPlant['id'];
}

export interface PetPlantCard
  extends Pick<PetPlantDetails, 'id' | 'nickname' | 'imageUrl' | 'birthDate' | 'daySince'> {
  dictionaryPlantName: DictionaryPlant['name'];
}

export type PetPlantCardListResponse = DataResponse<PetPlantCard[]>;

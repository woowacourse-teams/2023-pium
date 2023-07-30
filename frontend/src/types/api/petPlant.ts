import type { DataResponse } from './DataResponse';
import type { DictionaryPlant } from './dictionary';

export interface Pet {
  id: number;
  nickname: string;
  imageUrl: string;
  dictionaryPlantName: string;
  birthDate: string;
  daySince: number;
}

export type PetListResponse = DataResponse<Pet[]>;

export interface NewPetPlantRequest {
  dictionaryPlantId: DictionaryPlant['id'];
  nickname: string;
  birthDate: string;

  waterCycle: number;
  lastWaterDate: string;

  location: string;
  flowerpot: string;
  light: string;
  wind: string;
}

export interface PetPlantDetails extends Omit<NewPetPlantRequest, 'dictionaryPlantId'> {
  id: number;
  imageUrl: string;
  dictionaryPlant: {
    id: DictionaryPlant['id'];
    name: DictionaryPlant['name'];
  };

  dDay: number;
  daySince: number;
  nextWaterDate: string;
}

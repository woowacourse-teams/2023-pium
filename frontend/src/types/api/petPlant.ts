import type { DataResponse } from './DataResponse';

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
  dictionaryPlantId: number;
  nickname: string;
  birthDate: string;

  waterCycle: number;
  lastWaterDate: string;

  location: string;
  flowerpot: string;
  light: string;
  wind: string;
}

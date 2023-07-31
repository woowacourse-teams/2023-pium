import type { DataResponse } from './DataResponse';
import type { DictionaryPlant } from './dictionary';

export interface PetDetails {
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

export interface NewPetRequest
  extends Pick<
    PetDetails,
    'nickname' | 'birthDate' | 'waterCycle' | 'location' | 'flowerpot' | 'light' | 'wind'
  > {
  dictionaryPlantId: DictionaryPlant['id'];
}

export interface PetCard
  extends Pick<PetDetails, 'id' | 'nickname' | 'imageUrl' | 'birthDate' | 'daySince'> {
  dictionaryPlantName: DictionaryPlant['name'];
}

export type PetCardListResponse = DataResponse<PetCard[]>;

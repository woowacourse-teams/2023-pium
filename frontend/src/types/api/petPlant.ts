import type { DictionaryPlant } from './dictionary';

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

  nextWaterDay: number;
  daySince: number;
}

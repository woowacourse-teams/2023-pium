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

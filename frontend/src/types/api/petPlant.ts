export interface NewPetPlantRequest {
  nickname?: string;

  dictionaryPlantId: number;

  waterCycle: number;
  lastWaterDate: string;

  location: string;
  flowerpot: string;
  light: string;
  wind: string;
  birthDate: string;
}

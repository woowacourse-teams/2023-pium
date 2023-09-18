import type { DateFormat } from './date';
import type { DictionaryPlant, ManageLevel } from './dictionaryPlant';
import type { PetPlantDetails } from './petPlant';

export interface GardenPostItem {
  id: number;
  content: string;
  createdAt: DateFormat;
  updatedAt: DateFormat;
  dictionaryPlantName: DictionaryPlant['name'];
  manageLevel: ManageLevel;
  petPlant: Pick<
    PetPlantDetails,
    | 'imageUrl'
    | 'nickname'
    | 'location'
    | 'flowerpot'
    | 'light'
    | 'wind'
    | 'daySince'
    | 'waterCycle'
  >;
}

export interface GardenRegisterForm {
  petPlantId: PetPlantDetails['id'];
  content: GardenPostItem['content'];
  manageLevel: ManageLevel;
}

import type { DateFormat } from './date';
import type { ManageLevel } from './dictionaryPlant';
import type { PetPlantDetails } from './petPlant';

export interface GardenPostItem {
  id: number;
  content: string;
  createdAt: DateFormat;
  updatedAt: DateFormat;
  manageLevel: Exclude<ManageLevel, '정보없음'>;
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

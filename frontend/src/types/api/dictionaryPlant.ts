import { ManageLevel, Season } from 'types/plants';

export interface DictionaryPlant {
  id: number;
  name: string;
  image: string;
  familyName: string;
  smell: string;
  poison: string;
  manageLevel: ManageLevel;
  growSpeed: string;
  requireTemp: string;
  minimumTemp: string;
  requireHumidity: string;
  postingPlace: string[];
  specialManageInfo: string;
  waterCycle: Record<Season, string>;
}

export type DictNameSearchResult = Pick<DictionaryPlant, 'id' | 'name' | 'image'>;

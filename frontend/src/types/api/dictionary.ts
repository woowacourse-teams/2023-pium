import { ManageLevel, Season, SeasonKor } from 'types/plants';
import { DataResponse } from './DataResponse';

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

export interface DictPlantExtendCycles extends DictionaryPlant {
  waterOptions: Record<SeasonKor, string>;
}

export type DictNameSearchResult = Pick<DictionaryPlant, 'id' | 'name' | 'image'>;

export type DictNameSearchResponse = DataResponse<DictNameSearchResult[]>;

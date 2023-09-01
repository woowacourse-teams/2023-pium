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

export type DictionaryPlantNameSearchResult = Pick<DictionaryPlant, 'id' | 'name' | 'image'>;

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type SeasonKor = '봄' | '여름' | '가을' | '겨울';
export type ManageLevel = '초보자' | '경험자' | '전문가' | '정보없음';

import { PetPlantDetails } from './petPlant';

export interface HistoryResponse {
  page: number;
  size: number;
  elementSize: number;
  hasNext: boolean;
  data: HistoryItem[];
}

export interface HistoryItem {
  type: HistoryType;
  date: string;
  content: {
    previous: string | null;
    current: string;
  };
}

export type HistoryType = keyof Pick<
  PetPlantDetails,
  'lastWaterDate' | 'waterCycle' | 'flowerpot' | 'light' | 'location'
>;

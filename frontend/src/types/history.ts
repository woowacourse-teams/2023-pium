import type { DataResponse } from './DataResponse';
import type { DateFormat } from './date';
import { PetPlantDetails } from './petPlant';

export interface HistoryResponse extends DataResponse<HistoryItem[]> {
  page: number;
  size: number;
  elementSize: number;
  hasNext: boolean;
}

export interface HistoryItem {
  type: HistoryType;
  date: DateFormat;
  content: {
    previous: string | null;
    current: string;
  };
}

export type HistoryType = keyof Pick<
  PetPlantDetails,
  'lastWaterDate' | 'waterCycle' | 'flowerpot' | 'light' | 'location'
>;

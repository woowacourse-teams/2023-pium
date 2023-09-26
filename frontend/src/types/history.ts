import { NO_PREVIOUS_VALUE } from 'constants/index';
import type { DateFormat } from './date';
import type { PetPlantDetails } from './petPlant';

export interface HistoryItem {
  type: HistoryType;
  date: DateFormat;
  content: {
    previous: string | typeof NO_PREVIOUS_VALUE;
    current: string;
  };
}

export type HistoryType = keyof Pick<
  PetPlantDetails,
  'lastWaterDate' | 'waterCycle' | 'flowerpot' | 'light' | 'location' | 'wind'
>;

import type { DateFormat } from './date';

export interface HistoryResponse {
  page: number;
  size: number;
  elementSize: number;
  hasNext: boolean;
  waterDateList: DateFormat[];
}

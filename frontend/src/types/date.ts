export interface MonthInfo {
  year: string;
  month: string;
  monthFirstDay: number;
  monthLastDate: number;
}

export interface DayInfo {
  idx: number;
  monthInfo: MonthInfo;
  min: string | null;
  max: string | null;
}

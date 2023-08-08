export interface MonthInfo {
  year: string;
  month: string;
  monthFirstDay: number;
  monthLastDate: number;
}

export interface DayInfo {
  idx: number;
  monthInfo: MonthInfo;
  min: React.InputHTMLAttributes<HTMLInputElement>['max'];
  max: React.InputHTMLAttributes<HTMLInputElement>['min'];
}

export type Month =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';

export type DateFormat = `${number}-${Month}-${string}`; // YYYY-MM-DD

type DecimalDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Year = `${'19' | '20'}${DecimalDigit}${DecimalDigit}`;

export type Month = `0${Exclude<DecimalDigit, '0'>}` | '10' | '11' | '12';

export type Day = `${'0' | '1' | '2'}${DecimalDigit}` | '30' | '31';

export type DateFormat = `${Year}-${Month}-${Day}`;

export interface MonthInfo {
  year: Year;
  month: Month;
  monthFirstDay: number;
  monthLastDate: number;
}

export interface DayInfo {
  idx: number;
  monthInfo: MonthInfo;
  min: React.InputHTMLAttributes<HTMLInputElement>['max'];
  max: React.InputHTMLAttributes<HTMLInputElement>['min'];
}

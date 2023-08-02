import { DataResponse } from './DataResponse';

export type ReminderStatus = 'late' | 'today' | 'future'; // 오늘 할 일에 대한 상태

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

export interface Reminder {
  petPlantId: number;
  image: string;
  nickName: string;
  dictionaryPlantName: string;
  dday: number; // 음수면 지각 | 0이면 오늘 | 양수면 미래
  nextWaterDate: string;
  lastWaterDate: string;
}

export type ReminderResponse = DataResponse<Reminder[]>;

export type MonthArrangedReminder = Array<[Month, ReminderExtendType[]]>;

export interface ReminderExtendType extends Reminder {
  date: string;
  status: ReminderStatus;
}

export interface ArrangedReminderWithStatus {
  data: MonthArrangedReminder;
  status: ReminderStatus;
}

export interface WaterPlantParams {
  id: number;
  body: {
    waterDate: string;
  };
}

export interface ChangeDateParams {
  id: number;
  body: {
    nextWaterDate: string;
  };
}

export type TodayStatus = 'late' | 'exist' | 'none'; // 오늘 할 일에 대한 상태

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
  dDay: number; // 음수면 지각 | 0이면 오늘 | 양수면 미래
  nextWaterDate: string;
}

export interface ReminderResult {
  data: Reminder[];
}

export type MonthKeyReminderType = {
  [key in Month]?: ReminderExtendType[];
};

export interface ReminderExtendType extends Reminder {
  date: string;
  status: TodayStatus;
}

export interface ConvertReminderData {
  data: MonthKeyReminderType;
  status: TodayStatus;
}

export interface WaterPlantProps {
  id: number;
  body: {
    waterDate: string;
  };
}

export interface PushOffProps {
  id: number;
  body: {
    nextWaterDate: string;
  };
}

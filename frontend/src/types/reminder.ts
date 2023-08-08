import { PetPlantDetails } from './petPlant';

export type TodayStatus = 'late' | 'today' | 'future'; // 오늘 할 일에 대한 상태

export interface Reminder {
  petPlantId: PetPlantDetails['id'];
  image: PetPlantDetails['imageUrl'];
  nickName: PetPlantDetails['nickname'];
  dictionaryPlantName: PetPlantDetails['dictionaryPlant']['name'];
  dday: PetPlantDetails['dday']; // 음수면 지각 | 0이면 오늘 | 양수면 미래
  nextWaterDate: PetPlantDetails['nextWaterDate'];
  lastWaterDate: PetPlantDetails['lastWaterDate'];
}

export interface ReminderExtendType extends Reminder {
  date: string;
  status: TodayStatus;
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

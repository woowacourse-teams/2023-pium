export interface Reminder {
  petPlantId: number;
  image: string;
  nickName: string;
  dictionaryPlantName: string;
  nextWaterDay: number; // 음수면 지각 | 0이면 오늘 | 양수면 미래
  nextWaterDate: string;
}

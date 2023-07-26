import { Reminder } from "types/api/reminder";
import { getParticularDateFromToday } from "utils/date";

const KEY = 'MSW_REMINDER';

const getAll = ():{data:Reminder[]} => {
  const storageData = sessionStorage.getItem(KEY);
  return storageData ? JSON.parse(storageData) : {data:[]};
};

const water = (id:number) =>{
  const {data} = JSON.parse(sessionStorage.getItem(KEY) ?? '[]') as {data:Reminder[]}
  const updatedData = data.map((data) => {
    const {petPlantId} = data
    if(id !== petPlantId) return data

    return {
      ...data,
      nextWaterDate: getParticularDateFromToday(3),
      dDay:-3
    }
  })


  sessionStorage.setItem(KEY, JSON.stringify({data:updatedData}))
}



const Reminder = { getAll,water };

export default Reminder;

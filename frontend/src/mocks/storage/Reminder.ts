import { Reminder } from "types/api/reminder";
import { getDaysBetweenDate, getParticularDateFromSpecificDay, getToday } from "utils/date";

const KEY = 'MSW_REMINDER';

const getAll = ():{data:Reminder[]} => {
  const storageData = sessionStorage.getItem(KEY);
  return storageData ? JSON.parse(storageData) : {data:[]};
};

const water = (id:number,date:string) =>{ // 물을 준 것임. 물을 줬으니까 다음 날을 반환해 줘야 함.
  const {data} = JSON.parse(sessionStorage.getItem(KEY) ?? '[]') as {data:Reminder[]}

  const updatedData = data.map((data) => {
    const {petPlantId} = data
    if(id !== petPlantId) return data

    const betweenDate = getDaysBetweenDate(getToday(), date); // date에 물을 준거임... 다음 물주기는 언제가 될지 모름.

    const ranNum =Math.ceil( Math.random()*10)

    return {
      ...data,
      nextWaterDate: getParticularDateFromSpecificDay(betweenDate+ranNum),
      dDay:-(betweenDate+ranNum)
    }
  })


  sessionStorage.setItem(KEY, JSON.stringify({data:updatedData}))
}

const changeDate = (id:number,date:string) =>{// 여기는 미루기임. 입력된 날짜에 물을 줄 수 있도록 해야함.
  const {data} = JSON.parse(sessionStorage.getItem(KEY) ?? '[]') as {data:Reminder[]}
  
  const updatedData = data.map((data) => {
    const {petPlantId} = data
    if(id !== petPlantId) return data
    
    const betweenDate = getDaysBetweenDate(getToday(), date);

    return {
      ...data,
      nextWaterDate: date,
      dDay:-betweenDate
    }
  })

  sessionStorage.setItem(KEY, JSON.stringify({data:updatedData}))
}



const Reminder = { getAll,water,changeDate };

export default Reminder;

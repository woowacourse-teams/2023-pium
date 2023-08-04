import { getParticularDateFromSpecificDay, getDateToString } from 'utils/date';

const TODAY = getDateToString();

const REMINDER_DATA = {
  data: [
    {
      petPlantId: 0,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '내가 만든 쿠키이이이이 히? 너는 절대 못먹지 캔츄바레 원잇  플리즈',
      dictionaryPlantName: '이 편지는 영국에서 시작해서 그렇게 변화게 되어왔습니다.',
      dday: 20,
      nextWaterDate: getParticularDateFromSpecificDay(-20, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(-27, new Date()),
    },
    {
      petPlantId: 1,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '참새 나무',
      dictionaryPlantName: '알로카시아',
      dday: 20,
      nextWaterDate: getParticularDateFromSpecificDay(-20, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(-27, new Date()),
    },
    {
      petPlantId: 2,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '그레이 나무',
      dictionaryPlantName: '스투키',
      dday: 11,
      nextWaterDate: getParticularDateFromSpecificDay(-11, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(-18, new Date()),
    },
    {
      petPlantId: 3,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '하마드 나무',
      dictionaryPlantName: '스투키',
      dday: 3,
      nextWaterDate: getParticularDateFromSpecificDay(-3, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(-10, new Date()),
    },
    {
      petPlantId: 4,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '주노 나무',
      dictionaryPlantName: '스투키',
      dday: 3,
      nextWaterDate: getParticularDateFromSpecificDay(-3, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(-10, new Date()),
    },
    {
      petPlantId: 5,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '조이 나무',
      dictionaryPlantName: '스투키',
      dday: 1,
      nextWaterDate: getParticularDateFromSpecificDay(-1, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(-8, new Date()),
    },
    {
      petPlantId: 6,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '쵸파 나무',
      dictionaryPlantName: '스투키',
      dday: 0,
      nextWaterDate: TODAY,
      lastWaterDate: getParticularDateFromSpecificDay(-7, new Date()),
    },
    {
      petPlantId: 7,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '클린 나무',
      dictionaryPlantName: '스투키',
      dday: 0,
      nextWaterDate: TODAY,
      lastWaterDate: getParticularDateFromSpecificDay(-7, new Date()),
    },
    {
      petPlantId: 8,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '피움 나무',
      dictionaryPlantName: '스투키',
      dday: 0,
      nextWaterDate: TODAY,
      lastWaterDate: getParticularDateFromSpecificDay(-7, new Date()),
    },
    {
      petPlantId: 9,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '포비 나무',
      dictionaryPlantName: '스투키',
      dday: -3,
      nextWaterDate: getParticularDateFromSpecificDay(3, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(-4, new Date()),
    },
    {
      petPlantId: 10,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '크론 나무',
      dictionaryPlantName: '스투키',
      dday: -3,
      nextWaterDate: getParticularDateFromSpecificDay(3, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(-4, new Date()),
    },
    {
      petPlantId: 11,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '빠삐용',
      dictionaryPlantName: '스투키',
      dday: -7,
      nextWaterDate: getParticularDateFromSpecificDay(7, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(0, new Date()),
    },
    {
      petPlantId: 12,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '우테코',
      dictionaryPlantName: '스투키',
      dday: -10,
      nextWaterDate: getParticularDateFromSpecificDay(10, new Date()),
      lastWaterDate: getParticularDateFromSpecificDay(-14, new Date()),
    },
  ],
};

export default REMINDER_DATA;

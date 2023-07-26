import type { PetPlantDetails } from 'types/api/petPlant';
import { getToday } from 'utils/date';
import { OPTIONS } from 'constants/index';

const PET_PLANTS_DATA: PetPlantDetails[] = [
  {
    id: 1,
    nickname: '그레이',
    dictionaryPlant: {
      id: 1,
      name: '백엔드1',
    },
    imageUrl: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062',
    birthDate: '2023-03-03',
    daySince: 9,

    waterCycle: 10,
    lastWaterDate: '2023-07-07',
    dDay: 2,
    nextWaterDate: '2023-07-17',

    location: OPTIONS.location[0],
    flowerpot: OPTIONS.flowerPot[0],
    light: OPTIONS.light[0],
    wind: OPTIONS.wind[0],
  },
  {
    id: 2,
    nickname: '조이',
    dictionaryPlant: {
      id: 2,
      name: '백엔드2',
    },
    imageUrl: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062',
    birthDate: '2023-04-04',
    daySince: 99,

    waterCycle: 5,
    lastWaterDate: '2023-07-07',
    dDay: -1,
    nextWaterDate: '2023-07-17',

    location: OPTIONS.location[0],
    flowerpot: OPTIONS.flowerPot[0],
    light: OPTIONS.light[0],
    wind: OPTIONS.wind[0],
  },
  {
    id: 3,
    nickname: '주노',
    dictionaryPlant: {
      id: 3,
      name: '백엔드3',
    },
    imageUrl: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062',
    birthDate: '2023-05-05',
    daySince: 999,

    waterCycle: 10,
    lastWaterDate: '2023-07-07',
    dDay: 0,
    nextWaterDate: '2023-07-17',

    location: OPTIONS.location[0],
    flowerpot: OPTIONS.flowerPot[0],
    light: OPTIONS.light[0],
    wind: OPTIONS.wind[0],
  },
  {
    id: 4,
    nickname: '하마드',
    dictionaryPlant: {
      id: 4,
      name: '백엔드4',
    },
    imageUrl: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062',
    birthDate: '2023-06-06',
    daySince: 9999,

    waterCycle: 22,
    lastWaterDate: getToday(),
    dDay: -22,
    nextWaterDate: '2023-07-17',

    location: OPTIONS.location[3],
    flowerpot: OPTIONS.flowerPot[3],
    light: OPTIONS.light[3],
    wind: OPTIONS.wind[3],
  },
];

export default PET_PLANTS_DATA;

import { NewPetPlantRequest, PetPlantDetails } from '../../types/api/petPlant';
import PET_PLANTS_DATA from '../data/petPlants';

const KEY = 'MSW_PET_PLANTS';

const makeNextWaterDate = (date: string, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);

  return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDay()}`;
};

const getAll = (): PetPlantDetails[] => {
  const storageData = sessionStorage.getItem(KEY);

  if (!storageData) {
    sessionStorage.setItem(KEY, JSON.stringify(PET_PLANTS_DATA));
    return PET_PLANTS_DATA;
  }

  return JSON.parse(storageData);
};

const add = ({ dictionaryPlantId, ...rest }: NewPetPlantRequest) => {
  const newPlantDetails: PetPlantDetails = {
    id: getAll.length + 1,
    imageUrl: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2',
    daySince: 0,
    nextWaterDate: makeNextWaterDate(rest.lastWaterDate, rest.waterCycle),
    dday: -rest.waterCycle,
    dictionaryPlant: {
      id: dictionaryPlantId,
      name: '피움',
    },
    ...rest,
  };

  const newData = [...getAll(), newPlantDetails];
  sessionStorage.setItem(KEY, JSON.stringify(newData));
};

const find = (petPlantId: PetPlantDetails['id']) => {
  const list = getAll();

  const samePlantIndex = list.findIndex(({ id }) => id === petPlantId);
  if (samePlantIndex === -1) throw new Error('반려 식물로 등록되지 않은 식물이에요.');

  return { index: samePlantIndex, data: list[samePlantIndex] };
};

const mutate = (newPlantDetails: PetPlantDetails) => {
  const list = getAll();
  const { index } = find(newPlantDetails.id);

  list[index] = newPlantDetails;
  sessionStorage.setItem(KEY, JSON.stringify(list));
};

const giveWater = (petPlantId: PetPlantDetails['id'], lastWaterDate: string) => {
  const list = getAll();
  const { index, data } = find(petPlantId);

  data.nextWaterDate = makeNextWaterDate(lastWaterDate, data.waterCycle);
  list[index] = data;
  sessionStorage.setItem(KEY, JSON.stringify(list));
};

const PetPlant = { getAll, add, find, mutate, giveWater };

export default PetPlant;

import type { NewPetPlantRequest } from 'types/api/petPlant';
import { rest } from 'msw';
import { BASE_URL } from 'constants/index';
import DICTIONARY_PLANT_DATA from './data/dictionaryPlant';
import SEARCH_DATA from './data/search';
import PetPlant from './storage/PetPlant';

const validateParams = (delay: number, failRate: number) => {
  if (failRate < 0 || failRate > 1) {
    throw new Error('failRate must be between 0 and 1.');
  }

  if (delay < 0) {
    throw new Error('delay must be non-negative number.');
  }
};

const DICT = `${BASE_URL}/dictionary-plants`;
const PET = `${BASE_URL}/pet-plants`;

export const makeHandler = (delay = 0, failRate = 0) => {
  validateParams(delay, failRate);

  return [
    rest.get(DICT, (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const target = req.url.searchParams.get('name') ?? '';
      const searchResult = SEARCH_DATA.filter(({ name }) => name.includes(target));

      return res(ctx.delay(delay), ctx.status(200), ctx.json({ data: searchResult }));
    }),

    rest.get(`${DICT}/:id`, (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const { id } = req.params;
      const data = { ...DICTIONARY_PLANT_DATA, id: Number(id) };

      return res(ctx.delay(delay), ctx.status(200), ctx.json(data));
    }),

    rest.post<NewPetPlantRequest>(PET, async (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const newPlant = await req.json();

      PetPlant.add(newPlant);
      // todo: 등록된 식물의 내 식물 목록 id도 돌려주기
      return res(ctx.delay(delay), ctx.status(201));
    }),

    rest.get(`${PET}/:petPlantId`, async (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const { petPlantId } = req.params;
      try {
        const { data } = PetPlant.find(Number(petPlantId));
        return res(ctx.delay(delay), ctx.status(200), ctx.json(data));
      } catch {
        return res(ctx.delay(delay), ctx.status(404));
      }
    }),
  ];
};

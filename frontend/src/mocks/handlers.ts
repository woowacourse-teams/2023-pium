import type { NewPetPlantRequest } from 'types/api/petPlant';
import { rest } from 'msw';
import DICTIONARY_PLANT_DATA from './data/dictionaryPlant';
import REMINDER_DATA from './data/reminder';
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

const DICT = '*/dictionary-plants';
const PET = '*/pet-plants';
const REMINDER = '*/reminder';

export const makeHandler = (delay = 0, failRate = 0) => {
  validateParams(delay, failRate);

  return [
    // 사전 식물 리스트 조회
    rest.get(DICT, (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const target = req.url.searchParams.get('name') ?? '';
      const searchResult = SEARCH_DATA.filter(({ name }) => name.includes(target));

      return res(ctx.delay(delay), ctx.status(200), ctx.json({ data: searchResult }));
    }),

    // 단일 사전 식물 정보 조회
    rest.get(`${DICT}/:id`, (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const { id } = req.params;
      const data = { ...DICTIONARY_PLANT_DATA, id: Number(id) };

      return res(ctx.delay(delay), ctx.status(200), ctx.json(data));
    }),

    // 반려 식물 등록
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
    //리마인더 조회
    rest.get(REMINDER, (req, res, ctx) => {
      console.log(res);
      return res(ctx.delay(delay), ctx.status(200), ctx.json(REMINDER_DATA));
    }),
  ];
};

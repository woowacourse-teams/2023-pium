import type { EditPetPlantRequest, NewPetPlantRequest } from 'types/api/petPlant';
import { rest } from 'msw';
import DICTIONARY_PLANT_DATA from './data/dictionaryPlant';
import PET_LIST from './data/petPlantCardList';
import REMINDER_DATA from './data/reminder';
import SEARCH_DATA from './data/search';
import PetPlant from './storage/PetPlant';
import Reminder from './storage/Reminder';

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
const REMINDER = '*/reminders';
const HISTORY = '*/history';

sessionStorage.setItem('MSW_REMINDER', JSON.stringify(REMINDER_DATA));

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

    rest.get(PET, (_, res, ctx) =>
      res(ctx.delay(delay), ctx.status(200), ctx.json({ data: PET_LIST }))
    ),

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

    rest.patch<EditPetPlantRequest>(`${PET}/:petPlantId`, async (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      return res(ctx.delay(delay), ctx.status(200));
    }),

    //리마인더 조회
    rest.get(REMINDER, (req, res, ctx) => {
      const { data } = Reminder.getAll();

      data.sort((a, b) => {
        if (a.nextWaterDate < b.nextWaterDate) return -1;
        if (a.nextWaterDate > b.nextWaterDate) return 1;

        return 0;
      });
      return res(ctx.delay(delay), ctx.status(200), ctx.json({ data }));
    }),

    rest.post(`${REMINDER}/:petPlantId`, async (req, res, ctx) => {
      const { petPlantId } = req.params;
      const { waterDate } = await req.json();

      Reminder.water(Number(petPlantId), waterDate);

      return res(ctx.delay(delay), ctx.status(204));
    }),

    rest.patch(`${REMINDER}/:petPlantId`, async (req, res, ctx) => {
      const { petPlantId } = req.params;
      const { nextWaterDate } = await req.json();
      Reminder.changeDate(Number(petPlantId), nextWaterDate);

      return res(ctx.delay(delay), ctx.status(204));
    }),

    rest.get(`${HISTORY}/:petPlantId`, (req, res, ctx) => {
      const pageParam = Number(req.url.searchParams.get('page') ?? 0);
      const waterDateList = [
        `2023-0${12 - pageParam}-30`,
        `2023-0${12 - pageParam}-27`,
        `2023-0${12 - pageParam}-24`,
        `2023-0${12 - pageParam}-21`,
        `2023-0${12 - pageParam}-18`,
        `2023-0${12 - pageParam}-15`,
        `2023-0${12 - pageParam}-12`,
        `2023-0${12 - pageParam}-09`,
        `2023-0${12 - pageParam}-06`,
        `2023-0${12 - pageParam}-03`,
        `2023-0${12 - pageParam}-01`,
      ];

      const hasNext = pageParam < 6;

      const page = {
        page: pageParam,
        size: 20,
        elementSize: 100,
        hasNext,
        waterDateList: hasNext ? waterDateList : '1999-12-16',
      };

      return res(ctx.delay(delay), ctx.status(200), ctx.json(page));
    }),
  ];
};

import type { GardenRegisterForm } from 'types/garden';
import { rest } from 'msw';
import { generateGardenPageData } from '../data/garden';

const GARDEN_PATH = '*/garden';

const gardenHandlers = [
  rest.get(GARDEN_PATH, (req, res, ctx) => {
    const pageParam = req.url.searchParams.get('page');
    const page = pageParam ? Number(pageParam) : 0;

    const dictionaryPlantIdParam = req.url.searchParams.get('dictionaryPlantId');
    const dictionaryPlantId = dictionaryPlantIdParam ? Number(dictionaryPlantIdParam) : null;

    const hasNext = page < 6;
    const data = generateGardenPageData(dictionaryPlantId, page, hasNext);
    const response = {
      page,
      size: data.length,
      elementSize: 100,
      hasNext,
      data,
    };

    return res(ctx.delay(0), ctx.status(200), ctx.json(response));
  }),

  rest.post<GardenRegisterForm>(GARDEN_PATH, (req, res, ctx) => {
    const { JSESSION } = req.cookies;

    if (JSESSION === undefined) {
      return res(ctx.delay(200), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
    }

    return res(ctx.delay(200), ctx.status(201));
  }),
];

export default gardenHandlers;

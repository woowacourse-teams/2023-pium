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
];

export default gardenHandlers;

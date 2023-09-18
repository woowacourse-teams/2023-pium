import { rest } from 'msw';
import { generatePage } from '../data/history';

const HISTORY = '*/history';

const historyHandlers = [
  rest.get(`${HISTORY}`, (req, res, ctx) => {
    const { JSESSION } = req.cookies;

    if (JSESSION === undefined) {
      return res(ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
    }

    const pageParam = Number(req.url.searchParams.get('page') ?? 0);
    const filterParam = req.url.searchParams.get('filter');
    const filter = filterParam
      ? filterParam.split(',')
      : ['lastWaterDate', 'waterCycle', 'location', 'wind', 'flowerpot', 'light'];

    const hasNext = pageParam < 6;
    const page = {
      page: pageParam,
      size: 20,
      elementSize: 100,
      hasNext,
      data: generatePage(pageParam, filter, hasNext),
    };

    return res(ctx.delay(100), ctx.status(200), ctx.json(page));
  }),
];

export default historyHandlers;

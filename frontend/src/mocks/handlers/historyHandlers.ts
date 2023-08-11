import { rest } from 'msw';
import { generatePage, lastPage } from '../data/history';

const HISTORY = '*/history';

const historyHandlers = [
  rest.get(`${HISTORY}`, (req, res, ctx) => {
    const pageParam = Number(req.url.searchParams.get('page') ?? 0);
    const hasNext = pageParam < 6;
    const page = {
      page: pageParam,
      size: 20,
      elementSize: 100,
      hasNext,
      data: hasNext ? generatePage(pageParam) : lastPage,
    };

    return res(ctx.delay(100), ctx.status(200), ctx.json(page));
  }),
];

export default historyHandlers;

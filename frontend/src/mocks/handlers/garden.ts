import type { GardenRegisterForm } from 'types/garden';
import { rest } from 'msw';

const GARDEN = '*/garden';

const gardenHandlers = [
  rest.post<GardenRegisterForm>(`${GARDEN}/register/:id`, async (req, res, ctx) => {
    const { JSESSION } = req.cookies;

    if (JSESSION === undefined) {
      return res(ctx.delay(200), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
    }

    return res(ctx.delay(200), ctx.status(201));
  }),
];

export default gardenHandlers;

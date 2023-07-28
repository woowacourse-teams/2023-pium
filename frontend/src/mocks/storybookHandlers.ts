import type { NewPetPlantRequest } from 'types/api/petPlant';
import { rest } from 'msw';
import { BASE_URL } from 'constants/index';
import DICTIONARY_PLANT_DATA from './data/dictionaryPlant';
import SEARCH_DATA from './data/search';

export const storybookHandlers = [
  rest.get('*/dictionary-plants', (req, res, ctx) => {
    const target = req.url.searchParams.get('name') ?? '';
    const searchResult = SEARCH_DATA.filter(({ name }) => name.includes(target));

    return res(ctx.status(200), ctx.json({ data: searchResult }));
  }),

  rest.get('*/dictionary-plants/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DICTIONARY_PLANT_DATA));
  }),

  rest.post<NewPetPlantRequest>(`${BASE_URL}/pet-plants`, async (req, res, ctx) =>
    res(ctx.status(201))
  ),
];

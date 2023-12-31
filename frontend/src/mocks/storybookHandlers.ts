import type { EditPetPlantRequest, NewPetPlantRequest } from 'types/petPlant';
import { rest } from 'msw';
import DICTIONARY_PLANT_DATA from './data/dictionaryPlant';
import PET_PLANTS_DATA from './data/petPlants';
import SEARCH_DATA from './data/search';
import PetPlant from './storage/PetPlant';

export const storybookHandlers = [
  rest.get('*/dictionary-plants', (req, res, ctx) => {
    const target = req.url.searchParams.get('name') ?? '';
    const searchResult = SEARCH_DATA.filter(({ name }) => name.includes(target));

    return res(ctx.status(200), ctx.json({ data: searchResult }));
  }),

  rest.get('*/dictionary-plants/:id', (req, res, ctx) => {
    const { id } = req.params;
    const data = { ...DICTIONARY_PLANT_DATA[(Number(id) + 1) % 2], id: Number(id) };
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post<NewPetPlantRequest>('*/pet-plants', (req, res, ctx) => res(ctx.status(201))),

  rest.get('*/pet-plants/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const petPlantId = Number(id) % PET_PLANTS_DATA.length;
    const { data } = PetPlant.find(petPlantId % 4 === 0 ? 4 : petPlantId);
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.patch<EditPetPlantRequest>(`*/pet-plants/:id`, (req, res, ctx) => res(ctx.status(200))),

  rest.post(`*/garden/register/:id`, (req, res, ctx) => res(ctx.delay(200), ctx.status(201))),
];

import type { NewPetPlantRequest } from 'types/api/petPlant';
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
    return res(ctx.status(200), ctx.json(DICTIONARY_PLANT_DATA));
  }),

  rest.post<NewPetPlantRequest>('*/pet-plants', async (req, res, ctx) => res(ctx.status(201))),

  rest.get('*/pet-plants/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const petPlantId = Number(id) % PET_PLANTS_DATA.length;
    const { data } = PetPlant.find(petPlantId % 4 === 0 ? 4 : petPlantId);
    return res(ctx.status(200), ctx.json(data));
  }),
];

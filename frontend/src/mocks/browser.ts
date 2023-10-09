import { setupWorker } from 'msw';
import { makeHandler } from './handlers';
import dictionaryPlantRegistrationHandlers from './handlers/dictionaryPlantRegistration';
import gardenHandlers from './handlers/gardenHandlers';
import historyHandlers from './handlers/historyHandlers';

export const worker = setupWorker(
  ...makeHandler(200, 0),
  ...historyHandlers,
  ...dictionaryPlantRegistrationHandlers,
  ...gardenHandlers
);

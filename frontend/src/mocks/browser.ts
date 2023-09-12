import { setupWorker } from 'msw';
import { makeHandler } from './handlers';
import dictionaryPlantRegistrationHandlers from './handlers/dictionaryPlantRegistration';
import historyHandlers from './handlers/historyHandlers';

export const worker = setupWorker(
  ...makeHandler(0, 0),
  ...historyHandlers,
  ...dictionaryPlantRegistrationHandlers
);

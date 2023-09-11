import { setupWorker } from 'msw';
import { makeHandler } from './handlers';
import dictionaryRegistrationHandlers from './handlers/dictionaryRegistration';
import historyHandlers from './handlers/historyHandlers';

export const worker = setupWorker(
  ...makeHandler(0, 0),
  ...historyHandlers,
  ...dictionaryRegistrationHandlers
);

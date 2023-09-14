import { setupWorker } from 'msw';
import { makeHandler } from './handlers';
import gardenHandlers from './handlers/garden';
import historyHandlers from './handlers/historyHandlers';

export const worker = setupWorker(...makeHandler(0, 0), ...historyHandlers, ...gardenHandlers);

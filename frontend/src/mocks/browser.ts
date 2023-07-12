import { setupWorker } from 'msw';
import { makeHandler } from './handlers';

export const worker = setupWorker(...makeHandler(0, 0));

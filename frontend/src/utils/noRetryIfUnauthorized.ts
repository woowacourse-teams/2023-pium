import type { QueryOptions } from '@tanstack/react-query';
import StatusError from 'models/statusError';
import { STATUS_CODE } from 'constants/index';

const noRetryIfUnauthorized: Exclude<
  QueryOptions<unknown, Error | StatusError>['retry'],
  undefined
> = (failureCount, error) => {
  if (error instanceof StatusError && error.statusCode === STATUS_CODE.unauthorize) {
    return false;
  }

  return failureCount < 3;
};

export default noRetryIfUnauthorized;

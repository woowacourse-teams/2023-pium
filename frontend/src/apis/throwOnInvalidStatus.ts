import { GUIDE, STATUS_CODE } from 'constants/index';
import StatusError from './statusError';

export const throwOnInvalidStatus = (response: Response) => {
  if (response.status === STATUS_CODE.unAuthorize) {
    throw new StatusError({
      statusCode: STATUS_CODE.unAuthorize,
      message: GUIDE.sessionExpire,
    });
  }

  if (response.status === STATUS_CODE.notFound) {
    throw new StatusError({
      statusCode: STATUS_CODE.notFound,
      message: '404 Not Found',
    });
  }

  if (response.status === STATUS_CODE.international) {
    throw new StatusError({
      statusCode: STATUS_CODE.international,
      message: 'International 500',
    });
  }
};

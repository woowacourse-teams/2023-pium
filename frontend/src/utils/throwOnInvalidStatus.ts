import StatusError from 'models/statusError';
import { GUIDE, STATUS_CODE } from 'constants/index';

const throwOnInvalidStatus = (response: Response) => {
  if (response.status === STATUS_CODE.unauthorize) {
    throw new StatusError({
      statusCode: STATUS_CODE.unauthorize,
      message: GUIDE.sessionExpire,
    });
  }

  if (response.status === STATUS_CODE.notFound) {
    throw new StatusError({
      statusCode: STATUS_CODE.notFound,
      message: '404 Not Found',
    });
  }

  if (response.status === STATUS_CODE.internalServerError) {
    throw new StatusError({
      statusCode: STATUS_CODE.internalServerError,
      message: 'internal Server Error 500',
    });
  }

  if (response.status >= 300) {
    throw new StatusError({
      statusCode: response.status,
      errorResponse: response,
    });
  }
};

export default throwOnInvalidStatus;

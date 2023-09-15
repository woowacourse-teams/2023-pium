import { rest } from 'msw';

const URL = '*/dictionary-registrations';

const dictionaryPlantRegistrationHandlers = [
  rest.post(URL, (req, res, ctx) => {
    // 이 버전의 msw에서는 multipart/form-data 처리 불가능
    return res(ctx.delay(100), ctx.status(201));
  }),
];

export default dictionaryPlantRegistrationHandlers;

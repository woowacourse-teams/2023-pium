import type { EditPetPlantRequest } from 'types/petPlant';
import { rest } from 'msw';
import DICTIONARY_PLANT_DATA from './data/dictionaryPlant';
import PET_LIST from './data/petPlantCardList';
import REMINDER_DATA from './data/reminder';
import SEARCH_DATA from './data/search';
import PetPlant from './storage/PetPlant';
import Reminder from './storage/Reminder';

const validateParams = (delay: number, failRate: number) => {
  if (failRate < 0 || failRate > 1) {
    throw new Error('failRate must be between 0 and 1.');
  }

  if (delay < 0) {
    throw new Error('delay must be non-negative number.');
  }
};

const DICT = '*/dictionary-plants';
const PET = '*/pet-plants';
const REMINDER = '*/reminders';

sessionStorage.setItem('MSW_REMINDER', JSON.stringify(REMINDER_DATA));

export const makeHandler = (delay = 0, failRate = 0) => {
  validateParams(delay, failRate);

  return [
    // 사전 식물 리스트 조회
    rest.get(DICT, (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const target = req.url.searchParams.get('name') ?? '';
      const searchResult = SEARCH_DATA.filter(({ name }) => name.includes(target));

      return res(ctx.delay(delay), ctx.status(200), ctx.json({ data: searchResult }));
    }),

    // 단일 사전 식물 정보 조회
    rest.get(`${DICT}/:id`, (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const { id } = req.params;
      const data = { ...DICTIONARY_PLANT_DATA[Number(id) % 2], id: Number(id) };

      return res(ctx.delay(delay), ctx.status(200), ctx.json(data));
    }),

    // 반려 식물 등록
    /**
     * TODO::
     * msw에서 formData를 지원하지 않아서 전송한 image데이터 확인을 하지 못합니다.
     * post로 던지는 formData에 기존 form의 데이터가 존재하는데, formData를 확인하지 못하기 때문에 받을 수 없습니다.
     */
    rest.post<FormData>(PET, async (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      // const formData = await req.text(); // 이거는 포기입니다...

      // const newPlant = await req.json();

      // PetPlant.add(newPlant);
      // todo: 등록된 식물의 내 식물 목록 id도 돌려주기
      return res(ctx.delay(delay), ctx.status(201));
    }),

    rest.get(PET, (req, res, ctx) => {
      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      return res(ctx.delay(delay), ctx.status(200), ctx.json({ data: PET_LIST }));
    }),

    rest.get(`${PET}/:petPlantId`, async (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      const { petPlantId } = req.params;
      try {
        const { data } = PetPlant.find(Number(petPlantId));
        return res(ctx.delay(delay), ctx.status(200), ctx.json(data));
      } catch {
        return res(ctx.delay(delay), ctx.status(404));
      }
    }),

    rest.patch<EditPetPlantRequest>(`${PET}/:petPlantId`, async (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      return res(ctx.delay(delay), ctx.status(200));
    }),

    rest.delete(`${PET}/:petPlantId`, async (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(500));
      }

      const { petPlantId } = req.params;
      PetPlant.remove(Number(petPlantId));

      return res(ctx.delay(delay), ctx.status(204));
    }),

    //리마인더 조회
    rest.get(REMINDER, (req, res, ctx) => {
      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      validateParams(delay, failRate);
      const { data } = Reminder.getAll();

      data.sort((a, b) => {
        if (a.nextWaterDate < b.nextWaterDate) return -1;
        if (a.nextWaterDate > b.nextWaterDate) return 1;

        return 0;
      });
      return res(ctx.delay(delay), ctx.status(200), ctx.json({ data }));
    }),

    rest.post(`${REMINDER}/:petPlantId`, async (req, res, ctx) => {
      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      const { petPlantId } = req.params;
      const { waterDate } = await req.json();

      Reminder.water(Number(petPlantId), waterDate);

      return res(ctx.delay(delay), ctx.status(204));
    }),

    rest.patch(`${REMINDER}/:petPlantId`, async (req, res, ctx) => {
      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      const { petPlantId } = req.params;
      const { nextWaterDate } = await req.json();
      Reminder.changeDate(Number(petPlantId), nextWaterDate);

      return res(ctx.delay(delay), ctx.status(204));
    }),

    rest.post('/login', async (req, res, ctx) => {
      const { code } = await req.json();

      if (code === null) {
        return res(
          ctx.delay(delay),
          ctx.status(401),
          ctx.json({ message: '유효하지 않은 code입니다' })
        );
      }

      const currentDate = new Date();

      const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;
      // 현재로부터 6시간 뒤에 만료되는 쿠키
      const expirationDate = new Date(currentDate.getTime() + sixHoursInMilliseconds);

      return res(ctx.cookie('JSESSION', `${code}`, { expires: expirationDate }), ctx.status(200));
    }),

    rest.post('/logout', (req, res, ctx) => {
      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      // 로그이웃 실행 시에 지금 당장 만료되는 쿠키 설정
      localStorage.removeItem('MSW_COOKIE_STORE');
      return res(
        ctx.delay(delay),
        ctx.status(200),
        ctx.cookie('JSESSION', '', { expires: new Date() })
      );
    }),

    rest.delete('/members/withdraw', (req, res, ctx) => {
      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      // 회원 탈퇴 시에 쿠키 바로 만료
      return res(
        ctx.delay(delay),
        ctx.status(204),
        ctx.cookie('JSESSION', '', { expires: new Date() })
      );
    }),

    rest.get('/members/me', (req, res, ctx) => {
      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }
      // 쿠키 갱신
      return res(ctx.delay(delay), ctx.cookie('JSESSION', JSESSION));
    }),

    rest.get('/members/notification', (req, res, ctx) => {
      const { JSESSION } = req.cookies;

      if (JSESSION === undefined) {
        return res(ctx.delay(delay), ctx.status(401), ctx.json({ message: '만료된 세션입니다.' }));
      }

      const token = JSON.parse(sessionStorage.getItem('FCM_TOKEN') ?? 'false');
      let isSubscribe = false;
      if (token) isSubscribe = true;

      return res(ctx.delay(delay), ctx.json({ isSubscribe }));
    }),

    rest.post('/members/notification', async (req, res, ctx) => {
      const { token } = await req.json();

      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(407));
      }

      sessionStorage.setItem('FCM_TOKEN', JSON.stringify(token));

      return res(ctx.delay(delay), ctx.status(204));
    }),

    rest.delete('/members/notification', (req, res, ctx) => {
      if (Math.random() < failRate) {
        return res(ctx.delay(delay), ctx.status(407));
      }

      sessionStorage.removeItem('FCM_TOKEN');

      return res(ctx.delay(delay), ctx.status(204));
    }),
  ];
};

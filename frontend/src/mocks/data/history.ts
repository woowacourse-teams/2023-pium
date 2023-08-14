import { NO_PREVIOUS_VALUE } from 'constants/index';

export const generatePage = (pageParam: number, filter: string[], hasNext: boolean) => {
  const page = hasNext
    ? [
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-29`,
          content: {
            previous: `2023-0${9 - pageParam}-27`,
            current: `2023-0${9 - pageParam}-29`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-27`,
          content: {
            previous: `2023-0${9 - pageParam}-25`,
            current: `2023-0${9 - pageParam}-27`,
          },
        },
        {
          type: 'waterCycle',
          date: `2023-0${9 - pageParam}-27`,
          content: {
            previous: '1',
            current: '2',
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-27`,
          content: {
            previous: `2023-0${9 - pageParam}-26`,
            current: `2023-0${9 - pageParam}-27`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-26`,
          content: {
            previous: `2023-0${9 - pageParam}-25`,
            current: `2023-0${9 - pageParam}-26`,
          },
        },
        {
          type: 'waterCycle',
          date: `2023-0${9 - pageParam}-25`,
          content: {
            previous: '2',
            current: '1',
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-23`,
          content: {
            previous: `2023-0${9 - pageParam}-21`,
            current: `2023-0${9 - pageParam}-23`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-21`,
          content: {
            previous: `2023-0${9 - pageParam}-19`,
            current: `2023-0${9 - pageParam}-21`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-19`,
          content: {
            previous: `2023-0${9 - pageParam}-17`,
            current: `2023-0${9 - pageParam}-19`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-17`,
          content: {
            previous: `2023-0${9 - pageParam}-15`,
            current: `2023-0${9 - pageParam}-17`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-15`,
          content: {
            previous: `2023-0${9 - pageParam}-13`,
            current: `2023-0${9 - pageParam}-15`,
          },
        },
        {
          type: 'light',
          date: `2023-0${9 - pageParam}-15`,
          content: {
            previous: '식물용 조명 빛을 받아요',
            current: '창문 안쪽에서 해를 받아요',
          },
        },
        {
          type: 'waterCycle',
          date: `2023-0${9 - pageParam}-15`,
          content: {
            previous: '1',
            current: '2',
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-14`,
          content: {
            previous: `2023-0${9 - pageParam}-13`,
            current: `2023-0${9 - pageParam}-14`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-13`,
          content: {
            previous: `2023-0${9 - pageParam}-12`,
            current: `2023-0${9 - pageParam}-13`,
          },
        },
        {
          type: 'waterCycle',
          date: `2023-0${9 - pageParam}-12`,
          content: {
            previous: '2',
            current: '1',
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-12`,
          content: {
            previous: `2023-0${9 - pageParam}-10`,
            current: `2023-0${9 - pageParam}-12`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-10`,
          content: {
            previous: `2023-0${9 - pageParam}-08`,
            current: `2023-0${9 - pageParam}-10`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-08`,
          content: {
            previous: `2023-0${9 - pageParam}-06`,
            current: `2023-0${9 - pageParam}-08`,
          },
        },
        {
          type: 'lastWaterDate',
          date: `2023-0${9 - pageParam}-06`,
          content: {
            previous: `2023-0${9 - pageParam}-04`,
            current: `2023-0${9 - pageParam}-06`,
          },
        },
      ]
    : [
        {
          type: 'lastWaterDate',
          date: '2022-12-22',
          content: {
            previous: '2022-12-19',
            current: '2022-12-22',
          },
        },
        {
          type: 'lastWaterDate',
          date: '2022-12-19',
          content: {
            previous: '2022-12-16',
            current: '2022-12-19',
          },
        },
        {
          type: 'waterCycle',
          date: '2022-12-16',
          content: {
            previous: NO_PREVIOUS_VALUE,
            current: '3',
          },
        },
        {
          type: 'lastWaterDate',
          date: '2022-12-16',
          content: {
            previous: NO_PREVIOUS_VALUE,
            current: '2022-12-16',
          },
        },
        {
          type: 'flowerpot',
          date: '2022-12-16',
          content: {
            previous: NO_PREVIOUS_VALUE,
            current: '플라스틱/유리/캔',
          },
        },
        {
          type: 'light',
          date: '2022-12-16',
          content: {
            previous: NO_PREVIOUS_VALUE,
            current: '식물용 조명 빛을 받아요',
          },
        },
        {
          type: 'location',
          date: '2022-12-16',
          content: {
            previous: NO_PREVIOUS_VALUE,
            current: '주방',
          },
        },
        {
          type: 'wind',
          date: '2022-12-16',
          content: {
            previous: NO_PREVIOUS_VALUE,
            current: '5m 내 창문이 있어요',
          },
        },
      ];

  return page.filter(({ type }) => filter.includes(type));
};

import { OPTIONS } from 'constants/index';

const DICTIONARY_PLANT_MAP: Record<number, string> = {
  1: '아',
  2: '아카',
  3: '아카시',
  4: '아카시아',
  5: '참새',
};

export const generateGardenPageData = (
  filter: number | null,
  pageParam: number,
  hasNext: boolean
) => {
  const page = hasNext
    ? [
        {
          id: pageParam * 100 + 1,
          createdAt: '1999-12-18',
          updatedAt: '1999-12-18',
          dictionaryPlantName: '아',
          content: '이거 이렇게 키워보아요',
          manageLevel: '초보자',
          petPlant: {
            imageUrl: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
            nickname: '루피',
            location: OPTIONS.location[0],
            flowerpot: OPTIONS.flowerPot[0],
            light: OPTIONS.light[0],
            wind: OPTIONS.wind[0],
            daySince: 95,
            waterCycle: 1,
          },
        },
        {
          id: pageParam * 100 + 2,
          createdAt: '1999-12-17',
          updatedAt: '1999-12-17',
          dictionaryPlantName: '아카',
          content: '이거 이렇게 키워보아요',
          manageLevel: '전문가',
          petPlant: {
            imageUrl: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
            nickname: '쵸파',
            location: OPTIONS.location[0],
            flowerpot: OPTIONS.flowerPot[0],
            light: OPTIONS.light[0],
            wind: OPTIONS.wind[0],
            daySince: 10,
            waterCycle: 7,
          },
        },
        {
          id: pageParam * 100 + 3,
          createdAt: '1999-12-16',
          updatedAt: '1999-12-16',
          dictionaryPlantName: '아카시',
          content: '이거 이렇게 키워보아요',
          manageLevel: '초보자',
          petPlant: {
            imageUrl: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
            nickname: '토마토1호',
            location: OPTIONS.location[0],
            flowerpot: OPTIONS.flowerPot[0],
            light: OPTIONS.light[0],
            wind: OPTIONS.wind[0],
            daySince: 49,
            waterCycle: 7,
          },
        },
        {
          id: pageParam * 100 + 4,
          createdAt: '1999-12-15',
          updatedAt: '1999-12-15',
          dictionaryPlantName: '아카시아',
          content: `
            제가 LA에 있을때는 말이죠 정말 제가 꿈에 무대인 메이저리그로 진출해서 가는 식당마다 싸인해달라 기자들은 항상 붙어다니며 취재하고 제가 그 머~ 어~ 대통령이 된 기분이였어요 
            그런데 17일만에 17일만에 마이너리그로 떨어졌어요 못던져서 그만두고 그냥 확 한국으로 가버리고 싶었어요 
            그래서 집에 가는길에 그 맥주6개 달린거 있잖아요 맥주6개 그걸 사가지고 집으로 갔어요 그전에는 술먹으면 야구 못하는줄 알았어요 그냥 한국으로 가버릴려구.... 
            그리고 맥주 6개먹고 확 죽어버릴려고 그랬어요 야구 못하게 되니깐 그러나 집에가서 일단은 부모님에게 전화를 해야겠다고 생각을 했어요
          `,
          manageLevel: '초보자',
          petPlant: {
            imageUrl: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
            nickname: '뉴기니아봉선화',
            location: OPTIONS.location[0],
            flowerpot: OPTIONS.flowerPot[0],
            light: OPTIONS.light[0],
            wind: OPTIONS.wind[0],
            daySince: 40,
            waterCycle: 7,
          },
        },
        {
          id: pageParam * 100 + 5,
          createdAt: '1999-12-14',
          updatedAt: '1999-12-14',
          dictionaryPlantName: '참새',
          content: '이거 이렇게 키워보아요',
          manageLevel: '초보자',
          petPlant: {
            imageUrl: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
            nickname: '상디',
            location: OPTIONS.location[0],
            flowerpot: OPTIONS.flowerPot[0],
            light: OPTIONS.light[0],
            wind: OPTIONS.wind[0],
            daySince: 30,
            waterCycle: 7,
          },
        },
      ]
    : [
        {
          id: 100,
          createdAt: '1999-12-11',
          updatedAt: '1999-12-11',
          dictionaryPlantName: '아카시아',
          content: '이거 이렇게 키워보아요',
          manageLevel: '초보자',
          petPlant: {
            imageUrl: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
            nickname: '브룩',
            location: OPTIONS.location[0],
            flowerpot: OPTIONS.flowerPot[0],
            light: OPTIONS.light[0],
            wind: OPTIONS.wind[0],
            daySince: 95,
            waterCycle: 7,
          },
        },
      ];

  if (filter) {
    return page.filter(
      ({ dictionaryPlantName }) => DICTIONARY_PLANT_MAP[filter] === dictionaryPlantName
    );
  }

  return page;
};

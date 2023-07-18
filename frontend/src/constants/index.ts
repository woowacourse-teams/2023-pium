export const MESSAGE = Object.freeze({
  noSearchResult: '아직 사전에 등록된 식물이 없어요 😅',
});

export const ERROR = Object.freeze({
  radioContext: '컴포넌트가 RadioProvider의 자손이 아닙니다!',
  stackContext: '컴포넌트가 StackProvider의 자손이 아닙니다!',
});

export const GUIDE = Object.freeze({
  search: '피움에 등록된 식물을 검색해 보세요!',
});

export const API_PATH = Object.freeze({
  SEARCH: '/search',
  DICT: (plantId?: string) => `/dictionary-plants/${plantId ?? ':id'}`,
  PET_LIST: '/pet-plants',
  PET_DETAIL: (plantId?: string) => `/pet-plants/${plantId ?? ':id'}`,
});

export const URL_PATH = Object.freeze({
  MAIN: '/',
  DICT: (plantId?: string) => `/dict/${plantId ?? ':id'}`,
  PET_LIST: '/pet',
  PET_DETAIL: (plantId?: string) => `/pet/${plantId ?? ':id'}`,
});

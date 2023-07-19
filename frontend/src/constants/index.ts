export const MESSAGE = {
  noSearchResult: '아직 사전에 등록된 식물이 없어요 😅',
} as const;

export const ERROR = {
  radioContext: '컴포넌트가 RadioProvider의 자손이 아닙니다!',
} as const;

export const GUIDE = {
  search: '피움에 등록된 식물을 검색해 보세요!',
} as const;

export const API_PATH = {
  SEARCH: '/search',
  DICT: `/dictionary-plants/:id`,
  PET: '/pet-plants',
  PET_DETAIL: `/pet-plants/:id`,
} as const;

export const URL_PATH = {
  MAIN: '/',
  DICT: `/dict/:id`,
  PET_LIST: '/pet',
  PET_DETAIL: `/pet/:id`,
} as const;

import { ManageLevel, Season, SeasonKor } from 'types/plants';
import { TagVariantType } from 'components/Tag';

export const BASE_URL = 'http://api.pium.life';

export const MESSAGE = {
  noSearchResult: '아직 사전에 등록된 식물이 없어요 😅',
} as const;

export const ERROR = {
  radioContext: '컴포넌트가 RadioProvider의 자손이 아닙니다!',
  stackContext: '컴포넌트가 StackProvider의 자손이 아닙니다!',
} as const;

export const GUIDE = {
  search: '피움에 등록된 식물을 검색해 보세요!',
} as const;

export const URL_PATH = {
  MAIN: '/',
  DICT: `/dict/:id`,
  PET_LIST: '/pet',
  PET_DETAIL: `/pet/:id`,
  PET_REGISTER_SEARCH: '/pet/register',
  PET_REGISTER_FORM: '/pet/register/:id',
} as const;

export const SEASONS: Record<Season, SeasonKor> = {
  spring: '봄',
  summer: '여름',
  autumn: '가을',
  winter: '겨울',
} as const;

export const MANAGE_LEVEL_COLOR: Record<ManageLevel, TagVariantType> = {
  초보자: 'default',
  경험자: 'primary',
  전문가: 'accent',
} as const;

export const NUMBER = {
  MAX_CYCLE_DATE: 365,
  MIN_CYCLE_DATE: 1,
} as const;

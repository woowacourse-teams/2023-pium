import { Season, SeasonKor } from 'types/plants';

export const seasonConverter = (season: Season): SeasonKor => {
  switch (season) {
    case 'spring': {
      return '봄';
    }
    case 'summer': {
      return '여름';
    }
    case 'autumn': {
      return '가을';
    }
    case 'winter': {
      return '겨울';
    }
  }
};

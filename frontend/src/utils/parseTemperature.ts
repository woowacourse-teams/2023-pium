/**
 * 공공데이터 API에 들어있는 겨울철 최저온도 문자열을 파싱합니다.
 * @param tempString '13도', '13도 이상', '0도 이하' 등의 문자열
 * @returns `type`: 이상 | 이하, `temperature`: 나머지 문자열
 */
const parseTemperature = (tempString: string): { temperature: string; type: '이상' | '이하' } => {
  const hasLowEqualText = tempString.includes('이하');

  const temperature = tempString.replace('이상', '').replace('이하', '').trim();
  const type = hasLowEqualText ? '이하' : '이상';

  return { temperature, type };
};

export default parseTemperature;

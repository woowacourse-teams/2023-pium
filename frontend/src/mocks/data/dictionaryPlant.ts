const DICTIONARY_PLANT_DATA = {
  id: 1,
  name: '스킨답서스',
  image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
  familyName: '천남성과',
  smell: '거의 없음',
  poison: '',
  manageLevel: '초보자',
  growSpeed: '보통',
  requireTemp: '21~25도',
  minimumTemp: '13도 이상',
  requireHumidity: '40~70%',
  postingPlace: ['실내 어두운 곳', '거실 내측', '거실 창측', '발코니 내측', '발코니 창측'],
  specialManageInfo: 'API에서는 poison과 manageLevel, specialManageInfo를 빈 문자열로 주나요?',
  waterCycle: {
    spring: '토양 표면이 말랐을때 충분히 관수함',
    summer: '토양 표면이 말랐을때 충분히 관수함',
    autumn: '토양 표면이 말랐을때 충분히 관수함',
    winter: '화분 흙 대부분 말랐을때 충분히 관수함',
  },
};

export default DICTIONARY_PLANT_DATA;

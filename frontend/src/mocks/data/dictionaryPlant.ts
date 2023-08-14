const DICTIONARY_PLANT_DATA = [
  {
    id: 1,
    name: '스킨답서스',
    image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
    familyName: '천남성과',
    smell: '거의 없음',
    poison: '많음',
    manageLevel: '경험자',
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
  },
  {
    id: 2,
    name: '투명 피우미',
    image: 'https://images.unsplash.com/photo-1617677916288-7a5c8e88a285',
    familyName: '캠릿브지 대학의 연결구과',
    smell: '정보없음',
    poison: '정보없음',
    manageLevel: '정보없음',
    growSpeed: '정보없음',
    requireTemp: '정보없음',
    minimumTemp: '정보없음',
    requireHumidity: '정보없음',
    postingPlace: ['정보없음'],
    specialManageInfo:
      '때로 내가 불빛으로 너울너울 흔들릴 때 그것이 감출 수 없는 내 뼈의 노래요 살의 몸부림인 줄을\n그대는 아시는가요 하나의 별로 빛나기 위해 얼마나 오랜 시간 밤의 사막을 달려와야 했는지\r\n비 그친 하늘처럼 눈부시게 그대 속의 어둠을 닦아낼 수만 있다면\n\n\n\n\n내가 한나절 들꽃처럼 세월 속에 어린 등불 하나 잠시 비추다 갈지라도\r\n\r\n\r\n\r\n그것이 내 목숨의 향기인 줄을 그대는 아실른지요',
    waterCycle: {
      spring: '토양 표면이 말랐을때 충분히 관수함',
      summer: '토양 표면이 말랐을때 충분히 관수함',
      autumn: '토양 표면이 말랐을때 충분히 관수함',
      winter: '화분 흙 대부분 말랐을때 충분히 관수함',
    },
  },
];

export default DICTIONARY_PLANT_DATA;

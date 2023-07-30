import {
  ChangeDateProps,
  ReminderExtendType,
  TodayStatus,
  WaterPlantProps,
} from 'types/api/reminder';
import { ReminderContext } from 'contexts/reminderContext';
import { useContext } from 'react';
import Image from 'components/@common/Image';
import DateInput from 'components/DateInput';
import {
  ActionBox,
  ContentBox,
  StatusBar,
  Wrapper,
  Alert,
  NickName,
  DictionaryPlantName,
} from './Card.style';
import { getParticularDateFromSpecificDay, getToday } from 'utils/date';

interface ReminderCardProps {
  data: ReminderExtendType;
}

const SUB_FIX = {
  today: '오늘이에요!',
  late: '일 지났어요🥺',
  future: '일 남았습니다!',
};

const convertSubFix = (status: TodayStatus) => SUB_FIX[status];

const ReminderCard = ({ data }: ReminderCardProps) => {
  const { petPlantId, status, image, nickName, dictionaryPlantName, dDay, lastWaterDate } = data;
  const context = useContext(ReminderContext);
  const today = getToday();

  const changeDateHandler = (changeDate: string) => {
    //  changeDate에 대한 검증 실시. 변환하는 날이 오늘 다음날 보다 적다면 return
    if (changeDate < getParticularDateFromSpecificDay(1, new Date())) return;

    const variables: ChangeDateProps = {
      id: petPlantId,
      body: {
        nextWaterDate: changeDate,
      },
    };

    context?.changeDateCallback(variables);
  };

  const waterHandler = (waterDate: string) => {
    // 물을 준 날이 이전에 줬던 날보다 이전이거나, 오늘 이후라면 return;
    if (waterDate < lastWaterDate || waterDate > today) return;

    const variables: WaterPlantProps = {
      id: petPlantId,
      body: {
        waterDate,
      },
    };

    context?.waterCallback(variables);
  };
  return (
    <Wrapper>
      <StatusBar status={status} />
      <Image src={image} size="64px" type="circle" alt={`${nickName} 이미지`} />
      <ContentBox>
        <NickName>{nickName}</NickName>
        <DictionaryPlantName>{dictionaryPlantName}</DictionaryPlantName>
        <Alert status={status}>
          {status === 'today' ? convertSubFix(status) : `${Math.abs(dDay)}${convertSubFix(status)}`}
        </Alert>
      </ContentBox>
      <ActionBox>
        <DateInput
          value=""
          changeCallback={waterHandler}
          placeholder="물주기"
          min={lastWaterDate}
          max={today}
          aria-label="물 준 날짜 선택"
        />
        <DateInput
          value=""
          changeCallback={changeDateHandler}
          placeholder={status === 'future' ? '날짜 선택' : '미루기'}
          min={today}
          aria-label="알림을 줄 날짜 선택"
        />
      </ActionBox>
    </Wrapper>
  );
};

export default ReminderCard;

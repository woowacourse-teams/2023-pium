import { PushOffProps, ReminderExtendType, TodayStatus, WaterPlantProps } from 'types/api/reminder';
import { ReminderContext } from 'contexts/reminderContext';
import { useContext } from 'react';
import DateInput from 'components/DateInput';
import Image from 'components/Image';
import {
  ActionBox,
  ContentBox,
  StatusBar,
  Wrapper,
  PutOff,
  Alert,
  NickName,
  DictionaryPlantName,
} from './Card.style';
import { getParticularDateFromSpecificDay, getToday } from 'utils/date';

interface ReminderCardProps {
  data: ReminderExtendType;
}

const convertSubFix = (status: TodayStatus) => {
  switch (status) {
    case 'exist':
      return '오늘이에요!';
    case 'late':
      return '일 지났어요🥺';
    case 'none':
      return '일 남았습니다!';
    default:
      return '';
  }
};

const ReminderCard = ({ data }: ReminderCardProps) => {
  const { petPlantId, status, image, nickName, dictionaryPlantName, dDay } = data;
  const context = useContext(ReminderContext);
  const today = getToday();

  const pushOffHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    const specificDay = data.nextWaterDate > today ? new Date(data.nextWaterDate) : new Date();

    const nextWaterDate = getParticularDateFromSpecificDay({
      specificDay,
      particularNumber: 1,
    });
    const variables: PushOffProps = {
      id: petPlantId,
      body: {
        nextWaterDate,
      },
    };

    context?.pushOffCallback(variables);
  };

  const waterHandler = (waterDate: string) => {
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
          {status === 'exist' ? convertSubFix(status) : `${Math.abs(dDay)}${convertSubFix(status)}`}
        </Alert>
      </ContentBox>
      <ActionBox>
        <DateInput value="" onChange={waterHandler} placeholder="날짜 선택" max={getToday()} />
        <PutOff type="button" onClick={pushOffHandler}>
          미루기
        </PutOff>
      </ActionBox>
    </Wrapper>
  );
};

export default ReminderCard;

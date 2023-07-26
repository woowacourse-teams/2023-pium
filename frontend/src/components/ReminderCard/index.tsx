import { ReminderExtendType, TodayStatus } from 'types/api/reminder';
import DateInput from 'components/DateInput';
import {
  ActionBox,
  ContentBox,
  StatusBar,
  Wrapper,
  Image,
  PutOff,
  Alert,
  NickName,
  DictionaryPlantName,
} from './ReminderCard.style';

interface ReminderCardProps {
  data: ReminderExtendType;
  dateCallback: (value: string) => void;
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

const ReminderCard = (props: ReminderCardProps) => {
  const { data, dateCallback } = props;
  const { status, image, nickName, dictionaryPlantName, dDay } = data;
  return (
    <Wrapper>
      <StatusBar status={status} />
      <Image src={image} alt={`${nickName} 이미지`} />
      <ContentBox>
        <NickName>{nickName}</NickName>
        <DictionaryPlantName>{dictionaryPlantName}</DictionaryPlantName>
        <Alert status={status}>
          {status === 'exist' ? convertSubFix(status) : `${Math.abs(dDay)}${convertSubFix(status)}`}
        </Alert>
      </ContentBox>
      <ActionBox>
        <DateInput value="" onChange={dateCallback} placeholder="날짜 선택" />
        <PutOff type="button">미루기</PutOff>
      </ActionBox>
    </Wrapper>
  );
};

export default ReminderCard;

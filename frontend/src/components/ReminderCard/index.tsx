import { ReminderExtendType } from 'types/api/reminder';
import DateInput from 'components/DateInput';
import { ActionBox, ContentBox, StatusBar, Wrapper, Image, PutOff } from './ReminderCard.style';

interface ReminderCardProps {
  data: ReminderExtendType;
  dateCallback: (value: string) => void;
}

const ReminderCard = (props: ReminderCardProps) => {
  const { data, dateCallback } = props;
  return (
    <Wrapper>
      <StatusBar status={data.status} />
      <Image src={data.image} alt={`${data.nickName} 이미지`} />
      <ContentBox>
        <p>{data.nickName}</p>
        <p>{data.dictionaryPlantName}</p>
        <p>D+ </p>
      </ContentBox>
      <ActionBox>
        <DateInput value="" onChange={dateCallback} placeholder="날짜 선택" />
        <PutOff type="button">미루기</PutOff>
      </ActionBox>
    </Wrapper>
  );
};

export default ReminderCard;

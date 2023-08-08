import { ReminderExtendType } from 'types/reminder';
import { DateLabel, InfoBox, ReminderCardBox } from './CardBox.style';
import ReminderCard from '../Card';

interface CardBoxProps {
  data: ReminderExtendType;
  showDate: boolean;
}

const CardBox = ({ data, showDate }: CardBoxProps) => {
  return (
    <ReminderCardBox aria-label={`${data.date}일의 리마인더 정보`} tabIndex={0}>
      <InfoBox aria-label={`${data.date}일`}>
        {!showDate && <DateLabel>{data.date}</DateLabel>}
      </InfoBox>
      <ReminderCard data={data} />
    </ReminderCardBox>
  );
};

export default CardBox;

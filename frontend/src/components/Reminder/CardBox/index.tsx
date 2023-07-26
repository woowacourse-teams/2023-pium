import { ReminderExtendType } from 'types/api/reminder';
import { CheckButton, DateLabel, InfoBox, ReminderCardBox } from './CardBox.style';
import ReminderCard from '../Card';

interface CardBoxProps {
  data: ReminderExtendType;
  hasDate: boolean;
}

const CardBox = ({ data, hasDate }: CardBoxProps) => {
  const actionCallback = (value: string) => console.log(value);

  return (
    <ReminderCardBox key={data.petPlantId}>
      <InfoBox>
        {!hasDate && <DateLabel>{data.date}</DateLabel>}
        <CheckButton type="button" />
      </InfoBox>
      <ReminderCard data={data} dateCallback={actionCallback} />
    </ReminderCardBox>
  );
};

export default CardBox;

import { ReminderExtendType } from 'types/api/reminder';
import { MonthReminderBox, MonthTitle } from './MonthBox.style';
import CardBox from '../CardBox';

interface MonthBoxProps {
  month: string;
  reminderDates: ReminderExtendType[];
}

const MonthBox = ({ month, reminderDates }: MonthBoxProps) => {
  const dayMap = new Map();

  const cardBoxes = reminderDates.map((info) => {
    const showDate = dayMap.has(info.date);
    if (!showDate) dayMap.set(info.date, true);

    const id = info.petPlantId.toString();

    return <CardBox key={id} showDate={showDate} data={info} />;
  });

  return (
    <MonthReminderBox key={month}>
      <MonthTitle>{Number(month)}월</MonthTitle>
      {cardBoxes}
    </MonthReminderBox>
  );
};

export default MonthBox;

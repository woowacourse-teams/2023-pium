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
    const hasDate = dayMap.has(info.date);
    if (!hasDate) dayMap.set(info.date, true);

    const id = info.petPlantId.toString();
    console.log(hasDate, '22');
    return <CardBox key={id} hasDate={hasDate} data={info} />;
  });

  return (
    <MonthReminderBox key={month}>
      <MonthTitle>{Number(month)}월</MonthTitle>
      {cardBoxes}
    </MonthReminderBox>
  );
};

export default MonthBox;

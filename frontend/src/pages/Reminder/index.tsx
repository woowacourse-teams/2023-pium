import MonthBox from 'components/Reminder/MonthBox';
import { ContentBox, HeaderBox, Title, Wrapper } from './Reminder.style';
import useReminder from 'hooks/queries/reminder/useReminder';

const Reminder = () => {
  const { reminderData } = useReminder();

  if (reminderData === undefined) return null;

  const scheduleReminder = Object.entries(reminderData.data);

  const reminderBox = scheduleReminder.map(([month, value]) => {
    return <MonthBox key={month} month={month} reminderDates={value} />;
  });

  return (
    <Wrapper status={reminderData.status}>
      <HeaderBox>
        <Title>리마인더</Title>
      </HeaderBox>
      <ContentBox>{reminderBox}</ContentBox>
    </Wrapper>
  );
};

export default Reminder;

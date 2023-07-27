import ReminderProvider from 'contexts/reminderContext';
import MonthBox from 'components/Reminder/MonthBox';
import { ContentBox, HeaderBox, Title, Wrapper } from './Reminder.style';
import useReminderHooks from 'hooks/useReminderHooks';

const Reminder = () => {
  const { reminderData, waterMutate, pushOffMutate } = useReminderHooks();

  if (reminderData === undefined) return null;

  const scheduleReminder = Object.entries(reminderData.data);

  const reminderBox = scheduleReminder.map(([month, value]) => {
    return <MonthBox key={month} month={month} reminderDates={value} />;
  });

  return (
    <ReminderProvider waterCallback={waterMutate} pushOffCallback={pushOffMutate}>
      <Wrapper status={reminderData.status}>
        <HeaderBox>
          <Title>리마인더</Title>
        </HeaderBox>
        <ContentBox>{reminderBox}</ContentBox>
      </Wrapper>
    </ReminderProvider>
  );
};

export default Reminder;

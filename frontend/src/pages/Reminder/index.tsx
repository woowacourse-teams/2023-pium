import Navbar from 'components/@common/Navbar';
import MonthBox from 'components/reminder/MonthBox';
import { ContentBox, HeaderBox, Title, Wrapper } from './Reminder.style';
import ReminderProvider from 'contexts/reminderContext';
import useReminderHooks from './useReminderHooks';

const Reminder = () => {
  const { reminderData, waterMutate, changeDateMutate } = useReminderHooks();

  if (!reminderData) return null;

  const reminderBox = reminderData.data.map(([month, reminders]) => {
    return <MonthBox key={JSON.stringify(reminders[0])} month={month} reminderDates={reminders} />;
  });

  return (
    <>
      <ReminderProvider waterCallback={waterMutate} changeDateCallback={changeDateMutate}>
        <Wrapper status={reminderData.status}>
          <HeaderBox>
            <Title>리마인더</Title>
          </HeaderBox>
          <ContentBox>{reminderBox}</ContentBox>
        </Wrapper>
      </ReminderProvider>
      <Navbar />
    </>
  );
};

export default Reminder;

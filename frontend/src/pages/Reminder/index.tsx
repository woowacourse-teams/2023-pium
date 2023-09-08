import ContentHeader from 'components/@common/ContentHeader';
import Navbar from 'components/@common/Navbar';
import MonthBox from 'components/reminder/MonthBox';
import { ContentBox, Wrapper } from './Reminder.style';
import ReminderProvider from 'contexts/reminderContext';
import useReminderHooks from 'hooks/useReminderHooks';

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
          <ContentHeader title="리마인더" />
          <ContentBox>{reminderBox}</ContentBox>
        </Wrapper>
      </ReminderProvider>
      <Navbar />
    </>
  );
};

export default Reminder;

import ReminderProvider from 'contexts/reminderContext';
import Navbar from 'components/@common/Navbar';
import MonthBox from 'components/Reminder/MonthBox';
import { ContentBox, HeaderBox, Title, Wrapper } from './Reminder.style';
import useReminderHooks from 'hooks/useReminderHooks';

const Reminder = () => {
  const { reminderData, waterMutate, changeDateMutate } = useReminderHooks();

  if (!reminderData) return null;

  const scheduleReminder = Object.entries(reminderData.data);

  const reminderBox = scheduleReminder.map(([month, value]) => {
    return <MonthBox key={month} month={month} reminderDates={value} />;
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

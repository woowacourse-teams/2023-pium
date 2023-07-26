import CheckBox from 'components/@common/CheckBox';
import ReminderCard from 'components/ReminderCard';
import {
  ContentBox,
  HeaderBox,
  MonthTitle,
  MonthReminderBox,
  Title,
  Wrapper,
  ReminderCardBox,
  InfoBox,
  DateLabel,
  FillStyle,
  EmptyStyle,
} from './Reminder.style';
import useReminder from 'hooks/queries/reminder/useReminder';
import reminderAPI from 'apis/reminder';
import { getToday } from 'utils/date';

const Reminder = () => {
  const { reminderData, refetch } = useReminder();

  if (reminderData === undefined) return null;

  const scheduleReminder = Object.entries(reminderData.data);

  const actionCallback = (value: string) => console.log(value);

  const reminderBox = scheduleReminder.map(([month, value]) => {
    const dayMap = new Map();

    return (
      <MonthReminderBox key={month}>
        <MonthTitle>{Number(month)}월</MonthTitle>
        {value.map((data) => {
          const hasDate = dayMap.has(data.date);
          if (!hasDate) dayMap.set(data.date, true);
          const id = data.petPlantId.toString();

          const checkCallback = async () => {
            const today = getToday();
            reminderAPI.waterPlant({
              id: data.petPlantId,
              body: {
                waterDate: today,
              },
            });
            console.log(await refetch());
          };

          return (
            <ReminderCardBox key={data.petPlantId}>
              <InfoBox>
                {!hasDate && <DateLabel htmlFor={id}>{data.date}</DateLabel>}
                <CheckBox
                  id={id}
                  fillStyle={FillStyle}
                  emptyStyle={EmptyStyle}
                  checkedCallback={checkCallback}
                />
              </InfoBox>
              <ReminderCard data={data} dateCallback={actionCallback} />
            </ReminderCardBox>
          );
        })}
      </MonthReminderBox>
    );
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

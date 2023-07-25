import {
  ConvertReminderData,
  Month,
  MonthKeyReminderType,
  ReminderExtendType,
  Reminder as ReminderType,
  TodayStatus,
} from 'types/api/reminder';
import { useQuery } from '@tanstack/react-query';
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
} from './Reminder.style';
import reminderAPI from 'apis/reminder';

const initialData: MonthKeyReminderType = {};

const Reminder = () => {
  const { data: reminderData } = useQuery<{ data: ReminderType[] }, Error, ConvertReminderData>({
    queryKey: ['reminder'],

    queryFn: async () => {
      const response = await reminderAPI.getReminder();
      const results = await response.json();
      return results;
    },

    select: (result) => {
      const { data } = result;

      const convertedData: MonthKeyReminderType = data.reduce((acc, cur) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, month, date] = cur.nextWaterDate.split('-') as [string, Month, string];

        const status: TodayStatus =
          cur.nextWaterDay === 0 ? 'exist' : cur.nextWaterDay > 0 ? 'none' : 'late';

        const convertData: ReminderExtendType = {
          ...cur,
          status,
          date: date,
        };

        const currentMonth = acc[month];

        if (currentMonth !== undefined) {
          return { ...acc, [month]: [...currentMonth, convertData] };
        }

        return {
          ...acc,
          [month]: [convertData],
        };
      }, initialData);

      const status = data.every(({ nextWaterDay }) => nextWaterDay > 0)
        ? 'none'
        : data.find(({ nextWaterDay }) => nextWaterDay < 0)
        ? 'late'
        : 'exist';

      return {
        data: convertedData,
        status,
      };
    },
  });

  if (reminderData === undefined) return null;

  const scheduleReminder = Object.entries(reminderData.data);

  const reminderBox = scheduleReminder.map(([month, value]) => {
    return (
      <MonthReminderBox key={month}>
        <MonthTitle>{Number(month)}월</MonthTitle>
        {value.map((data) => {
          return (
            <ReminderCardBox key={data.petPlantId}>
              <InfoBox>
                <DateLabel htmlFor={data.petPlantId + ''}>{data.date}</DateLabel>
                <input id={data.petPlantId + ''} type="checkbox" />
              </InfoBox>
              <div></div>
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

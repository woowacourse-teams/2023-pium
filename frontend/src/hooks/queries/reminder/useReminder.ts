import {
  ConvertReminderData,
  Month,
  MonthKeyReminderType,
  Reminder,
  ReminderExtendType,
  TodayStatus,
} from 'types/api/reminder';
import { useQuery } from '@tanstack/react-query';
import reminderAPI from 'apis/reminder';

const initialData: MonthKeyReminderType = {};

const convertReminderData = (result: { data: Reminder[] }): ConvertReminderData => {
  const { data } = result;

  const convertedData: MonthKeyReminderType = data.reduce((acc, cur) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, month, date] = cur.nextWaterDate.split('-') as [string, Month, string];

    const status: TodayStatus = cur.dDay === 0 ? 'exist' : cur.dDay > 0 ? 'late' : 'none';

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

  const status = data.every(({ dDay }) => dDay < 0)
    ? 'none'
    : data.find(({ dDay }) => dDay > 0)
    ? 'late'
    : 'exist';

  return {
    data: convertedData,
    status,
  };
};

const useReminder = () => {
  const { data: reminderData, refetch } = useQuery<
    { data: Reminder[] },
    Error,
    ConvertReminderData
  >({
    queryKey: ['reminder'],

    queryFn: async () => {
      const response = await reminderAPI.getReminder();
      const results = await response.json();
      return results;
    },
    select: convertReminderData,
  });

  return { reminderData, refetch };
};

export default useReminder;

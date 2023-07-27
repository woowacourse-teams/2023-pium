import {
  ConvertReminderData,
  Month,
  MonthKeyReminderType,
  ReminderExtendType,
  ReminderResult,
  TodayStatus,
} from 'types/api/reminder';
import { useQuery } from '@tanstack/react-query';
import type { UndefinedInitialDataOptions } from '@tanstack/react-query/build/lib/queryOptions';
import reminderAPI from 'apis/reminder';

const initialData: MonthKeyReminderType = {};

const convertReminderData = (result: ReminderResult): ConvertReminderData => {
  const { data } = result;

  const convertedData: MonthKeyReminderType = data.reduce((acc, cur) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, month, date] = cur.nextWaterDate.split('-') as [string, Month, string];

    const status: TodayStatus = cur.dDay === 0 ? 'today' : cur.dDay > 0 ? 'late' : 'future';

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
    ? 'future'
    : data.find(({ dDay }) => dDay > 0)
    ? 'late'
    : 'today';

  return {
    data: convertedData,
    status,
  };
};

const useReminder = (
  props: UndefinedInitialDataOptions<ReminderResult, Error, ConvertReminderData>
) => {
  const { data: reminderData, refetch } = useQuery<ReminderResult, Error, ConvertReminderData>({
    ...props,
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

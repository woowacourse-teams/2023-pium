import type {
  ArrangedReminderWithStatus,
  Month,
  MonthArrangedReminder,
  ReminderExtendType,
  ReminderStatus,
  ReminderResponse,
} from 'types/api/reminder';
import { useQuery } from '@tanstack/react-query';
import type { UndefinedInitialDataOptions } from '@tanstack/react-query/build/lib/queryOptions';
import ReminderAPI from 'apis/reminder';

const convertReminderData = (result: ReminderResponse): ArrangedReminderWithStatus => {
  const { data } = result;

  const convertedData: MonthArrangedReminder = data.reduce((acc, cur) => {
    const { dday, nextWaterDate } = cur;
    const [, month, date] = nextWaterDate.split('-') as [string, Month, string];
    const status: ReminderStatus = dday === 0 ? 'today' : dday > 0 ? 'late' : 'future';

    const extendedReminder: ReminderExtendType = {
      ...cur,
      status,
      date,
    };

    const hasSameMonthReminders = acc.length && acc[acc.length - 1][0] === month;

    if (hasSameMonthReminders) {
      const sameMonthReminders = acc[acc.length - 1][1];

      sameMonthReminders.push(extendedReminder);
    } else {
      acc.push([month, [extendedReminder]]);
    }

    return acc;
  }, [] as MonthArrangedReminder);

  const maxDday = Math.max(...data.map(({ dday }) => dday));
  const status = maxDday < 0 ? 'future' : maxDday > 0 ? 'late' : 'today';

  return {
    data: convertedData,
    status,
  };
};

const useReminder = (
  props: UndefinedInitialDataOptions<ReminderResponse, Error, ArrangedReminderWithStatus>
) =>
  useQuery<ReminderResponse, Error, ArrangedReminderWithStatus>({
    ...props,
    queryFn: async () => {
      const response = await ReminderAPI.getReminder();
      const results = await response.json();
      return results;
    },
    select: convertReminderData,
  });

export default useReminder;

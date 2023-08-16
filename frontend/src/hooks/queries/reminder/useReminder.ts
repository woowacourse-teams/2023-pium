import { DataResponse } from 'types/DataResponse';
import { Month } from 'types/date';
import type { Reminder, ReminderExtendType, TodayStatus } from 'types/reminder';
import { useQuery } from '@tanstack/react-query';
import useUnauthorize from 'hooks/useUnauthorize';
import ReminderAPI from 'apis/reminder';
import StatusError from 'apis/statusError';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

interface ArrangedReminderWithStatus {
  data: Array<[Month, ReminderExtendType[]]>;
  status: TodayStatus;
}

const convertReminderData = (result: DataResponse<Reminder[]>): ArrangedReminderWithStatus => {
  const { data } = result;

  const convertedData: Array<[Month, ReminderExtendType[]]> = data.reduce((acc, cur) => {
    const { dday, nextWaterDate } = cur;
    const [, month, date] = nextWaterDate.split('-') as [string, Month, string];
    const status: TodayStatus = dday === 0 ? 'today' : dday > 0 ? 'late' : 'future';

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
  }, [] as Array<[Month, ReminderExtendType[]]>);

  const status = data.every(({ dday }) => dday < 0)
    ? 'future'
    : data.find(({ dday }) => dday > 0)
    ? 'late'
    : 'today';

  return {
    data: convertedData,
    status,
  };
};

const useReminder = () => {
  const { retryCallback } = useUnauthorize();

  return useQuery<DataResponse<Reminder[]>, Error | StatusError, ArrangedReminderWithStatus>({
    queryKey: ['reminder'],
    queryFn: async () => {
      const response = await ReminderAPI.getReminder();
      throwOnInvalidStatus(response);

      const results = await response.json();
      return results;
    },
    select: convertReminderData,
    throwOnError: true,
    suspense: true,
    retry: retryCallback,
  });
};

export default useReminder;

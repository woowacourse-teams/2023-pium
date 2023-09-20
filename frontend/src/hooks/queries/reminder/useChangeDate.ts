import type { MutationProps } from 'types/api';
import type { ChangeDateParams } from 'types/reminder';
import { useMutation } from '@tanstack/react-query';
import ReminderAPI from 'apis/reminder';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

const useChangeDate = <T>({
  successCallback,
  errorCallback,
}: MutationProps<T, ChangeDateParams>) => {
  return useMutation({
    mutationFn: async (params: ChangeDateParams) => {
      const response = await ReminderAPI.changeDate(params);

      throwOnInvalidStatus(response);

      const data = response.text() as Promise<T>;
      return data;
    },

    onSuccess: (data, variable) => successCallback && successCallback(data, variable),
    onError: (error, variable) => errorCallback && errorCallback(error, variable),

    throwOnError: true,
    retry: noRetryIfUnauthorized,
  });
};

export default useChangeDate;

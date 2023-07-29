import { MutationProps } from 'types/api/DataResponse';
import { ChangeDateProps } from 'types/api/reminder';
import { useMutation } from '@tanstack/react-query';
import ReminderAPI from 'apis/reminder';

const useChangeDate = <T>({ successCallback, errorCallback }: MutationProps<T, ChangeDateProps>) =>
  useMutation({
    mutationFn: async ({ id, body }: ChangeDateProps) => {
      const response = await ReminderAPI.changeDate({
        id,
        body,
      });

      const data = response.text() as Promise<T>;
      return data;
    },
    onSuccess: (data, variable) => successCallback && successCallback(data, variable),
    // TODO: 에러 처리하기 (toast 띄우기)
    onError: (error, variable) => errorCallback && errorCallback(error, variable),
  });

export default useChangeDate;

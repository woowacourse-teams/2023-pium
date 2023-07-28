import { MutationProps } from 'types/api/DataResponse';
import { PushOffProps } from 'types/api/reminder';
import { useMutation } from '@tanstack/react-query';
import ReminderAPI from 'apis/reminder';

const usePushOff = <T>({ successCallback, errorCallback }: MutationProps<T, PushOffProps>) =>
  useMutation({
    mutationFn: async ({ id, body }: PushOffProps) => {
      const response = await ReminderAPI.pushOff({
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

export default usePushOff;

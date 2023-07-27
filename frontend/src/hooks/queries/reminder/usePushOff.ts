import { PushOffProps } from 'types/api/reminder';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import reminderAPI from 'apis/reminder';

const usePushOff = <T>(props: UseMutationOptions<T, Error, PushOffProps>) =>
  useMutation({
    ...props,
    mutationFn: async ({ id, body }: PushOffProps): Promise<T> => {
      const response = await reminderAPI.pushOff({
        id,
        body,
      });

      const data = response.text() as unknown as Promise<T>;

      return data;
    },
  });

export default usePushOff;

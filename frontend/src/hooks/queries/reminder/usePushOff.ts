import { PushOffProps } from 'types/api/reminder';
import { useMutation } from '@tanstack/react-query';
import reminderAPI from 'apis/reminder';

const usePushOff = () => {
  const { mutate } = useMutation({
    mutationFn: async ({ id, body }: PushOffProps) => {
      reminderAPI.pushOff({
        id,
        body,
      });
    },
  });

  return { mutate };
};

export default usePushOff;

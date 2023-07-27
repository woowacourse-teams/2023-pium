import { PushOffProps, WaterPlantProps } from 'types/api/reminder';
import usePushOff from './queries/reminder/usePushOff';
import useReminder from './queries/reminder/useReminder';
import useWater from './queries/reminder/useWater';

const useReminderHooks = () => {
  const { data: reminderData, refetch } = useReminder({ queryKey: ['reminder'] });

  const { mutate: water } = useWater({
    onSuccess: refetch,
    onError: (error) => {
      console.log(error, 'error occurs');
    },
  });
  const { mutate: pushOff } = usePushOff({
    onSuccess: refetch,
    onError: (error) => {
      console.log(error, 'error occurs');
    },
  });

  const waterMutate = (variables: WaterPlantProps) => water(variables);

  const pushOffMutate = (variables: PushOffProps) => pushOff(variables);

  return { reminderData, waterMutate, pushOffMutate };
};

export default useReminderHooks;

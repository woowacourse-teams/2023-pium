import { PushOffProps, WaterPlantProps } from 'types/api/reminder';
import usePushOff from './queries/reminder/usePushOff';
import useReminder from './queries/reminder/useReminder';
import useWater from './queries/reminder/useWater';

interface ReminderHooksProps {
  enabled?: boolean;
}

const useReminderHooks = ({ enabled = true }: ReminderHooksProps) => {
  const { reminderData, refetch } = useReminder({ enabled, queryKey: ['reminder'] });

  const { mutate: water } = useWater();
  const { mutate: pushOff } = usePushOff();

  const waterMutate = (variables: WaterPlantProps) =>
    water(variables, {
      onSuccess: () => {
        refetch();
      },
    });

  const pushOffMutate = (variables: PushOffProps) =>
    pushOff(variables, {
      onSuccess: () => {
        refetch();
      },
    });

  return { reminderData, waterMutate, pushOffMutate };
};

export default useReminderHooks;

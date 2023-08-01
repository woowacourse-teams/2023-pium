import { ChangeDateParams, WaterPlantParams } from 'types/api/reminder';
import useChangeDate from './queries/reminder/useChangeDate';
import useReminder from './queries/reminder/useReminder';
import useWater from './queries/reminder/useWater';
import useToast from './useToast';

const useReminderHooks = () => {
  const { data: reminderData, refetch } = useReminder({ queryKey: ['reminder'] });
  const { addToast } = useToast();
  const { mutate: water } = useWater<string>({
    successCallback: () => {
      refetch();
      addToast('success', '성공했습니다');
    },
    errorCallback: (error) => {
      addToast('error', error.message);
    },
  });

  const { mutate: changeDate } = useChangeDate<string>({
    successCallback: () => {
      refetch();
      addToast('success', '성공했습니다');
    },
    errorCallback: (error) => {
      addToast('error', error.message);
    },
  });

  const waterMutate = (variables: WaterPlantParams) => water(variables);

  const changeDateMutate = (variables: ChangeDateParams) => changeDate(variables);

  return { reminderData, waterMutate, changeDateMutate };
};

export default useReminderHooks;

import { ChangeDateParams, WaterPlantParams } from 'types/api/reminder';
import useChangeDate from './queries/reminder/useChangeDate';
import useReminder from './queries/reminder/useReminder';
import useWater from './queries/reminder/useWater';

const useReminderHooks = () => {
  const { data: reminderData, refetch } = useReminder({ queryKey: ['reminder'] });

  const { mutate: water } = useWater<string>({
    successCallback: () => {
      refetch();
    },
    errorCallback: (error) => {
      console.log(error, 'error occurs');
    },
  });
  const { mutate: changeDate } = useChangeDate<string>({
    successCallback: () => refetch(),
    errorCallback: (error) => {
      console.log(error, 'error occurs');
    },
  });

  const waterMutate = (variables: WaterPlantParams) => water(variables);

  const changeDateMutate = (variables: ChangeDateParams) => changeDate(variables);

  return { reminderData, waterMutate, changeDateMutate };
};

export default useReminderHooks;

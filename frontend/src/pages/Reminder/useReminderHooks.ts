import type { ChangeDateParams, WaterPlantParams } from 'types/reminder';
import useChangeDate from 'hooks/queries/reminder/useChangeDate';
import useReminder from 'hooks/queries/reminder/useReminder';
import useWater from 'hooks/queries/reminder/useWater';
import useAddToast from 'hooks/useAddToast';
import { convertDateKorYear } from 'utils/date';

const useReminderHooks = () => {
  const { data: reminderData, refetch } = useReminder();
  const addToast = useAddToast();
  const { mutate: water } = useWater<string>({
    successCallback: (_, variable) => {
      refetch();
      const {
        body: { waterDate },
      } = variable;
      addToast('success', `${convertDateKorYear(waterDate).slice(5)}에 물주기 완료`);
    },
    errorCallback: (error) => {
      addToast('error', error.message);
    },
  });

  const { mutate: changeDate } = useChangeDate<string>({
    successCallback: (_, variable) => {
      refetch();
      const {
        body: { nextWaterDate },
      } = variable;
      addToast('success', `${convertDateKorYear(nextWaterDate).slice(5)}로 물주기 날짜 변경`);
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

import { WaterPlantProps } from 'types/api/reminder';
import { useMutation } from '@tanstack/react-query';
import reminderAPI from 'apis/reminder';

const useWater = () => {
  const { mutate } = useMutation({
    mutationFn: async ({ id, body }: WaterPlantProps) => {
      reminderAPI.waterPlant({
        id,
        body,
      });
    },
  });

  return { mutate };
};

export default useWater;

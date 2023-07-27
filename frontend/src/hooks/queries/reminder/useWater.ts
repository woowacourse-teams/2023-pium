import { WaterPlantProps } from 'types/api/reminder';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import reminderAPI from 'apis/reminder';

const useWater = <T>(props: UseMutationOptions<T, Error, WaterPlantProps>) =>
  useMutation({
    ...props,
    mutationFn: async ({ id, body }: WaterPlantProps): Promise<T> => {
      const response = await reminderAPI.waterPlant({
        id,
        body,
      });

      const data = (await response.text()) as unknown as Promise<T>;

      return data;
    },
  });

export default useWater;

import { MutationProps } from 'types/api/DataResponse';
import { WaterPlantProps } from 'types/api/reminder';
import { useMutation } from '@tanstack/react-query';
import ReminderAPI from 'apis/reminder';

const useWater = <T>({ successCallback, errorCallback }: MutationProps<T, WaterPlantProps>) =>
  useMutation({
    mutationFn: async ({ id, body }: WaterPlantProps) => {
      const response = await ReminderAPI.waterPlant({
        id,
        body,
      });

      // json() 형식으로 파싱하면, body가 없다는 에러 발생. 하지만, mutationFn의 반환은 Promise<T> 형식이기 때문에 맞추기 위해 사용
      const data = response.text() as Promise<T>;
      return data;
    },
    onSuccess: (data, variable) => successCallback && successCallback(data, variable),
    // TODO: 에러 처리하기 (toast 띄우기)
    onError: (error, variable) => errorCallback && errorCallback(error, variable),
  });

export default useWater;

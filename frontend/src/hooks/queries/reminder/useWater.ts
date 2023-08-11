import { MutationProps } from 'types/DataResponse';
import { WaterPlantParams } from 'types/reminder';
import { useMutation } from '@tanstack/react-query';
import ReminderAPI from 'apis/reminder';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const useWater = <T>({ successCallback, errorCallback }: MutationProps<T, WaterPlantParams>) =>
  useMutation({
    mutationFn: async (params: WaterPlantParams) => {
      const response = await ReminderAPI.waterPlant(params);

      throwOnInvalidStatus(response);

      // json() 형식으로 파싱하면, body가 없다는 에러 발생. 하지만, mutationFn의 반환은 Promise<T> 형식이기 때문에 맞추기 위해 사용
      const data = response.text() as Promise<T>;
      return data;
    },
    onSuccess: (data, variable) => successCallback && successCallback(data, variable),
    // TODO: 에러 처리하기 (toast 띄우기)
    onError: (error, variable) => errorCallback && errorCallback(error, variable),
  });

export default useWater;

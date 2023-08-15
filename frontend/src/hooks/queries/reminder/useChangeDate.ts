import { MutationProps } from 'types/DataResponse';
import { ChangeDateParams } from 'types/reminder';
import { useMutation } from '@tanstack/react-query';
import useUnauthorize from 'hooks/useUnauthorize';
import ReminderAPI from 'apis/reminder';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const useChangeDate = <T>({
  successCallback,
  errorCallback,
}: MutationProps<T, ChangeDateParams>) => {
  const checkErrorStatus = useUnauthorize();

  return useMutation({
    mutationFn: async (params: ChangeDateParams) => {
      const response = await ReminderAPI.changeDate(params);

      throwOnInvalidStatus(response);

      const data = response.text() as Promise<T>;
      return data;
    },
    onSuccess: (data, variable) => successCallback && successCallback(data, variable),
    // TODO: 에러 처리하기 (toast 띄우기)
    onError: (error, variable) => errorCallback && errorCallback(error, variable),
    throwOnError: checkErrorStatus,
  });
};

export default useChangeDate;

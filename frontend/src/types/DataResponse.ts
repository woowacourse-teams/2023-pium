import StatusError from 'models/statusError';

export interface DataResponse<T> {
  data: T;
}

export interface MutationProps<T, V> {
  mutationCallback?: (data: T, variable: V) => void;
  successCallback?: (data: T, variable: V) => void;
  errorCallback?: (error: Error | StatusError, variable: V) => void;
  settledCallback?: (data: T, variable: V) => void;
}

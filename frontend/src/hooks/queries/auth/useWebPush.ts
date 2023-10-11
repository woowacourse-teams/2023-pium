import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import useAddToast from 'hooks/@common/useAddToast';
import WebPushSubscribeAPI, { SUBSCRIBE_URL } from 'apis/webPush';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

interface CurrentSubscribe {
  isSubscribe: boolean;
}

const useWebPush = () => {
  const addToast = useAddToast();

  const subscribe = useMutation({
    mutationFn: async (token: string) => await WebPushSubscribeAPI.subscribe(token),
    onSuccess: () => {
      addToast('success', '알림을 등록했습니다.', 3000);
    },
  });

  const unSubscribe = useMutation({
    mutationFn: async () => await WebPushSubscribeAPI.unSubscribe(),

    onSuccess: () => {
      addToast('info', '알림을 거부했습니다.', 3000);
    },
  });

  const currentSubscribe = useSuspenseQuery<CurrentSubscribe>({
    queryKey: [SUBSCRIBE_URL],
    queryFn: async () => {
      const response = await WebPushSubscribeAPI.currentSubscribe();
      throwOnInvalidStatus(response);

      const data = response.json();

      return data;
    },
    retry: noRetryIfUnauthorized,
  });

  return { subscribe, unSubscribe, currentSubscribe };
};

export default useWebPush;

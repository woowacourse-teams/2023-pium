import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import useAddToast from 'hooks/@common/useAddToast';
import useDeleteToken from 'hooks/firebase/useDeleteToken';
import useGetToken from 'hooks/firebase/useGetToken';
import WebPushSubscribeAPI, { SUBSCRIBE_URL } from 'apis/webPush';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

interface CurrentSubscribe {
  subscribe: boolean;
}

// TODO: 토큰의 상태를 서버에서 받아오자니 상태 업데이트가 즉각적으로 발생하는게 아니라서 애매함 -> 토글의 상태가 곧이 곧대로 반영되는게 아니라 pushStatus로 반영되었다가 값이 설정되어서 좀 불안함.
// 즉 상태 값이 제대로 작동되지 않고 있음.
// 악질 유저가 계속해서 알림을 껐다 켰다 하면 어떻게 될까... -> 계속해서 요청을 보내게 되는데 과연 이게 맞을까?

// TODO: 전역상태로 currentToken을 관리하면서 어떻게 사용할지 생각해보기
// currentToken 값에 따라서 렌더링이 달라지는데, 이걸 전역 객체가 아닌 전역 상태로 사용하는 것이 대해 어떻게 생각하는지?

const useWebPush = () => {
  const addToast = useAddToast();
  const queryClient = useQueryClient();

  const { data: token, refetch } = useGetToken();
  const deleteToken = useDeleteToken({ onSuccessCallback: () => refetch() });

  // token이 null인 경우는 알림이 허용되지 않은 경우
  if (token === null) {
    throw new Error('알림을 허용하지 않았습니다');
  }

  const subscribe = useMutation({
    mutationFn: async () => {
      const response = await WebPushSubscribeAPI.subscribe(token);
      throwOnInvalidStatus(response);

      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [SUBSCRIBE_URL] });

      const prevData = queryClient.getQueryState([SUBSCRIBE_URL]);
      queryClient.setQueryData([SUBSCRIBE_URL], () => ({ subscribe: true }));

      return { prevData };
    },

    onError: async (error, __, context) => {
      queryClient.setQueryData([SUBSCRIBE_URL], context?.prevData);

      addToast({ type: 'error', message: '구독하는데 문제가 발생했습니다' });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
    },
  });

  const unSubscribe = useMutation({
    mutationFn: async () => {
      const response = await WebPushSubscribeAPI.unSubscribe();
      throwOnInvalidStatus(response);

      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [SUBSCRIBE_URL] });

      const prevData = queryClient.getQueryState([SUBSCRIBE_URL]);
      queryClient.setQueryData([SUBSCRIBE_URL], () => ({ subscribe: false }));

      return { prevData };
    },

    // 구독 취소를 한다면, 현재 토큰을 삭제하는게 맞음. 서버에서도 지정하고 있는 토큰을 지움. firebase db에서 삭제하는게 맞긴 함.
    onSuccess: () => {
      deleteToken.mutate();
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([SUBSCRIBE_URL], context?.prevData);
      addToast({ type: 'error', message: error.message });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
    },
  });

  // TODO: 구독 여부를 물어볼 때 현재 토큰을 가져올 것. 왜냐하면 새롭게 발급한 토큰과 현재 토큰의 싱크가 맞지 않음.
  // 궁금한 점은 getToken을 했을 때 왜 기존의 토큰을 발급하지 않고 새로운 토큰을 발급하냐 이 말임. 이것은 한번 확인해볼 필요가 있을듯.
  // https://github.dev/firebase/firebase-js-sdk 이 코드에 따르면 유효한 토큰이라면 기존에 토큰을 발급하는데, 그것을 하지 않는다는게 의문임..
  const { data: currentSubscribe } = useSuspenseQuery<CurrentSubscribe>({
    queryKey: [SUBSCRIBE_URL],
    queryFn: async () => {
      const response = await WebPushSubscribeAPI.currentSubscribe();
      throwOnInvalidStatus(response);
      const data = await response.json();

      return data;
    },
    retry: noRetryIfUnauthorized,
  });

  return {
    subscribe: subscribe.mutate,
    unSubscribe: unSubscribe.mutate,
    currentSubscribe: currentSubscribe.subscribe,
  };
};

export default useWebPush;

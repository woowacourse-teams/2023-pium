import { useMutation } from '@tanstack/react-query';
import FCMMessaging from 'models/FCMMessaging';

const useDeleteToken = () =>
  useMutation({
    mutationKey: ['deleteFCMToken'],
    mutationFn: FCMMessaging.deleteCurrentToken,
  });

export default useDeleteToken;

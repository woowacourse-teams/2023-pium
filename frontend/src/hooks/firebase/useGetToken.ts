import { useSuspenseQuery } from '@tanstack/react-query';
import FCMMessaging from 'models/FCMMessaging';

const useGetToken = () =>
  useSuspenseQuery({
    queryKey: ['getFCMToken'],
    queryFn: FCMMessaging.getCurrentToken,
  });

export default useGetToken;

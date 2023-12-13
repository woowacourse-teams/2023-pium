import { useMutation } from '@tanstack/react-query';
import FCMMessaging from 'models/FCMMessaging';

interface DeleteTokenProps {
  onSuccessCallback?: () => void;
}

const useDeleteToken = ({ onSuccessCallback }: DeleteTokenProps) =>
  useMutation({
    mutationKey: ['deleteFCMToken'],
    mutationFn: FCMMessaging.deleteCurrentToken,
    onSuccess: () => onSuccessCallback && onSuccessCallback(),
  });

export default useDeleteToken;

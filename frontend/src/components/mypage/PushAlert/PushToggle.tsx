import Toggle from 'components/@common/Toggle';
import usePushAlert from 'hooks/@common/usePushAlert';
import PushStatus from 'models/PushStatus';

const PushToggle = () => {
  const pushSupport = PushStatus.getIsSupport();
  const notificationDenied = PushStatus.getPermission();
  const { currentSubscribe, subscribeAlert, unSubscribeAlert, isTokenPending } = usePushAlert();

  if (isTokenPending) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    throw new Promise(() => {});
  }

  return (
    <Toggle
      width={45}
      height={20}
      toggleOnCallback={subscribeAlert}
      toggleOffCallback={unSubscribeAlert}
      state={currentSubscribe}
      disabled={!pushSupport || notificationDenied === 'denied'}
    />
  );
};

export default PushToggle;

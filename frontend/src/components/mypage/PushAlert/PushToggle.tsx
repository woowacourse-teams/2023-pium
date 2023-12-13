import Toggle from 'components/@common/Toggle';
import usePushAlert from 'hooks/@common/usePushAlert';
import PushStatus from 'models/PushStatus';

const PushToggle = () => {
  const pushSupport = PushStatus.getIsSupport();
  const notificationDenied = PushStatus.getPermission();
  const { currentSubscribe, subscribeAlert, unSubscribeAlert } = usePushAlert();

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

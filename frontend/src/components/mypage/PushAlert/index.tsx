import Toggle from 'components/@common/Toggle';
import { PushAlertContent, PushAlertWrapper, WarnParagraph } from './PushAlert.style';
import usePushAlert from 'hooks/@common/usePushAlert';
import PushStatus from 'models/PushStatus';

const PushAlert = () => {
  const { currentSubscribe, subscribeAlert, unSubscribeAlert } = usePushAlert();

  const pushSupport = PushStatus.getIsSupport();
  const notificationDenied = PushStatus.getPermission();

  return (
    <PushAlertWrapper>
      <PushAlertContent>
        <p>리마인더 알림 받기</p>
        <Toggle
          width={45}
          height={20}
          toggleOnCallback={subscribeAlert}
          toggleOffCallback={unSubscribeAlert}
          state={currentSubscribe}
          disabled={!pushSupport || notificationDenied === 'denied'}
        />
      </PushAlertContent>
      {!pushSupport && <WarnParagraph>지원하지 않는 브라우저 또는 os입니다.</WarnParagraph>}
      {notificationDenied === 'denied' && (
        <WarnParagraph>
          브라우저 알림을 허용하지 않았습니다. 허용하기 위해서는 설정 {'>'} 알림 허용을 해주세요
        </WarnParagraph>
      )}
    </PushAlertWrapper>
  );
};

export default PushAlert;

import { Suspense } from 'react';
import Spinner from 'components/@common/Spinner';
import { PushAlertContent, PushAlertWrapper, WarnParagraph } from './PushAlert.style';
import PushStatus from 'models/PushStatus';
import PushToggle from './PushToggle';

const PushAlert = () => {
  const pushSupport = PushStatus.getIsSupport();
  const notificationDenied = PushStatus.getPermission();

  return (
    <PushAlertWrapper>
      <PushAlertContent>
        <p>리마인더 알림 받기</p>
        <Suspense fallback={<Spinner size="20" />}>
          <PushToggle />
        </Suspense>
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

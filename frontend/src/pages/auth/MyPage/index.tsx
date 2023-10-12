import { FixedButtonArea } from 'pages/garden/GardenPostList/GardenPostList.style';
import ContentHeader from 'components/@common/ContentHeader';
import Navbar from 'components/@common/Navbar';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import Toggle from 'components/@common/Toggle';
import VerticalDivider from 'components/@common/VerticalDivider/VerticalDivider.style';
import {
  BottomSheet,
  Button,
  ButtonBox,
  Wrapper,
  PushAlertWrapper,
  PushAlertContent,
  WarnParagraph,
} from './MyPage.style';
import useConfirm from 'hooks/@common/useConfirm';
import usePushAlert from 'hooks/@common/usePushAlert';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useLogout from 'hooks/queries/auth/useLogout';
import useWithdraw from 'hooks/queries/auth/useWithdraw';
import theme from 'style/theme.style';

const MyPage = () => {
  useCheckSessionId();
  const { mutate: logoutMutate } = useLogout();
  const { mutate: withdrawMutate } = useWithdraw();

  // const { currentSubscribe, pushSupport, notificationDenied, subscribeAlert, unSubscribeAlert } =
  //   usePushAlert();

  const confirm = useConfirm();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    logoutMutate();
  };

  const handleWithdraw: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (
      await confirm({ title: '정말로 탈퇴하시겠어요?', message: '그동안 함께해서 즐거웠어요😁' })
    ) {
      withdrawMutate();
    }
  };

  // const {
  //   data: { isSubscribe },
  // } = currentSubscribe;

  return (
    <>
      <ContentHeader title="마이페이지" />
      <Wrapper>
        {/* <PushAlertWrapper>
          <PushAlertContent>
            <p>리마인더 알림 받기</p>
            <Toggle
              width={45}
              height={20}
              toggleOnCallback={subscribeAlert}
              toggleOffCallback={unSubscribeAlert}
              state={isSubscribe}
              disabled={!pushSupport || notificationDenied === 'denied'}
            />
          </PushAlertContent>
          {!pushSupport && <WarnParagraph>지원하지 않는 브라우저 또는 os입니다.</WarnParagraph>}
          {notificationDenied === 'denied' && (
            <WarnParagraph>
              브라우저 알림을 허용하지 않았습니다. 허용하기 위해서는 설정 {'>'} 알림 허용을 해주세요
            </WarnParagraph>
          )}
        </PushAlertWrapper> */}
        <ButtonBox>
          <Button type="button" onClick={handleLogout}>
            로그아웃
          </Button>
          <VerticalDivider height={'12px'} />
          <Button type="button" onClick={handleWithdraw}>
            회원 탈퇴
          </Button>
        </ButtonBox>
      </Wrapper>
      <Navbar />
      <FixedButtonArea>
        <BottomSheet to="https://forms.gle/rQUAi9GbVwrr7oG2A" target="blank">
          <SvgFill icon="survey" color={theme.color.background} size={16} />
          문의하기
        </BottomSheet>
      </FixedButtonArea>
    </>
  );
};

export default MyPage;

import { FixedButtonArea } from 'pages/garden/GardenPostList/GardenPostList.style';
import ContentHeader from 'components/@common/ContentHeader';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import Footer from 'components/@common/Footer';
import PageLogger from 'components/@common/PageLogger';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import VerticalDivider from 'components/@common/VerticalDivider/VerticalDivider.style';
import PushAlert from 'components/mypage/PushAlert';
import { BottomSheet, Button, ButtonBox, Main } from './MyPage.style';
import useConfirm from 'hooks/@common/useConfirm';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useLogout from 'hooks/queries/auth/useLogout';
import useWithdraw from 'hooks/queries/auth/useWithdraw';
import theme from 'style/theme.style';

const MyPage = () => {
  useCheckSessionId();
  const { mutate: logoutMutate } = useLogout();
  const { mutate: withdrawMutate } = useWithdraw();

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

  return (
    <PageLogger>
      <ContentHeader title="마이페이지" />
      <Main>
        <ErrorBoundary fallback={<div>에러 발생...</div>}>
          <PushAlert />
        </ErrorBoundary>
        <ButtonBox>
          <Button type="button" onClick={handleLogout}>
            로그아웃
          </Button>
          <VerticalDivider height={'12px'} />
          <Button type="button" onClick={handleWithdraw}>
            회원 탈퇴
          </Button>
        </ButtonBox>
      </Main>
      <Footer />
      <FixedButtonArea>
        <BottomSheet to="https://forms.gle/rQUAi9GbVwrr7oG2A" target="blank">
          <SvgFill icon="survey" color={theme.color.background} size={16} />
          문의하기
        </BottomSheet>
      </FixedButtonArea>
    </PageLogger>
  );
};

export default MyPage;

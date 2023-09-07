import ContentHeader from 'components/@common/ContentHeader';
import Navbar from 'components/@common/Navbar';
import VerticalDivider from 'components/@common/VerticalDivider/VerticalDivider.style';
import { Button, ButtonBox, Wrapper } from './MyPage.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useLogout from 'hooks/queries/auth/useLogout';
import useWithdraw from 'hooks/queries/auth/useWithdraw';
import useConfirm from 'hooks/useConfirm';

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
    <>
      <ContentHeader title="마이페이지" />
      <Wrapper>
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
    </>
  );
};

export default MyPage;

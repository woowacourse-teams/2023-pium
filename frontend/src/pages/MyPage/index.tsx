import Navbar from 'components/@common/Navbar';
import { ButtonBox, Logout, Title, TitleBox, Withdraw, Wrapper } from './MyPage.style';
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
      <Wrapper>
        <TitleBox>
          <Title>마이페이지</Title>
        </TitleBox>
        <ButtonBox>
          <Logout type="button" onClick={handleLogout}>
            로그아웃
          </Logout>
          <Withdraw type="button" onClick={handleWithdraw}>
            회원 탈퇴
          </Withdraw>
        </ButtonBox>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default MyPage;

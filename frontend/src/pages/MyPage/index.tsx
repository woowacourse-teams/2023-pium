import Navbar from 'components/@common/Navbar';
import { ButtonBox, Logout, Title, TitleBox, Withdraw, Wrapper } from './MyPage.style';
import useLogout from 'hooks/queries/auth/useLogout';
import useWithdraw from 'hooks/queries/auth/useWithdraw';

const MyPage = () => {
  const { mutate: logoutMutate } = useLogout();
  const { mutate: withdrawMutate } = useWithdraw();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    logoutMutate();
  };
  const handleWithdraw: React.MouseEventHandler<HTMLButtonElement> = () => {
    withdrawMutate();
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

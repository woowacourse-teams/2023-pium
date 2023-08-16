import { useEffect } from 'react';
import Navbar from 'components/@common/Navbar';
import { ButtonBox, Logout, Title, TitleBox, Withdraw, Wrapper } from './MyPage.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useLogout from 'hooks/queries/auth/useLogout';
import useWithdraw from 'hooks/queries/auth/useWithdraw';
import useUnauthorize from 'hooks/useUnauthorize';

const MyPage = () => {
  const { redirectLoginPage } = useUnauthorize();
  const { error } = useCheckSessionId();
  const { mutate: logoutMutate } = useLogout();
  const { mutate: withdrawMutate } = useWithdraw();

  useEffect(() => {
    if (error) {
      redirectLoginPage(error);
    }
  }, [error]);

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

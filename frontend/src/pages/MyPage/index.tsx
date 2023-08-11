import Navbar from 'components/@common/Navbar';
import { Title, TitleBox, Wrapper } from './MyPage.style';
import useAuth from 'hooks/useAuth';

const MyPage = () => {
  const { userLogout, userWithdraw } = useAuth();
  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => userLogout.mutate();
  const handleWithdraw: React.MouseEventHandler<HTMLButtonElement> = () => userWithdraw.mutate();
  return (
    <>
      <Wrapper>
        <TitleBox>
          <Title>마이페이지</Title>
        </TitleBox>
        <section>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
          <button type="button" onClick={handleWithdraw}>
            회원 탈퇴
          </button>
        </section>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default MyPage;

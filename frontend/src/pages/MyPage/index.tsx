import Navbar from 'components/@common/Navbar';
import { Title, TitleBox, UserInfoBox, Wrapper } from './MyPage.style';

const MyPage = () => {
  return (
    <>
      <Wrapper>
        <TitleBox>
          <Title>마이페이지</Title>
        </TitleBox>
        <UserInfoBox>
          <img src="" alt="프로필" />
          <div>
            <p>아이디</p>
            <p>가입일</p>
          </div>
        </UserInfoBox>

        <section>
          <div>
            <input id="current-plant" type="text" readOnly />
            <label htmlFor="current-plant">현재 키우는 식물</label>
          </div>
          <div>
            <input id="temp" type="text" readOnly />
            <label htmlFor="temp">가나다라 마바사</label>
          </div>
        </section>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default MyPage;

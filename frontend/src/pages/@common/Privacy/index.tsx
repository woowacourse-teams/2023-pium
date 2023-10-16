import { useNavigate } from 'react-router-dom';
import PageLogger from 'components/@common/PageLogger';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import { BackButton, Content, Header, Main, SubTitle, Title, Wrapper } from './Privacy.style';
import theme from 'style/theme.style';

const Privacy = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <PageLogger>
      <Wrapper>
        <Header>
          <BackButton onClick={goBack}>
            <SvgFill icon="line-arrow-left" aria-label="뒤로 가기" color={theme.color.sub} />
          </BackButton>
          <Title>Privacy Policy (개인정보 처리방침)</Title>
        </Header>
        <Main>
          <Content>
            <SubTitle>1. 개인정보 처리 방침</SubTitle>
            피움은(는) {`"`}개인정보 보호법{`"`} 제 30조에 따라 정보 주체의 개인정보를 보호하고 이와
            관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위해여 다음과 같이 개인 정보
            처리방침을 수립/공개합니다.
            <br />
            <br />
            “개인정보처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고
            서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미합니다.
            <br />
            <br />
            본 개인정보처리방침은 회사가 제공하는 피움 서비스(이하 ‘서비스’라 함)에 적용됩니다.
            <br />
            <br />
            회사의 개인정보 처리방침은 법령 및 고시 등의 변경 또는 회사의 약관 및 내부 정책에 따라
            변경될 수 있으며 이를 개정하는 경우 회사는 변경사항에 대하여 회사 홈페이지에 공지합니다.
            <br />
            <br />
            이용자는 개인정보의 수집, 이용, 제공, 위탁 등과 관련한 아래 사항에 대하여 원하지 않는
            경우 동의를 거부할 수 있습니다. 다만, 이용자가 동의를 거부하는 경우 서비스의 전부 또는
            일부를 이용할 수 없음을 알려드립니다.
          </Content>
          <Content>
            <SubTitle>2. 개인정보 수집</SubTitle>
            개인정보는 생존하는 개인에 관한 정보로서 이용자 개인을 식별할 수 있는 정보(당해
            정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는
            것을 포함)를 말합니다.
            <br />
            <br />
            회원 가입 시 또는 서비스 이용 과정에서 서비스 어플리케이션을 통해{' '}
            <strong>서비스 제공을 위해 필요한 최소한의 개인정보</strong>를 수집하고 있습니다.
            <ul>
              <li>
                <span>이용자</span>
                <ul>
                  <li>
                    <span>카카오 계정 가입 회원</span>
                    <ul>
                      <li>
                        <span>카카오 회원 번호, 이메일</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            개인정보를 수집하는 방법은 다음과 같습니다.
            <strong>
              개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하고
              있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.
            </strong>
            <ul>
              <li>
                회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접
                정보를 입력하는 경우
              </li>
              <li>서비스 이용 과정에서 이용자의 서비스 이용 관련 정보를 자동으로 수집하는 경우</li>
              <li>고객센터를 통한 상담 과정에서 고객 지원을 위해 이메일을 통해 수집하는 경우</li>
            </ul>
            <strong>서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.</strong>
            서비스 어플리케이션 이용 과정에서 단말기 정보(운영체제 종류, 디바이스 아이디, 폰기종,
            단말기 모델명), IP주소, 토큰, 서비스 이용 기록 등의 정보가 자동으로 생성되어 수집됩니다.
            디바이스 아이디의 경우, 서버와 통신시 악의적 사용을 막고 사용자를 구별하기 위해
            암호화하여 처리하고 있습니다.
            <strong>[구글 Firebase Analytics 를 이용한 앱로그 분석]</strong>
            회사는 구글에서 제공하는 앱 사용 분석 도구인 Firebase Analytics를 이용하고 있으며, 이
            경우 앱 사용 정보 외 개인을 식별할 수 있는 정보는 수집되지 않습니다. 이용자는 서비스
            내에 해제기능을 통하여 구글 Firebase Analytics 이용을 거부할 수 있습니다.
            <strong>[구글 Firebase Cloud Messaging을 통한 알림 서비스 구현 ]</strong>
            서비스는 구글에서 제공하는 푸시 서비스인 Firebase Cloud Messaging를 이용하고 있으며,
            이를 통해 사용자에게 알림을 제공하고 있습니다. 마이페이지에서 알림 거부 혹은 앱 자체에서
            알림 거부를 통해서 이용을 거부할 수 있습니다.
          </Content>
          <Content>
            <SubTitle> 3. 개인정보 이용</SubTitle>
            회원관리, 서비스 제공·개선, 신규 서비스 개발 등을 위해 이용합니다. 회원 가입 시 또는
            서비스 이용 과정에서 아래와 같이 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고
            있습니다.
            <ul>
              <li>회원 식별/가입의사 확인, 본인 확인, 부정이용 방지</li>
              <li>신규 서비스 개발, 다양한 서비스 제공, 문의사항 또는 불만처리, 공지사항 전달</li>
              <li>
                서비스의 원활한 운영에 지장을 주는 행위(계정 도용 및 부정 이용 행위 등 포함)에 대한
                방지 및 제재
              </li>
              <li>
                서비스 이용 기록, 접속 빈도 및 서비스 이용에 대한 통계, 프라이버시 보호 측면의
                서비스 환경 구축, 서비스 개선에 활용
              </li>
              <li>
                수집된 정보는 사용자에게 정보나 알림을 전달하거나 사용자 경험을 개선하기 위한
                목적으로 사용됩니다.
              </li>
              <li>
                정보는 사용자가 푸시 알림을 사용하는 동안 보유되며, 알림을 해제하는 순간 즉시
                파기합니다.
              </li>
            </ul>
          </Content>
          <Content>
            <SubTitle>4. 개인정보 제공 </SubTitle>
            피움은 이용자의 동의가 있지 않다면 사용자의 개인정보는 제3자와 공유되지 않으며, 오직
            서비스의 운영을 위한 목적으로만 사용됩니다.
          </Content>
          <Content>
            <SubTitle>5. 이용자의 권리와 선택</SubTitle>
            <ul>
              <li>
                만 14세 미만의 아동은 서비스 가입을 할 수 없으며, 서비스 이용 14세 미만인 것이
                인지된다면 해당 이용자의 가입을 해지할 수 있습니다.
              </li>
              <li>
                사용자는 푸시 알림을 받기 원하지 않는 경우, 알림 설정을 변경하거나 비활성화할 수
                있습니다.
              </li>
              <li>
                사용자는 개인정보에 대한 열람 및 삭제 요청을 할 수 있으며, 필요한 경우 관련 법률에
                따라 요청을 처리할 것입니다.
              </li>
              <li>
                이용자는 개인정보(수신 가능한 이메일 등)를 정확하게 입력하여 예기치 못한
                사고(계정분실, 장기미사용자 데이터 삭제 등)를 예방해 주시기 바랍니다. 이용자가
                입력한 부정확한 정보로 인해 발생하는 사고의 책임은 이용자 자신에게 있으며 타인
                정보의 도용 등 허위정보를 입력할 경우 서비스 회원 자격이 정지될 수 있습니다. 이용자
                개인정보와 관련한 아이디의 비밀번호에 대한 보안유지책임은 해당 이용자 자신에게
                있습니다. 비밀번호는 암화화되어 저장되기 때문에 서비스 운영자도 알 수 없습니다.
              </li>
            </ul>
          </Content>
          <Content>
            <SubTitle>6. 법적 요구사항</SubTitle>
            <ul>
              <li>
                서비스는 관련 법률 및 규정을 준수하고 사용자의 개인정보를 처리할 수 있으며, 법적
                의무를 이행할 수 있습니다.
              </li>
              <li>
                본 개인정보 처리 방침은 변경될 수 있으며, 변경 내용은 웹사이트나 애플리케이션 내에
                공지됩니다.
              </li>
              <li>
                본 개인정보 처리 방침은 변경될 수 있으며, 변경 내용은 웹사이트나 애플리케이션 내에
                공지됩니다.
              </li>
              <li>
                본 개인정보 처리 방침은 사용자의 개인정보 보호를 보장하기 위한 원칙을 반영하고
                있습니다.
              </li>
              <li>
                사용자의 개인정보에 대한 질문 또는 요청 사항이 있을 경우, 마이페이지 {'>'} 문의하기
                혹은 easyplantscheduler@gmail.com 을 통해 저희에게 문의해 주시기 바랍니다.
              </li>
            </ul>
          </Content>
          <Content>
            <SubTitle>7. 개인정보 보호책임자 또는 담당자의 이름 및 연락처</SubTitle>
            <strong>1조 (개인정보 보호책임자)</strong>
            고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련
            부서 및 개인정보관리책임자를 지정하고 있습니다. 개인정보와 관련하여 민원이나 문의가
            있으시면, 연락주시기 바랍니다. 성심성의껏 응대하겠습니다.
            <ul>
              <li>개인정보 책임자: xxx</li>
              <li>담당부서: xxxx팀</li>
              <li>
                이메일:{' '}
                <a href={`mailto: easyplantscheduler@gmail.com`}>easyplantscheduler@gmail.com</a>
              </li>
            </ul>
            회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자
            혹은 담당부서로 신고하실 수 있습니다. 회사는 이용자들의 신고사항에 대해 신속하게 충분한
            답변을 드릴 것입니다.
            <br />
            기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기
            바랍니다.
            <ol>
              <li>1.개인분쟁조정위원회 (www.1336.or.kr/1336)</li>
              <li>2.정보보호마크인증위원회 (www.eprivacy.or.kr/02-580-0533~4)</li>
              <li>3.대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr/02-3480-3600)</li>
              <li>4.경찰청 사이버테러대응센터(www.ctrc.go.kr/)</li>
            </ol>
          </Content>
          <Content>
            개인정보처리방침 공고일자: 2023년 10월 16일
            <br />
            개인정보처리방침 시행일자: 2023년 10월 23일
            <br />
            <br />
            <span>변경 이력</span>
            <ul>
              <li>2023년 10월 23일</li>
            </ul>
          </Content>
        </Main>
      </Wrapper>
    </PageLogger>
  );
};

export default Privacy;
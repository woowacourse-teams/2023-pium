import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;

  width: auto;
  height: 80px;
  margin-top: 32px;

  text-align: center;

  background: ${(props) => props.theme.color.background};
  border-bottom: solid 1px ${(props) => props.theme.color.gray};
`;

export const Title = styled.h1`
  width: 100%;
  font: 900 4rem/4.8rem NanumSquareRound;
  text-align: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;

  max-width: 800px; /* 컨테이너의 최대 너비 설정 */
  height: 100%;
  margin: 0 auto; /* 가운데 정렬 */
  padding: 20px; /* 내부 여백 설정 */

  font-family: Arial, sans-serif; /* 원하는 폰트 설정 */
  font-size: 16px; /* 본문 글꼴 크기 설정 */
  line-height: 1.6; /* 줄 간격 설정 */

  ul {
    margin: 0; /* ul의 왼쪽 여백 제거 */
    padding: 0; /* ul의 내부 여백 제거 */
    list-style: square inside; /* 목록 마커 스타일 설정 */
  }

  /* 현재 li의 스타일 설정 */
  li {
    position: relative; /* 상대 위치 설정 */

    margin: 10px 0; /* li 요소 사이의 간격 설정 */
    padding-left: 20px; /* 왼쪽 여백을 늘림 (가상 요소에 공간을 주기 위해) */

    font-weight: bold; /* 볼드체 텍스트 스타일 설정 */
    color: #333; /* 텍스트 색상 설정 */
  }

  li::marker {
    unicode-bidi: isolate;

    font-variant-numeric: tabular-nums;
    text-align: start !important;
    text-align-last: start !important;
    text-indent: 0px !important;
    text-transform: none;
  }
`;

/* 제목 스타일 */
export const SubTitle = styled.p`
  margin-bottom: 10px; /* 아래 여백 추가 */
  font-size: 24px; /* 원하는 제목 글꼴 크기 설정 */
  font-weight: bold; /* 볼드체 설정 */
`;

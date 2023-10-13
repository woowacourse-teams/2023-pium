/* eslint-disable react/no-unescaped-entities */
import {
  ButtonWrapper,
  ContentWrapper,
  GuideParagraph,
  IosGuide,
  Wrapper,
} from './InstallPrompt.style';
import useInstallApp from 'hooks/@common/useInstallApp';
import theme from 'style/theme.style';
import SvgFill from '../SvgIcons/SvgFill';

const InstallPrompt = () => {
  const { installApp, ignoreInstallApp, showPrompt, closePrompt } = useInstallApp();

  const isIos = /iPhone|iPod|iPad/i.test(navigator.userAgent);

  return (
    <>
      {showPrompt && (
        <Wrapper>
          <ContentWrapper>
            <SvgFill
              icon="close-circle"
              size={20}
              onClick={closePrompt}
              fill={theme.color.sub}
              aria-label="닫기"
            />
            <GuideParagraph>
              바로가기를 추가하시면 앱처럼 사용이 가능합니다. 추가하시겠습니까?
            </GuideParagraph>
          </ContentWrapper>
          {isIos ? (
            <IosGuide>
              하단 탭에 있는 <SvgFill icon="ios-share" size={16} fill={theme.color.sub} />{' '}
              아이콘에서 "홈 화면에 추가"를 통해 바로가기를 추가 할 수 있습니다.
            </IosGuide>
          ) : (
            <ButtonWrapper>
              <button type="button" onClick={ignoreInstallApp}>
                웹으로 볼게요
              </button>
              <button type="button" onClick={installApp}>
                바로가기 추가
              </button>
            </ButtonWrapper>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default InstallPrompt;

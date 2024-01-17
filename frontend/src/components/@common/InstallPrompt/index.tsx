/* eslint-disable react/no-unescaped-entities */
import { useMemo } from 'react';
import {
  ButtonWrapper,
  ContentWrapper,
  Guide,
  GuideParagraph,
  InfoButton,
  Wrapper,
} from './InstallPrompt.style';
import useInstallApp from 'hooks/@common/useInstallApp';
import theme from 'style/theme.style';
import FireFoxButton from 'assets/firefox_add_button.png';
import SvgFill from '../SvgIcons/SvgFill';

const InstallPrompt = () => {
  const { installApp, ignoreInstallApp, showPrompt, closePrompt } = useInstallApp();

  const isIos = /iPhone|iPod|iPad/i.test(navigator.userAgent);
  const isFireFox = /Firefox/i.test(navigator.userAgent);

  const promptGuide = useMemo(() => {
    if (isIos) {
      return (
        <Guide>
          <p>
            하단 탭에 있는 <SvgFill icon="ios-share" size={16} fill={theme.color.sub} /> 아이콘에서
            "홈 화면에 추가"를 통해 바로가기를 설치 할 수 있습니다.
          </p>
          <InfoButton type="button" onClick={ignoreInstallApp}>
            웹으로 볼게요
          </InfoButton>
        </Guide>
      );
    }

    // firefox에서는 beforeinstallPrompt를 제공하지 않기 때문에 따로 추가해줘야 합니다
    if (isFireFox) {
      return (
        <Guide>
          <img src={FireFoxButton} width={210} height={30} alt="파이어폭스 바로가기 추가" />
          <p>
            상단 탭에 있는 더보기를 클릭한 다음 '설치' 버튼을 통해 바로가기를 설치할 수 있습니다.
          </p>
          <InfoButton type="button" onClick={ignoreInstallApp}>
            웹으로 볼게요
          </InfoButton>
        </Guide>
      );
    }

    return (
      <ButtonWrapper>
        <InfoButton type="button" onClick={ignoreInstallApp}>
          웹으로 볼게요
        </InfoButton>
        <InfoButton type="button" onClick={installApp}>
          바로가기 추가
        </InfoButton>
      </ButtonWrapper>
    );
  }, [ignoreInstallApp, installApp, isFireFox, isIos]);

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
          {promptGuide}
        </Wrapper>
      )}
    </>
  );
};

export default InstallPrompt;

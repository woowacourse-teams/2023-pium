import { useCallback, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { BackButton, TransparentSensor, Wrapper } from './BackHeader.style';
import useToggle from 'hooks/@common/useToggle';
import theme from 'style/theme.style';
import SvgFill from '../SvgIcons/SvgFill';

interface BackHeaderProps extends PropsWithChildren {
  transparentHeight?: number;
}

const BackHeader = (props: BackHeaderProps) => {
  const { children, transparentHeight } = props;

  const navigate = useNavigate();
  const { isOn: isTop, on, off } = useToggle(false);

  const goBack = () => {
    navigate(-1);
  };

  const onChangeIntersection = (isIntersecting: boolean) => {
    if (!transparentHeight) return;

    if (isIntersecting) {
      on();
    } else {
      off();
    }
  };

  const intersectionRef = useCallback(<T extends Element>(instance: T | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting }) => {
        onChangeIntersection(isIntersecting);
      });
    });

    if (instance) observer.observe(instance);
  }, []);

  return (
    <>
      {createPortal(
        <TransparentSensor ref={intersectionRef} $height={`${transparentHeight}px`} />,
        document.body
      )}
      <Wrapper $transparent={isTop}>
        <BackButton onClick={goBack}>
          <SvgFill
            icon="line-arrow-left"
            aria-label="뒤로 가기"
            color={isTop ? theme.color.background : theme.color.sub}
          />
        </BackButton>
        {children}
      </Wrapper>
    </>
  );
};

export default BackHeader;

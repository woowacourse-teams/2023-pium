import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton, Wrapper } from './BackHeader.style';
import theme from 'style/theme.style';
import SvgFill from '../SvgIcons/SvgFill';

const BackHeader = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <BackButton onClick={goBack}>
        <SvgFill icon="line-arrow-left" aria-label="뒤로 가기" color={theme.color.sub} />
      </BackButton>
      {children}
    </Wrapper>
  );
};

export default BackHeader;

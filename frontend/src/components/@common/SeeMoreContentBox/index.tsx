import { Fragment } from 'react';
import { ContentBox, SeeMoreButton, SeeMoreButtonArea, Wrapper } from './SeeMoreContentBox.styles';
import useShowState from './hooks/useShowState';

interface SeeMoreContentBoxProps {
  children: string;
  maxHeight?: `${number}px`;
}

const SeeMoreContentBox = ({ children: content, maxHeight = '64px' }: SeeMoreContentBoxProps) => {
  const { showState, wrapperRef, showOver } = useShowState(maxHeight);
  const paragraphList = content.trim().split(/(?:\r?\n)+/);

  return (
    <Wrapper ref={wrapperRef} $maxHeight={maxHeight} $hiddenOver={showState === 'HIDDEN_OVER'}>
      <ContentBox $maxHeight={maxHeight} $hiddenOver={showState === 'HIDDEN_OVER'}>
        {paragraphList.shift()}
        {paragraphList.map((paragraph) => (
          <Fragment key={paragraph}>
            <br />
            <br />
            {paragraph}
          </Fragment>
        ))}
      </ContentBox>
      {showState === 'HIDDEN_OVER' && (
        <SeeMoreButtonArea>
          <SeeMoreButton onClick={showOver}>더보기</SeeMoreButton>
        </SeeMoreButtonArea>
      )}
    </Wrapper>
  );
};

export default SeeMoreContentBox;

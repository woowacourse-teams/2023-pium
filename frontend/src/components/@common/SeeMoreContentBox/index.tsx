import { Fragment } from 'react';
import useShowState from 'hooks/@common/useShowState';
import { ContentBox, SeeMoreButton, SeeMoreButtonArea, Wrapper } from './SeeMoreContentBox.styles';

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
        {paragraphList.map((paragraph, index) => (
          <Fragment key={paragraph}>
            {index !== 0 && <br />}
            <p>{paragraph}</p>
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

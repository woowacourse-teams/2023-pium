import { useState } from 'react';
import { ContentBox, SeeMoreButton, SeeMoreButtonArea, Wrapper } from './SeeMoreContentBox.styles';

interface SeeMoreContentBoxProps {
  children: string;
  maxHeight?: `${number}px`;
}

type ShowState = 'NOT_OVER' | 'HIDDEN_OVER' | 'SHOW_OVER';

const SeeMoreContentBox = ({ children: content, maxHeight = '64px' }: SeeMoreContentBoxProps) => {
  const [showState, setShowState] = useState<ShowState>('NOT_OVER');

  const paragraphList = content.trim().split(/(?:\r?\n)+/);

  const setInitialShow = (instance: HTMLDivElement | null) => {
    if (!instance) return;

    const maxHeightNumber = Number(maxHeight.slice(0, -2));
    console.log(instance.offsetHeight, maxHeightNumber);

    if (showState === 'NOT_OVER' && instance.offsetHeight > maxHeightNumber) {
      setShowState('HIDDEN_OVER');
    }
  };

  const showOver = () => {
    setShowState('SHOW_OVER');
  };

  return (
    <Wrapper ref={setInitialShow} maxHeight={maxHeight} hiddenOver={showState === 'HIDDEN_OVER'}>
      <ContentBox maxHeight={maxHeight} hiddenOver={showState === 'HIDDEN_OVER'}>
        {paragraphList.shift()}
        {paragraphList.map((paragraph) => (
          <>
            <br />
            <br />
            {paragraph}
          </>
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

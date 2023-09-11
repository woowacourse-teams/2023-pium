import useToggle from 'hooks/useToggle';
import { ContentArea, SeeMoreButton, SeeMoreButtonArea, Wrapper } from './SeeMoreContentBox.styles';

interface SeeMoreContentBoxProps {
  children: string;
  maxHeight?: `${number}px`;
}

const SeeMoreContentBox = ({ children: content, maxHeight = '64px' }: SeeMoreContentBoxProps) => {
  const { isOn: isSeeMore, on: seeMore } = useToggle();

  const paragraphList = content.trim().split(/(?:\r?\n)+/);

  const setInitialShow = (instance: HTMLDivElement | null) => {
    if (!instance) return;

    if (instance.offsetHeight < Number(maxHeight.slice(0, -2))) {
      seeMore();
    }
  };

  return (
    <Wrapper ref={setInitialShow} maxHeight={maxHeight} isSeeMore={isSeeMore}>
      <ContentArea isSeeMore={isSeeMore}>
        {paragraphList.shift()}
        {paragraphList.map((paragraph) => (
          <>
            <br />
            <br />
            {paragraph}
          </>
        ))}
      </ContentArea>
      {!isSeeMore && (
        <SeeMoreButtonArea>
          <SeeMoreButton onClick={seeMore}>더보기</SeeMoreButton>
        </SeeMoreButtonArea>
      )}
    </Wrapper>
  );
};

export default SeeMoreContentBox;

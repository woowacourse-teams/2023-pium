import { DaySpan, Wrapper } from './DaySmallBox.style';
import { convertDateKorYear } from 'utils/date';

interface DaySmallBoxProps {
  date?: number | string;
  isToday?: boolean;
  currentDate?: Date;
  clickHandler?: () => void;
  isInRange?: boolean;
}

const DaySmallBox = ({
  date,
  isToday = false,
  clickHandler,
  currentDate,
  isInRange = false,
}: DaySmallBoxProps) => {
  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      clickHandler?.();
    }
  };

  return (
    <Wrapper>
      {date && (
        <DaySpan
          isToday={isToday ?? undefined}
          role={clickHandler ? 'button' : 'none'}
          onClick={clickHandler}
          aria-label={`${currentDate ? convertDateKorYear(currentDate) : date}`}
          isInRange={isInRange}
          tabIndex={clickHandler && 0}
          onKeyDown={keyDownHandler}
        >
          {date}
        </DaySpan>
      )}
    </Wrapper>
  );
};

export default DaySmallBox;

import { DaySpan, Wrapper } from './DaySmallBox.style';
import { convertDateKorYear } from 'utils/date';

interface DaySmallBoxProps {
  date?: number | string;
  isToday?: boolean;
  isSelected?: boolean;
  currentDate?: Date;
  clickHandler?: () => void;
  isInRange?: boolean;
}

const DaySmallBox = ({
  date,
  isToday = false,
  isSelected,
  clickHandler,
  currentDate,
  isInRange = false,
}: DaySmallBoxProps) => {
  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      clickHandler?.();
    }
  };

  const ariaLabel = currentDate ? convertDateKorYear(currentDate) : date?.toString();

  return (
    <Wrapper>
      {date && (
        <DaySpan
          $isToday={isToday ?? null}
          $isSelected={Boolean(isSelected)}
          role={clickHandler ? 'button' : 'none'}
          onClick={clickHandler}
          aria-label={ariaLabel}
          $isInRange={isInRange}
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

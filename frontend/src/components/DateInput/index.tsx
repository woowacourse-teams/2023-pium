import { useId } from 'react';
import { Date, Wrapper, DateValue } from './DateInput.style';
import { getToday, convertDateKorYear } from 'utils/date';

interface DateInputProps {
  date: string;
  onChange?: (date: string) => void;
}

const DateInput = ({ date, onChange }: DateInputProps) => {
  const today = getToday();
  const dateId = useId();

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    if (value > today) {
      return;
    }

    onChange?.(value);
  };

  return (
    <Wrapper>
      <DateValue htmlFor={dateId}>{convertDateKorYear(date)}</DateValue>
      <Date id={dateId} type="date" value={date} onChange={changeHandler} max={today} />
    </Wrapper>
  );
};

export default DateInput;

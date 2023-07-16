import { useId, useState } from 'react';
import { getToday, convertDateKorYear } from 'utils/date';
import { Date, Wrapper, DateValue } from './DateInput.style';

interface DateInputProps {
  initialValue: string;
}

const DateInput = ({ initialValue }: DateInputProps) => {
  const [date, setDate] = useState(initialValue);
  const today = getToday();
  const dateId = useId();

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    if (value > today) {
      setDate(today);
      return;
    }

    setDate(value);
  };

  return (
    <Wrapper>
      <DateValue htmlFor={dateId}>{convertDateKorYear(date)}</DateValue>
      <Date id={dateId} type="date" value={date} onChange={changeHandler} max={today} />
    </Wrapper>
  );
};

export default DateInput;

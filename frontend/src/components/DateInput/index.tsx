import { useState } from 'react';
import { getToday, convertDateKorYear } from 'utils/date';
import { Date, Wrapper, DateValue } from './DateInput.style';

interface DateInputProps {
  initialValue: string;
}

const DateInput = ({ initialValue }: DateInputProps) => {
  const [date, setDate] = useState(initialValue);
  const today = getToday();

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
      <DateValue htmlFor="date-input">{convertDateKorYear(date)}</DateValue>
      <Date name="date-input" type="date" value={date} onChange={changeHandler} max={today} />
    </Wrapper>
  );
};

export default DateInput;

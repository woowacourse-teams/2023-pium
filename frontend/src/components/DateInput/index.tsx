import { useState } from 'react';
import { getToday, convertDateKorYear } from 'utils/date';
import { Date, Wrapper, DateValue } from './DateInput.style';

const DateInput = () => {
  const [date, setDate] = useState(getToday());

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setDate(value);
  };

  return (
    <Wrapper>
      <DateValue htmlFor="date-input">{convertDateKorYear(date)}</DateValue>
      <Date name="date-input" type="date" value={date} onChange={changeHandler} max={getToday()} />
    </Wrapper>
  );
};

export default DateInput;

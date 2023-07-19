import { useState } from 'react';
import { getToday } from 'utils/date';

const useDateInput = () => {
  const today = getToday();
  const [date, setDate] = useState(today);
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setDate(value > today ? today : value);
  };

  return { date, today, changeHandler };
};

export default useDateInput;

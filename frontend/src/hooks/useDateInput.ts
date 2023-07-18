import { useState } from 'react';
import { getToday } from 'utils/date';

const useDateInput = () => {
  const today = getToday();
  const [date, setDate] = useState(today);
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    if (value > today) {
      setDate(today);
      return;
    }

    setDate(value);
  };

  return { date, today, changeHandler };
};

export default useDateInput;

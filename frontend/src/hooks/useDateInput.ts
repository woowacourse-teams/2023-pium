import { useState } from 'react';
import { getDateToString, isDateFormat } from 'utils/date';

const useDateInput = () => {
  const today = getDateToString();
  const [date, setDate] = useState(today);
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    if (!isDateFormat(value)) return;

    setDate(value > today ? today : value);
  };

  return { date, today, changeHandler };
};

export default useDateInput;

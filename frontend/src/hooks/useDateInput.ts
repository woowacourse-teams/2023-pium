import { useState } from 'react';
import { getDateToString, isDateFormat } from 'utils/date';
import useAddToast from './useAddToast';

const useDateInput = () => {
  const today = getDateToString();
  const [date, setDate] = useState(today);
  const addToast = useAddToast();

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    if (!isDateFormat(value)) {
      addToast('error', '올바른 날짜 형식이 아니에요.');
      return;
    }

    setDate(value > today ? today : value);
  };

  return { date, today, changeHandler };
};

export default useDateInput;

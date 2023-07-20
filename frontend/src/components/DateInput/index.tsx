import { useId } from 'react';
import { Date, Wrapper, DateValue } from './DateInput.style';
import { getToday, convertDateKorYear } from 'utils/date';

interface DateInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const DateInput = ({ value, onChange, placeholder = '날짜를 입력해 주세요' }: DateInputProps) => {
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
      <DateValue htmlFor={dateId} placeholder={value === ''}>
        {value ? convertDateKorYear(value) : placeholder}
      </DateValue>
      <Date id={dateId} type="date" onChange={changeHandler} />
    </Wrapper>
  );
};

export default DateInput;

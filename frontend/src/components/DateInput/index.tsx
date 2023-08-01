import { useId } from 'react';
import { Date, Wrapper, DateValue } from './DateInput.style';
import { convertDateKorYear } from 'utils/date';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  changeCallback?: (value: string) => void;
}

const DateInput = (props: DateInputProps) => {
  const { value, changeCallback, placeholder = '날짜를 입력해 주세요', min, max } = props;
  const dateId = useId();

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    changeCallback?.(value);
  };

  return (
    <Wrapper>
      <DateValue htmlFor={dateId} $placeholder={value === ''}>
        {value ? convertDateKorYear(value) : placeholder}
      </DateValue>
      <Date
        id={dateId}
        type="date"
        onChange={changeHandler}
        min={min}
        max={max}
        aria-label={props['aria-label']}
      />
    </Wrapper>
  );
};

export default DateInput;

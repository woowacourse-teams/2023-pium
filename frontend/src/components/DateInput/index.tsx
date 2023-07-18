import { InputHTMLAttributes, useId } from 'react';
import { Date, Wrapper, DateValue } from './DateInput.style';
import { convertDateKorYear } from 'utils/date';

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
}

const DateInput = (props: DateInputProps) => {
  const { value, ...childrenProps } = props;
  const dateId = useId();

  return (
    <Wrapper>
      <DateValue htmlFor={dateId}>{convertDateKorYear(value)}</DateValue>
      <Date id={dateId} type="date" {...childrenProps} />
    </Wrapper>
  );
};

export default DateInput;

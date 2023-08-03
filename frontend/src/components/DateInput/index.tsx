import Calendar from 'components/@common/Calendar';
import Modal from 'components/@common/Modal';
import { Wrapper, DateValue } from './DateInput.style';
import useModal from 'hooks/useModal';
import { convertDateKorYear, getStringToDate } from 'utils/date';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  changeCallback?: (value: string) => void;
  validator?: (value: string) => boolean;
}

const DateInput = (props: DateInputProps) => {
  const {
    value = '',
    changeCallback,
    placeholder = '날짜를 입력해 주세요',
    min,
    max,
    validator,
  } = props;
  const { isOpen, on, off } = useModal();

  const dateCallbackHandler = (value: string) => {
    if (validator && !validator(value)) return;

    changeCallback?.(value);
    off();
  };

  return (
    <Wrapper>
      <DateValue $placeholder={value === ''} onClick={on}>
        {value ? convertDateKorYear(value) : placeholder}
      </DateValue>
      <Modal isOpen={isOpen} closeModal={off}>
        <Calendar
          currentDate={getStringToDate(value === '' ? null : value)}
          dateCallback={dateCallbackHandler}
          min={min}
          max={max}
        />
      </Modal>
    </Wrapper>
  );
};

export default DateInput;

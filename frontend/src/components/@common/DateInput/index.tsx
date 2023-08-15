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
  const { isOpen, open, close, modalRef } = useModal();

  const dateCallbackHandler = (value: string) => {
    if (validator && !validator(value)) return;

    changeCallback?.(value);
    close();
  };

  return (
    <Wrapper>
      <DateValue
        type="button"
        aria-label={props['aria-label']}
        $placeholder={value === ''}
        onClick={open}
      >
        {value ? convertDateKorYear(value) : placeholder}
      </DateValue>
      <Modal isOpen={isOpen} ref={modalRef} closeModal={close}>
        <Calendar
          selectedDate={value === '' ? null : getStringToDate(value)}
          dateCallback={dateCallbackHandler}
          min={min}
          max={max}
        />
      </Modal>
    </Wrapper>
  );
};

export default DateInput;

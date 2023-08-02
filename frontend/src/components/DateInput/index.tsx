import Calendar from 'components/@common/Calendar';
import Modal from 'components/@common/Modal';
import { Wrapper, DateValue } from './DateInput.style';
import useModal from 'hooks/useModal';
import useToast from 'hooks/useToast';
import { convertDateKorYear, getStringToDate } from 'utils/date';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  changeCallback?: (value: string) => boolean;
}

const DateInput = (props: DateInputProps) => {
  const { value = '', changeCallback, placeholder = '날짜를 입력해 주세요', min, max } = props;
  const { isOpen, on, off } = useModal();
  const { addToast } = useToast();

  const dateCallbackHandler = (value: string) => {
    if (changeCallback?.(value)) {
      off();
      return;
    }

    addToast('warning', '범위 내 날짜가 아닙니다');
  };

  console.log(min, max);

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

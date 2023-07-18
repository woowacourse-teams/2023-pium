import { InputHTMLAttributes } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import { Input, Wrapper } from './FormInput.style';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChangeCallback: React.ChangeEventHandler<HTMLInputElement>;
  nextCallback?: () => void;
}

const FormInput = (props: FormInputProps) => {
  const { nextCallback, onChangeCallback, ...inputProps } = props;

  return (
    <Wrapper>
      <Input {...inputProps} onChange={onChangeCallback} />
      {nextCallback && <GrLinkNext size={20} onClick={nextCallback} />}
    </Wrapper>
  );
};

export default FormInput;

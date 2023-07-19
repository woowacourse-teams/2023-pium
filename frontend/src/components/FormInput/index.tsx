import { InputHTMLAttributes } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import { Input, Wrapper } from './FormInput.style';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  nextCallback?: () => void;
}

const FormInput = (props: FormInputProps) => {
  const { nextCallback, ...inputProps } = props;

  return (
    <Wrapper>
      <Input type="text" {...inputProps} />
      {nextCallback && <GrLinkNext size={20} onClick={nextCallback} />}
    </Wrapper>
  );
};

export default FormInput;

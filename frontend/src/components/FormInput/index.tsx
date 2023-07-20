import { InputHTMLAttributes } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import { Button, Input, Wrapper } from './FormInput.style';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  nextCallback?: () => void;
}

const FormInput = (props: FormInputProps) => {
  const { nextCallback, ...inputProps } = props;

  return (
    <Wrapper>
      <Input type="text" {...inputProps} />
      <Button>{nextCallback && <GrLinkNext size={16} onClick={nextCallback} />}</Button>
    </Wrapper>
  );
};

export default FormInput;

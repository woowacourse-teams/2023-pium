import { InputHTMLAttributes } from 'react';
import ArrowRight from 'components/@common/Icons/ArrowRight';
import { Button, Input, Wrapper } from './FormInput.style';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  nextCallback?: () => void;
}

const FormInput = (props: FormInputProps) => {
  const { nextCallback, ...inputProps } = props;

  return (
    <Wrapper>
      <Input type="text" {...inputProps} />
      <Button>
        {nextCallback && <ArrowRight width={20} height={20} onClick={nextCallback} />}
      </Button>
    </Wrapper>
  );
};

export default FormInput;

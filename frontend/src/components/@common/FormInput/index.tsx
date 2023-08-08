import { InputHTMLAttributes } from 'react';
import ArrowRight from 'components/@common/Icons/ArrowRightAlt';
import { Button, Input, Wrapper } from './FormInput.style';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  nextCallback?: () => void;
}

const FormInput = (props: FormInputProps) => {
  const { nextCallback, ...inputProps } = props;

  return (
    <Wrapper>
      <Input type="text" {...inputProps} />
      {nextCallback && (
        <Button type="button" aria-label="입력 완료" onClick={nextCallback}>
          <ArrowRight width={20} height={20} />
        </Button>
      )}
    </Wrapper>
  );
};

export default FormInput;

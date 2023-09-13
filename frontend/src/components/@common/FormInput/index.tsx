import { InputHTMLAttributes } from 'react';
import SvgIcons from 'components/@common/SvgIcons/SvgFill';
import { Button, Input, Wrapper } from './FormInput.style';
import theme from 'style/theme.style';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  nextCallback?: () => void;
}

const FormInput = (props: FormInputProps) => {
  const { nextCallback, ...inputProps } = props;

  return (
    <Wrapper>
      <Input type="text" {...inputProps} />
      {nextCallback && (
        <Button type="button" aria-label="입력 완료" onClick={nextCallback}>
          <SvgIcons icon="arrow-right-alt" size={20} color={theme.color.sub} />
        </Button>
      )}
    </Wrapper>
  );
};

export default FormInput;

import { PropsWithChildren } from 'react';
import { InputBox, RequireFlag, Title, Wrapper } from './FormInputBox.style';

interface FormInputBoxProps extends PropsWithChildren {
  title: string;
  require: boolean;
}

const FormInputBox = ({ children, title, require = false }: FormInputBoxProps) => {
  return (
    <Wrapper>
      <Title>
        {title}
        <RequireFlag>{require ? '*' : ''}</RequireFlag>
      </Title>
      <InputBox>{children}</InputBox>
      <span></span>
    </Wrapper>
  );
};

export default FormInputBox;

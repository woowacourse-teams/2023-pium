import { InputStatus } from 'types/inputs';
import { PropsWithChildren } from 'react';
import {
  ContentBox,
  ErrorMessage,
  InputBox,
  RequireFlag,
  Title,
  Wrapper,
} from './FormInputBox.style';

interface FormInputBoxProps extends PropsWithChildren {
  title: string;
  require: boolean;
  status: InputStatus;
  error?: string;
}

const FormInputBox = ({
  children,
  title,
  require = false,
  status = 'default',
  error,
}: FormInputBoxProps) => {
  return (
    <Wrapper>
      <ContentBox status={status}>
        <Title>
          {title}
          <RequireFlag>{require ? '*' : ''}</RequireFlag>
        </Title>
        <InputBox>{children}</InputBox>
      </ContentBox>
      {status === 'error' && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  );
};

export default FormInputBox;

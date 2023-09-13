import type { PropsWithChildren } from 'react';
import {
  ContentBox,
  ErrorMessage,
  InputBox,
  RequireFlag,
  Title,
  Wrapper,
} from './FormInputBox.style';

export type InputStatus = 'default' | 'focus' | 'error';

interface FormInputBoxProps extends PropsWithChildren {
  title: string;
  required?: boolean;
  status?: InputStatus;
  error?: string;
}

const FormInputBox = ({
  children,
  title,
  required = false,
  status = 'default',
  error,
}: FormInputBoxProps) => {
  return (
    <Wrapper>
      <ContentBox status={status}>
        <Title>
          {title}
          <RequireFlag>{required ? '*' : ''}</RequireFlag>
        </Title>
        <InputBox>{children}</InputBox>
      </ContentBox>
      <ErrorMessage>{status === 'error' && error}&nbsp;</ErrorMessage>
    </Wrapper>
  );
};

export default FormInputBox;

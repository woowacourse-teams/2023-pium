import { PropsWithChildren } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import { InputBox, RequireFlag, Title, Wrapper } from './FormInputBox.style';

interface FormInputBoxProps extends PropsWithChildren {
  title: string;
  require: boolean;
}

const FormInputBox = ({ children, title, require = false }: FormInputBoxProps) => {
  const nextHandler = () => {
    console.log('next clicked');
  };

  return (
    <Wrapper>
      <Title>
        {title}
        <RequireFlag>{require ? '*' : ''}</RequireFlag>
      </Title>
      <InputBox>
        {children}
        <button type="button" onClick={nextHandler}>
          <GrLinkNext size={20} />
        </button>
      </InputBox>
    </Wrapper>
  );
};

export default FormInputBox;

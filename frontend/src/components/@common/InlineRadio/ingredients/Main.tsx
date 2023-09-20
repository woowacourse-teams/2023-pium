import { Wrapper } from './Main.style';
import RadioProvider, { RadioProviderProps } from 'contexts/radioContext';

const Main = (props: RadioProviderProps) => {
  const { value, setValue, children, name } = props;

  return (
    <RadioProvider value={value} setValue={setValue} name={name}>
      <Wrapper>{children}</Wrapper>
    </RadioProvider>
  );
};

export default Main;

import { createContext, useContext } from 'react';

interface RadioProps {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export type RadioProviderProps = RadioProps & React.PropsWithChildren;

const RadioContext = createContext<RadioProps | null>(null);

export const useRadioContext = () => {
  const value = useContext(RadioContext);

  if (!value) throw new Error('컴포넌트가 RadioProvider의 자손이 아닙니다!');

  return value;
};

const RadioProvider = (props: RadioProviderProps) => {
  const { value, setValue, name, children } = props;

  return (
    <RadioContext.Provider value={{ value, setValue, name }}>{children}</RadioContext.Provider>
  );
};

export default RadioProvider;

import { createContext } from 'react';

interface RadioProps {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export type RadioProviderProps = RadioProps & React.PropsWithChildren;

export const RadioContext = createContext<RadioProps | null>(null);

const RadioProvider = (props: RadioProviderProps) => {
  const { value, setValue, name, children } = props;

  return (
    <RadioContext.Provider value={{ value, setValue, name }}>{children}</RadioContext.Provider>
  );
};

export default RadioProvider;

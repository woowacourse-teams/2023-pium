import { createContext } from 'react';

interface StackIndex {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  size: number;
}

export const StackContext = createContext<StackIndex | null>(null);

type StackProviderProps = StackIndex & React.PropsWithChildren;

const StackProvider = (props: StackProviderProps) => {
  const { index, setIndex, size, children } = props;

  return (
    <StackContext.Provider value={{ index, setIndex, size }}>{children}</StackContext.Provider>
  );
};

export default StackProvider;

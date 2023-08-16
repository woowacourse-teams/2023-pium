import { createContext } from 'react';

export interface ResetErrorBoundaryContextProps {
  reset: () => void;
}

export const ResetErrorBoundaryContext = createContext<ResetErrorBoundaryContextProps | null>(null);

const ResetErrorBoundaryProvider = (
  props: React.PropsWithChildren<ResetErrorBoundaryContextProps>
) => {
  const { children, reset } = props;

  return (
    <ResetErrorBoundaryContext.Provider value={{ reset }}>
      {children}
    </ResetErrorBoundaryContext.Provider>
  );
};

export default ResetErrorBoundaryProvider;

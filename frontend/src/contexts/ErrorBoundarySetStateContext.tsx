import { createContext } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from 'components/@common/ErrorBoundary';

export interface ErrorBoundarySetStateContextProps {
  setState: React.Component<ErrorBoundaryProps, ErrorBoundaryState>['setState'];
}

export const ErrorBoundarySetStateContext = createContext<ErrorBoundarySetStateContextProps | null>(
  null
);

const ErrorBoundarySetStateProvider = (
  props: React.PropsWithChildren<ErrorBoundarySetStateContextProps>
) => {
  const { children, setState } = props;

  return (
    <ErrorBoundarySetStateContext.Provider value={{ setState }}>
      {children}
    </ErrorBoundarySetStateContext.Provider>
  );
};

export default ErrorBoundarySetStateProvider;

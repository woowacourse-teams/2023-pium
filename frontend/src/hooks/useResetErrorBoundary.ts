import { useCallback, useContext } from 'react';
import { ErrorBoundarySetStateContext } from 'contexts/ErrorBoundarySetStateContext';
import { ERROR } from 'constants/index';

const useResetErrorBoundary = () => {
  const context = useContext(ErrorBoundarySetStateContext);

  if (context === null) throw new Error(ERROR.errorBoundaryContext);

  const { setState } = context;

  const resetErrorBoundary = useCallback(() => {
    setState({ error: null });
  }, [setState]);

  return resetErrorBoundary;
};

export default useResetErrorBoundary;

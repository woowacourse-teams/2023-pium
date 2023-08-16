import { useContext } from 'react';
import { ResetErrorBoundaryContext } from 'contexts/resetErrorBoundaryContext';
import { ERROR } from 'constants/index';

/**
 * 이 훅을 사용하는 컴포넌트를 fallback으로 가지는 ErrorBoundary의 에러 상태를 초기화합니다.
 * @returns ErrorBoundary를 초기화하는 콜백 함수
 */
const useResetErrorBoundary = () => {
  const context = useContext(ResetErrorBoundaryContext);

  if (context === null) throw new Error(ERROR.errorBoundaryContext);

  const { reset } = context;

  return reset;
};

export default useResetErrorBoundary;

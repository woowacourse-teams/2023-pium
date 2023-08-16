import { Component } from 'react';
import ErrorBoundarySetStateProvider from 'contexts/ErrorBoundarySetStateContext';
import StatusError from '../../../models/statusError';

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  statusCode?: StatusError['statusCode'];
}

export interface ErrorBoundaryState {
  error: Error | StatusError | null;
  statusCode?: StatusError['statusCode'];
}

class ErrorBoundary extends Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error | StatusError) {
    if (error instanceof StatusError) {
      return {
        error,
        statusCode: error.statusCode,
      };
    }

    return { error };
  }

  render() {
    const { children, fallback, statusCode: statusCodeProps } = this.props;
    const { error, statusCode } = this.state;

    if (statusCodeProps && statusCodeProps !== statusCode && error !== null) {
      throw error;
    }

    const setStateFunction = this.setState.bind(this);
    return (
      <ErrorBoundarySetStateProvider setState={setStateFunction}>
        {error === null ? children : fallback}
      </ErrorBoundarySetStateProvider>
    );
  }
}

export default ErrorBoundary;

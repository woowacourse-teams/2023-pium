import React from 'react';
import StatusError from 'apis/statusError';

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  statusCode?: number;
}

interface ErrorBoundaryState {
  error: Error | StatusError | null;
  statusCode?: number;
}

class ErrorBoundary extends React.Component<
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

    if (statusCodeProps !== statusCode && error !== null) throw error;

    return error !== null ? fallback : children;
  }
}

export default ErrorBoundary;

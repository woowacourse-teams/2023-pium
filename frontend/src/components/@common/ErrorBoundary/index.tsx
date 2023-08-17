import { Component } from 'react';
import ResetErrorBoundaryProvider from 'contexts/resetErrorBoundaryContext';
import StatusError from 'models/statusError';

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  statusCode?: StatusError['statusCode'];
}

export interface ErrorBoundaryState {
  error: Error | StatusError | null;
  statusCode: StatusError['statusCode'] | null;
}

class ErrorBoundary extends Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = {
      error: null,
      statusCode: null,
    };
    this.reset = this.reset.bind(this);
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

  reset() {
    this.setState({
      error: null,
      statusCode: null,
    });
  }

  render() {
    const { children, fallback, statusCode: statusCodeProps } = this.props;
    const { error, statusCode } = this.state;

    if (statusCodeProps && statusCodeProps !== statusCode && error !== null) {
      throw error;
    }

    return (
      <ResetErrorBoundaryProvider reset={this.reset}>
        {error === null ? children : fallback}
      </ResetErrorBoundaryProvider>
    );
  }
}

export default ErrorBoundary;

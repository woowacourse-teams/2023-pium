interface StatusErrorProps {
  statusCode: number;
  message?: string;
  errorResponse?: Response;
}

class StatusError extends Error {
  statusCode: number;
  errorResponse: Response | undefined;

  constructor(props: StatusErrorProps) {
    super(props.message);
    this.name = 'HTTPStatusError';
    this.statusCode = props.statusCode;
    this.errorResponse = props.errorResponse;
  }
}

export default StatusError;

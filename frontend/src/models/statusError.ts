interface StatusErrorProps {
  statusCode: number;
  message?: string;
}

class StatusError extends Error {
  statusCode: number;

  constructor(props: StatusErrorProps) {
    super(props.message);
    this.name = 'HTTPStatusError';
    this.statusCode = props.statusCode;
  }
}

export default StatusError;

import { CircleSpinner } from './Spinner.style';
import theme from 'style/theme.style';

interface SpinnerProps {
  diameter?: string;
  spinnerWidth?: string;
  color?: string;
}

const LoadingSpinner = (props: SpinnerProps) => {
  const { diameter, spinnerWidth, color } = props;

  return (
    <CircleSpinner
      style={{
        width: diameter ?? '77px',
        height: diameter ?? '77px',
        borderWidth: spinnerWidth ?? '7px',
        borderTopColor: color ?? theme.color.primary,
      }}
    />
  );
};

export default LoadingSpinner;
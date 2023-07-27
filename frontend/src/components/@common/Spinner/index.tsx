import theme from '../../../style/theme.style';
import { CircleSpinner } from './Spinner.style';

interface SpinnerProps {
  diameter?: string;
  spinnerWidth?: string;
  color?: string;
}

const Spinner = (props: SpinnerProps) => {
  const { diameter, spinnerWidth, color } = props;

  return (
    <CircleSpinner
      aria-label="로딩중"
      style={{
        width: diameter ?? '77px',
        height: diameter ?? '77px',
        borderWidth: spinnerWidth ?? '7px',
        borderTopColor: color ?? theme.color.primary,
      }}
    />
  );
};

export default Spinner;

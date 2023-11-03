import { Loader, Wrapper } from './Spinner.style';

interface SpinnerProps {
  size?: string;
}

const Spinner = ({ size = '40' }: SpinnerProps) => {
  return (
    <Wrapper>
      <Loader $size={size} />
    </Wrapper>
  );
};

export default Spinner;

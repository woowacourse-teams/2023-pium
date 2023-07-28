import { Bar, Wrapper } from './ProgressBar.style';

interface ProgressBarProps {
  percentage: number;
  width?: string;
  height?: string;
  color?: string;
}

const ProgressBar = (props: ProgressBarProps) => {
  const { percentage, width, height, color } = props;
  const barWidth = Math.min(Math.max(percentage, 0), 100);

  return (
    <Wrapper $height={height} $width={width}>
      <Bar $color={color} $percentage={barWidth} />
    </Wrapper>
  );
};

export default ProgressBar;

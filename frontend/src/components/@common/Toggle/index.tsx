import { Circle, ToggleBtn, Wrapper } from './Toggle.style';
import useToggle from 'hooks/@common/useToggle';

interface ToggleProps {
  width?: number;
  height?: number;
  initialState?: boolean;
  toggleOnCallback?: () => void;
  toggleOffCallback?: () => void;
  disabled?: boolean;
}

const Toggle = ({
  width = 130,
  height = 50,
  initialState = true,
  toggleOnCallback,
  toggleOffCallback,
  disabled = false,
}: ToggleProps) => {
  const { isOn, toggle } = useToggle(initialState);

  const toggleHandler = () => {
    toggle();

    if (isOn) {
      toggleOffCallback && toggleOffCallback();
      return;
    }

    if (!isOn) {
      toggleOnCallback && toggleOnCallback();
    }
  };

  return (
    <Wrapper>
      <ToggleBtn
        onClick={toggleHandler}
        on={isOn}
        width={width}
        height={height}
        disabled={disabled}
      >
        <Circle on={isOn} width={width} height={height} />
      </ToggleBtn>
    </Wrapper>
  );
};

export default Toggle;

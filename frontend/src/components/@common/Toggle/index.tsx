import { useCallback } from 'react';
import { Circle, ToggleBtn, Wrapper } from './Toggle.style';

interface ToggleProps {
  width?: number;
  height?: number;
  state: boolean;
  toggleOnCallback?: () => void;
  toggleOffCallback?: () => void;
  disabled?: boolean;
}

const Toggle = ({
  width = 130,
  height = 50,
  state,
  toggleOnCallback,
  toggleOffCallback,
  disabled = false,
}: ToggleProps) => {
  const toggleHandler = useCallback(() => {
    if (state) {
      toggleOffCallback && toggleOffCallback();
    } else {
      toggleOnCallback && toggleOnCallback();
    }
  }, [state]);

  return (
    <Wrapper>
      <ToggleBtn
        onClick={toggleHandler}
        $on={state && !disabled}
        width={width}
        height={height}
        disabled={disabled}
      >
        <Circle $on={state && !disabled} width={width} height={height} />
      </ToggleBtn>
    </Wrapper>
  );
};

export default Toggle;

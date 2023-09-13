import { useId, useState } from 'react';
import SvgIcons from 'components/@common/SvgIcons/SvgFill';
import { Input, Label } from './CheckBox.style';
import theme from 'style/theme.style';

interface CheckBoxProps {
  isChecked?: boolean;

  checkedCallback?: () => void;
}

const CheckBox = ({ isChecked = false, checkedCallback }: CheckBoxProps) => {
  const [checked, setChecked] = useState(isChecked);
  const id = useId();

  const checkHandler = () => {
    setChecked((prev) => !prev);
    if (!checked) {
      // true인 경우에 실행되는 메서드
      checkedCallback && checkedCallback();
    }
  };

  return (
    <Label htmlFor={id}>
      <Input type="checkbox" id={id} />
      {checked ? (
        <SvgIcons
          icon="checkbox-fill"
          onClick={checkHandler}
          size={24}
          color={theme.color.primary}
        />
      ) : (
        <SvgIcons
          icon="checkbox-empty"
          onClick={checkHandler}
          size={24}
          color={theme.color.grayLight}
        />
      )}
    </Label>
  );
};

export default CheckBox;

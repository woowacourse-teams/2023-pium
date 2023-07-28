import { useId, useState } from 'react';
import { CSSProp } from 'styled-components';
import { Input, Label } from './CheckBox.style';
import CheckBoxEmpty from '../Icons/CheckBoxEmpty';
import CheckboxFill from '../Icons/CheckBoxFill';

interface CheckBoxProps {
  isChecked?: boolean;
  fillStyle?: CSSProp;
  emptyStyle?: CSSProp;
  checkedCallback?: () => void;
}

const CheckBox = ({ isChecked = false, fillStyle, emptyStyle, checkedCallback }: CheckBoxProps) => {
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
      <Input type={'checkbox'} id={id} />
      {checked ? (
        <CheckboxFill onClick={checkHandler} customCSS={fillStyle} />
      ) : (
        <CheckBoxEmpty onClick={checkHandler} customCSS={emptyStyle} />
      )}
    </Label>
  );
};

export default CheckBox;

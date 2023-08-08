import { useId } from 'react';
import { HiddenRadio, Label } from './Option.style';
import { useRadioContext } from 'hooks/useRadioContext';

interface OptionProps {
  value: string;
}

const Option = (props: OptionProps) => {
  const { value } = props;
  const { value: contextValue, setValue, name } = useRadioContext();
  const id = useId();

  return (
    <Label htmlFor={id}>
      <HiddenRadio
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={value === contextValue}
        onChange={() => setValue(value)}
      />
      <span>{value}</span>
    </Label>
  );
};

export default Option;

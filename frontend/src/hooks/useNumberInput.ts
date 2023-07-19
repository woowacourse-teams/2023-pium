import { useState } from 'react';
import { inputValidate } from 'utils/validate';

interface NumberInputProps {
  maxRange?: number;
  minRange?: number;
}

const useNumberInput = ({ maxRange, minRange }: NumberInputProps) => {
  const [numberValue, setNumberValue] = useState<number | ''>('');
  const { checkNumber, checkRange, checkECode } = inputValidate;

  const changeCallback: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    if (value === '') {
      setNumberValue('');
      return;
    }

    if (!checkNumber(value)) return; // 여기서 에러 값 업데이트
    if (!checkRange(Number(value), minRange, maxRange)) return; // 여기서 에러 값 업데이트

    setNumberValue(Number(value));
  };
  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    checkECode(e.key) && e.preventDefault();
  };

  return { numberValue, changeCallback, keyDownHandler };
};

export default useNumberInput;

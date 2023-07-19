import { useContext } from 'react';
import { RadioContext } from 'contexts/radioContext';
import { ERROR } from 'constants/index';

export const useRadioContext = () => {
  const value = useContext(RadioContext);

  if (!value) throw new Error(ERROR.radioContext);

  return value;
};

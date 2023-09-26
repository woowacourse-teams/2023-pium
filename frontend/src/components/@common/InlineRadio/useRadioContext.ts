import { useContext } from 'react';
import { RadioContext } from 'components/@common/InlineRadio/radioContext';
import { ERROR } from 'constants/index';

export const useRadioContext = () => {
  const value = useContext(RadioContext);

  if (!value) throw new Error(ERROR.radioContext);

  return value;
};

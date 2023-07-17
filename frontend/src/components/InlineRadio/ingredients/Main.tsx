import { Fragment } from 'react';
import { Wrapper } from './Main.style';
import RadioProvider, { RadioProviderProps } from 'contexts/radioContext';
import getFilteredChildren from 'utils/getFilteredChildren';
import Option from './Option';

const Main = (props: RadioProviderProps) => {
  const { value, setValue, children, name } = props;

  const options = getFilteredChildren(<Option value="" />, children);

  return (
    <RadioProvider value={value} setValue={setValue} name={name}>
      <Wrapper>
        {options.map((option, index) => (
          <Fragment key={index}>
            {option}
            {index < options.length - 1 ? <span aria-hidden="true">|</span> : null}
          </Fragment>
        ))}
      </Wrapper>
    </RadioProvider>
  );
};

export default Main;

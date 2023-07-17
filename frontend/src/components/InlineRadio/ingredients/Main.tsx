import { Fragment } from 'react';
import { Division, Wrapper } from './Main.style';
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
            {index < options.length - 1 ? <Division aria-hidden="true">|</Division> : null}
          </Fragment>
        ))}
      </Wrapper>
    </RadioProvider>
  );
};

export default Main;

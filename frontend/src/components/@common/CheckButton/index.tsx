import { useId } from 'react';
import { CheckboxLabel, Wrapper } from './CheckButton.style';

interface Props {
  children: string;
  checked: boolean;
  onClick?: React.ComponentProps<'label'>['onClick'];
}

const CheckButton = ({ children, checked, onClick }: Props) => {
  const id = useId();

  return (
    <Wrapper>
      <input id={id} type="checkbox" checked={checked} />
      <CheckboxLabel htmlFor={id} onClick={onClick}>
        {children}
      </CheckboxLabel>
    </Wrapper>
  );
};

export default CheckButton;

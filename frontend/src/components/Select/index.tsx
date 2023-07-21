import { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { Backdrop, IconArea, OptionBox, OptionItem, SelectedValue, Wrapper } from './Select.style';

interface SelectProps {
  value: string;
  options: string[];
  onChange?: (option: string) => void;
  placeholder?: string;
}

const Select = ({ value, options, onChange, placeholder }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  };

  const select = (option: string) => () => {
    onChange?.(option);
    close();
  };

  return (
    <Wrapper>
      <SelectedValue onClick={toggle} $placeholder={value === ''}>
        {value || placeholder}
      </SelectedValue>
      <IconArea $rotate={isOpen}>
        <TiArrowSortedDown size={18} />
      </IconArea>
      {isOpen && (
        <>
          <Backdrop onClick={close} />
          <OptionBox>
            {options.map((option) => (
              <OptionItem key={option} onClick={select(option)}>
                {option}
              </OptionItem>
            ))}
          </OptionBox>
        </>
      )}
    </Wrapper>
  );
};

export default Select;

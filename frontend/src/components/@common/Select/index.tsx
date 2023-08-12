import { useState, useEffect, useCallback } from 'react';
import ArrowDropDown from 'components/@common/Icons/ArrowDropDown';
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

  const select = (option: string) => {
    onChange?.(option);
    close();
  };

  const closeOnEscape = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Escape') setIsOpen(false);
    },
    [setIsOpen]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keyup', closeOnEscape);

    return () => {
      window.removeEventListener('keyup', closeOnEscape);
    };
  }, [isOpen, closeOnEscape]);

  return (
    <Wrapper>
      <SelectedValue
        type="button"
        onClick={toggle}
        $placeholder={value === ''}
        aria-label={`값 선택 메뉴 열기. 현재 선택된 값: ${value || '없음'}`}
      >
        {value || placeholder}
      </SelectedValue>
      <IconArea $rotate={isOpen} aria-hidden>
        <ArrowDropDown width={24} height={24} />
      </IconArea>
      {isOpen && (
        <>
          <Backdrop onClick={close} />
          <OptionBox role="menu">
            {options.map((option) => (
              <OptionItem
                key={option}
                role="menuitem"
                onClick={() => select(option)}
                tabIndex={0}
                onKeyDown={({ key }: React.KeyboardEvent<HTMLLIElement>) => {
                  if (key === 'Enter' || key === ' ') select(option);
                }}
              >
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

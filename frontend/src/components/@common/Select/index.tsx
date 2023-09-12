import { useEffect, useCallback } from 'react';
import SvgIcons from 'components/@common/SvgIcons';
import { Backdrop, IconArea, OptionBox, OptionItem, SelectedValue, Wrapper } from './Select.style';
import useToggle from 'hooks/useToggle';
import theme from 'style/theme.style';

interface SelectProps {
  value: string;
  options: string[];
  onChange?: (option: string) => void;
  placeholder?: string;
}

const Select = ({ value, options, onChange, placeholder }: SelectProps) => {
  const { isOn: isOpen, off: close, toggle } = useToggle();

  const select = (option: string) => {
    onChange?.(option);
    close();
  };

  const closeOnEscape = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Escape') close();
    },
    [close]
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
        <SvgIcons icon="arrow-drop-down" color={theme.color.sub} />
      </IconArea>
      {isOpen && (
        <>
          <Backdrop onClick={close} />
          <OptionBox role="menu">
            {options.map((option) => {
              const selectOnClick = () => select(option);
              const selectOnEnterOrSpace = ({ key }: React.KeyboardEvent<HTMLLIElement>) => {
                if (key === 'Enter' || key === ' ') select(option);
              };

              return (
                <OptionItem
                  key={option}
                  role="menuitem"
                  tabIndex={0}
                  onClick={selectOnClick}
                  onKeyDown={selectOnEnterOrSpace}
                >
                  {option}
                </OptionItem>
              );
            })}
          </OptionBox>
        </>
      )}
    </Wrapper>
  );
};

export default Select;

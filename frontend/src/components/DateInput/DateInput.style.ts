import { styled } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const DateValue = styled.label<{
  $placeholder?: boolean;
}>`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);

  display: inline-block;

  width: 100%;

  font: 500 1.8rem/2.2rem 'NanumSquareRound';
  color: ${({ $placeholder, theme }) => ($placeholder ? theme.color.sub100 : 'black')};
  text-align: center;
`;

export const Date = styled.input.attrs({ type: 'date' })`
  position: relative;

  width: 100%;
  padding: 10px;

  font-size: 100%;
  text-align: center;

  background: transparent;
  border: none;

  &::before {
    content: attr(data-placeholder);
    width: 100%;
    height: 100%;
  }

  &::-webkit-datetime-edit-text,
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-year-field {
    display: none;
    appearance: none;
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    color: transparent;

    background: transparent;
  }

  &:hover {
    background: #0000000c;
  }

  &:valid::before {
    display: none;
  }
`;

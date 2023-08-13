import styled from 'styled-components';

interface DayProps {
  $isToday: boolean | null;
  $isSelected: boolean;
  $isInRange: boolean;
}

export const Wrapper = styled.div`
  width: 40px;
  height: 40px;
`;

export const DaySpan = styled.span<DayProps>`
  cursor: ${({ $isInRange }) => ($isInRange ? 'pointer' : 'default')};

  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  color: ${({ $isSelected, $isInRange, theme: { color } }) => {
    if ($isSelected) return color.background;
    if ($isInRange) return color.sub;
    return color.grayDark;
  }};

  background: ${({ $isSelected, $isInRange, theme: { color } }) => {
    if ($isSelected && $isInRange) return color.accent;
    if ($isSelected) return color.accent + '5F';
    return color.background;
  }};
  border: 2px solid
    ${({ $isToday, $isInRange, theme: { color } }) => {
      if ($isToday && $isInRange) return color.accent;
      if ($isToday) return color.accent + '5F';
      return 'none';
    }};
  border-radius: 50%;

  &:hover {
    color: ${({ $isInRange, theme: { color } }) => {
      if ($isInRange) return color.background;
    }};
    background: ${({ $isInRange, theme: { color } }) => {
      if ($isInRange) return color.accent;
    }};
  }
`;

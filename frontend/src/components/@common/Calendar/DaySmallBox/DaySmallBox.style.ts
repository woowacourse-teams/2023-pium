import styled from 'styled-components';

interface DayProps {
  $isToday: boolean | null;
  $isInRange: boolean;
}

export const Wrapper = styled.div`
  width: 40px;
  height: 40px;
`;

export const DaySpan = styled.span<DayProps>`
  cursor: ${({ $isInRange }) => $isInRange ? 'pointer' : 'default'};

  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  color: ${({ $isToday, $isInRange, theme: { color } }) => {
    if ($isToday) return color.background;
    if ($isInRange) return color.sub;
    return color.grayDark;
  }};

  background: ${({ $isToday, $isInRange, theme: { color } }) => {
    if ($isToday && $isInRange) return color.accent;
    if ($isToday) return color.accent + '5F';
    return color.background;
  }};
  border-radius: 50%;

  &:hover {
    color: ${({ $isToday, $isInRange, theme: { color } }) =>
      $isToday || $isInRange ? color.background : color.grayDark};
    background: ${({ $isToday, $isInRange, theme: { color } }) => {
      if ($isToday && !$isInRange) return color.accent + '5F';
      if (!$isToday && !$isInRange) return color.background;
      return color.accent;
    }};
  }
`;

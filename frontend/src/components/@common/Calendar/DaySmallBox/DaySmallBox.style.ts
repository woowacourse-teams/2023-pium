import styled from 'styled-components';

interface DayProps {
  isToday: boolean | null;
  isInRange: boolean;
}

export const Wrapper = styled.div`
  width: 40px;
  height: 40px;
`;

export const DaySpan = styled.span<DayProps>`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  color: ${({ isToday, isInRange, theme: { color } }) =>
    isToday ? color.background : isInRange ? color.sub : color.grayDark};

  background: ${({ isToday, theme: { color } }) => (isToday ? color.accent : color.background)};
  border-radius: 50%;
`;

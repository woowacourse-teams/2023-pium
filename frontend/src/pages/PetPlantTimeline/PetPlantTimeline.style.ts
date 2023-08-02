import { styled } from 'styled-components';

export const Main = styled.main`
  position: relative;

  width: 100%;
  min-height: 100%;
  padding: 96px 0;

  background-color: white;
`;

export const Plant = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translate(-50%);

  width: 2px;
  min-height: 100%;

  background: ${(props) => props.theme.color.primary};
`;

export const PlantImage = styled.img`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translate(-52%);

  width: 24px;
`;

export const Earth = styled.div`
  position: absolute;
  bottom: -56px;
  left: 50%;
  transform: translate(-50%);

  width: 80px;
  height: 80px;

  background-color: #733813;
  border-top: solid 8px #441a00;
  border-bottom: solid 12px #bb764c;
  border-radius: 8px 8px 50% 50%;
`;

export const MonthArea = styled.div`
  position: relative;
  width: 100%;
`;

export const MonthHeader = styled.h2`
  position: sticky;
  top: 0;
  height: 0;
  padding-left: 32px;
`;

export const Month = styled.p`
  height: 32px;
  padding-top: 8px;
  font-size: 24px;
`;

export const TimelineItem = styled.div`
  display: flex;
  align-items: end;

  width: 100%;
  height: 32px;
  margin-bottom: 64px;

  font-weight: 700;
`;

export const Day = styled.div`
  position: relative;

  display: flex;
  align-items: end;
  justify-content: end;

  width: 50%;
  padding-right: 32px;

  font-size: 2rem;
`;

export const Spot = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);

  width: 12px;
  height: 12px;

  background-color: white;
  border: solid 2px ${(props) => props.theme.color.primary};
  border-radius: 50%;
`;

export const Water = styled.div`
  width: 50%;
  padding-left: 32px;
  font-size: 2rem;
  color: #1c7fd0;
`;

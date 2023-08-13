import { keyframes, styled } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh + 64px);
`;

export const Plant = styled.div`
  position: absolute;
  top: 16px;
  left: 40%;
  transform: translate(-50%);

  width: 2px;
  height: calc(100% + 64px);

  background: ${(props) => props.theme.color.primary};
`;

export const PlantImage = styled.img`
  position: absolute;
  top: -12px;
  left: 40%;
  transform: translate(-52%);

  width: 24px;
`;

export const YearArea = styled.div`
  position: relative;
`;

export const YearHeader = styled.p`
  position: sticky;
  z-index: ${(props) => props.theme.zIndex.sticky + 3};
  top: 40px;

  display: flex;
  align-items: center;

  width: max-content;
  height: 40px;
  padding-left: 8px;

  font-size: 1.6rem;

  background-color: ${(props) => props.theme.color.background};
`;

export const Month = styled.p`
  display: flex;
  align-items: center;

  width: max-content;
  height: 40px;
  padding-left: 8px;

  font-size: 1.6rem;
`;

export const Earth = styled.div`
  position: absolute;
  bottom: -96px;
  left: 40%;
  transform: translate(-50%);

  width: 80px;
  height: 80px;

  background-color: #733813;
  border-top: solid 12px #441a00;
  border-bottom: solid 12px #bb764c;
  border-radius: 50%;
`;

export const Sensor = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 32px;
`;

export const MonthArea = styled.div`
  position: relative;
  width: 100%;
`;

export const MonthHeader = styled.div`
  position: sticky;
  z-index: ${(props) => props.theme.zIndex.sticky + 2};
  top: 80px;
  height: 0;
`;

export const DayArea = styled.div`
  position: relative;

  display: flex;

  width: 100%;
  margin-bottom: 40px;

  font-weight: 500;
`;

export const DayHeader = styled.div`
  position: sticky;
  z-index: ${(props) => props.theme.zIndex.sticky + 1};
  top: 80px;

  display: flex;
  align-items: center;
  justify-content: end;

  width: 40%;
  height: 40px;
  padding-right: 16px;

  font-size: 1.6rem;
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

export const TimelineArea = styled.div`
  width: 60%;
  padding: 0 16px;
`;

const skeletonBackground = keyframes`
  0%    { background-color: rgba(165, 165, 165, 0.1) }
  50%   { background-color: rgba(165, 165, 165, 0.3) }
  100%  { background-color: rgba(165, 165, 165, 0.1) }
`;

export const SkeletonItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

export const SkeletonItemContent = styled.p`
  width: 160px;
  height: 1.6rem;
  margin: 0 8px;

  border-radius: 4px;

  animation: ${skeletonBackground} 1s infinite;
`;

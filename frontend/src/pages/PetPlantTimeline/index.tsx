import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from 'components/@common/Navbar';
import {
  Day,
  Earth,
  Main,
  Month,
  MonthArea,
  MonthHeader,
  Plant,
  PlantImage,
  Sensor,
  Spot,
  TimelineItem,
  Water,
} from './PetPlantTimeline.style';
import useWaterDateList from 'hooks/queries/history/useWaterDateList';
import useIntersectionRef from 'hooks/useIntersectionRef';
import Sprout from 'assets/sprout.svg';
import date2map from './date2map';

const PetPlantTimeline = () => {
  const { id: petPlantId } = useParams();
  const { data: waterDateList, fetchNextPage } = useWaterDateList(Number(petPlantId));
  if (!waterDateList) return null;

  const intersectionRef = useIntersectionRef<HTMLDivElement>(fetchNextPage);

  const yearMap = date2map(waterDateList);
  const yearList = Object.entries(yearMap)
    .sort(([aMonth], [bMonth]) => Number(aMonth) - Number(bMonth))
    .reverse();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Main>
        <Plant>
          <PlantImage src={Sprout} />
        </Plant>
        {yearList.map(([year, monthMap]) => {
          const monthList = Object.entries(monthMap)
            .sort(([aDay], [bDay]) => Number(aDay) - Number(bDay))
            .reverse();

          return monthList.map(([month, dayList]) => (
            <MonthArea key={year + month}>
              <MonthHeader>
                <Month>{month}월</Month>
              </MonthHeader>
              {dayList.map((day) => (
                <TimelineItem key={year + month + day}>
                  <Day>
                    {day}일 <Spot />
                  </Day>
                  <Water>물 주기 완료</Water>
                </TimelineItem>
              ))}
            </MonthArea>
          ));
        })}
        <Earth />
        <Sensor ref={intersectionRef} />
      </Main>
      <Navbar />
    </>
  );
};

export default PetPlantTimeline;

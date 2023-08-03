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
import usePetPlantHistory from 'hooks/queries/history/usePetPlantHistory';
import useIntersectionRef from 'hooks/useIntersectionRef';
import Sprout from 'assets/sprout.svg';
import { convertHistoryResponseListToYearList } from './converter';

const PetPlantTimeline = () => {
  const { id: petPlantId } = useParams();
  const { data, fetchNextPage } = usePetPlantHistory(Number(petPlantId));
  if (!data) return null;

  const yearList = convertHistoryResponseListToYearList(data.pages);
  const intersectionRef = useIntersectionRef<HTMLDivElement>(fetchNextPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Main>
        <Plant>
          <PlantImage src={Sprout} alt="타임라인 꼭대기" />
        </Plant>
        {yearList.map(([year, monthList]) =>
          monthList.map(([month, dayList]) => (
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
          ))
        )}
        <Earth />
        <Sensor ref={intersectionRef} />
      </Main>
      <Navbar />
    </>
  );
};

export default PetPlantTimeline;

import { HistoryType } from 'types/history';
import { PetPlantDetails } from 'types/petPlant';
import { useEffect } from 'react';
import {
  DayArea,
  DayHeader,
  Earth,
  Month,
  MonthArea,
  MonthHeader,
  Plant,
  Sensor,
  Spot,
  TimelineArea,
  Wrapper,
  YearArea,
  YearHeader,
} from './Timeline.style';
import useYearList from 'hooks/queries/history/useYearList';
import useIntersectionRef from 'hooks/useIntersectionRef';
import SproutSvg from 'assets/sprout.svg';
import SproutWebp from 'assets/sprout.webp';
import TimelineItemList from '../TimelineItemList';
import Skeleton from './Skeleton';

interface TimelineProps {
  petPlantId: PetPlantDetails['id'];
  filter: HistoryType[];
}

const Timeline = ({ petPlantId, filter }: TimelineProps) => {
  const {
    data: yearList,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useYearList(Number(petPlantId), filter);

  const intersectionRef = useIntersectionRef(fetchNextPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  return (
    <Wrapper hasNextPage={hasNextPage}>
      <Plant>
        <picture>
          <source srcSet={SproutWebp} type="image/webp" />
          <img src={SproutSvg} alt="타임라인 꼭대기" />
        </picture>
      </Plant>
      {isSuccess ? (
        yearList.map(([year, monthList]) => (
          <YearArea key={year}>
            <YearHeader>{year}년</YearHeader>
            {monthList.map(([month, dayList]) => (
              <MonthArea key={year + month}>
                <MonthHeader>
                  <Month>{month}월</Month>
                </MonthHeader>
                {dayList.map(([day, timelineItemList]) => (
                  <DayArea key={year + month + day}>
                    <DayHeader>
                      {day}일<Spot />
                    </DayHeader>
                    <TimelineArea>
                      <TimelineItemList timelineItemList={timelineItemList} />
                    </TimelineArea>
                  </DayArea>
                ))}
              </MonthArea>
            ))}
          </YearArea>
        ))
      ) : (
        <Skeleton hasYearHeader />
      )}
      {isFetchingNextPage ? <Skeleton /> : <Sensor ref={intersectionRef} />}
      {!hasNextPage && <Earth />}
    </Wrapper>
  );
};

export default Timeline;

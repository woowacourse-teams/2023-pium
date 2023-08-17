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
  PlantImage,
  Sensor,
  SkeletonItem,
  SkeletonItemContent,
  Spot,
  TimelineArea,
  Wrapper,
  YearArea,
  YearHeader,
} from './Timeline.style';
import useYearList from 'hooks/queries/history/useYearList';
import useIntersectionRef from 'hooks/useIntersectionRef';
import Sprout from 'assets/sprout.svg';
import TimelineItemList from '../TimelineItemList';

interface TimelineProps {
  petPlantId: PetPlantDetails['id'];
  filter: HistoryType[];
}

const Timeline = ({ petPlantId, filter }: TimelineProps) => {
  const {
    data: yearList,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useYearList(Number(petPlantId), filter);
  const intersectionRef = useIntersectionRef<HTMLDivElement>(fetchNextPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  return (
    <Wrapper hasNextPage={hasNextPage}>
      <Plant>
        <PlantImage src={Sprout} alt="타임라인 꼭대기" />
      </Plant>
      {yearList &&
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
        ))}
      {(isLoading || isFetchingNextPage) && (
        <>
          {isLoading && <YearHeader />}
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <DayArea key={index}>
                <DayHeader />
                <TimelineArea>
                  <SkeletonItem>
                    <SkeletonItemContent />
                  </SkeletonItem>
                </TimelineArea>
              </DayArea>
            ))}
        </>
      )}
      {!hasNextPage && <Earth />}
      <Sensor ref={intersectionRef} />
    </Wrapper>
  );
};

export default Timeline;

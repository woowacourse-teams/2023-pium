import {
  DayArea,
  DayHeader,
  SkeletonItem,
  SkeletonItemContent,
  TimelineArea,
  YearHeader,
} from './Timeline.style';

interface SkeletonProps {
  length: number;
  hasYearHeader?: boolean;
}

const TimelineSkeleton = ({ length, hasYearHeader }: SkeletonProps) => (
  <>
    {hasYearHeader && <YearHeader />}
    {Array(length)
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
);

export default TimelineSkeleton;

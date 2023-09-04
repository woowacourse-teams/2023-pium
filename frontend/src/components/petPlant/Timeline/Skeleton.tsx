import {
  DayArea,
  DayHeader,
  SkeletonItem,
  SkeletonItemContent,
  TimelineArea,
  YearHeader,
} from './Timeline.style';

interface SkeletonProps {
  hasYearHeader?: boolean;
}

const Skeleton = ({ hasYearHeader }: SkeletonProps) => (
  <>
    {hasYearHeader && <YearHeader />}
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
);

export default Skeleton;

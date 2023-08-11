import ArrowRightAlt from 'components/@common/Icons/ArrowRightAlt';
import Stopwatch from 'components/@common/Icons/Stopwatch';
import Water from 'components/@common/Icons/Water';
import type { TimelineItem } from 'components/petPlant/Timeline/converter';
import { IconArea, Item, ItemContent, ItemHead, Wrapper } from './TimelineDayItem.style';
import { getDaysBetween } from 'utils/date';

interface TimelineDayItemProps {
  timelineItemList: TimelineItem[];
}

const TimelineDayItem = ({ timelineItemList }: TimelineDayItemProps) => {
  const TYPE_MESSAGE_MAP = {
    waterCycle: '물 주기를 ',
    flowerpot: '화분을 ',
    light: '채광을 ',
    location: '위치를 ',
  };

  return (
    <Wrapper>
      {timelineItemList.map(({ type, previous, current }, index) => {
        switch (type) {
          case 'lastWaterDate':
            return (
              <Item key={'water' + index}>
                <IconArea>
                  <Water />
                </IconArea>
                <ItemHead>
                  {previous ? `${getDaysBetween(previous, current)}일 만에` : '처음'} 물을 줬어요
                </ItemHead>
              </Item>
            );
          default:
            return (
              <Item key={type + index}>
                <IconArea>
                  <Stopwatch />
                </IconArea>
                <div>
                  <ItemHead>
                    {TYPE_MESSAGE_MAP[type]}
                    {previous ? '변경' : '설정'}했어요
                  </ItemHead>
                  <ItemContent>
                    {previous && (
                      <>
                        {previous}
                        <ArrowRightAlt />
                      </>
                    )}
                    {current}
                  </ItemContent>
                </div>
              </Item>
            );
        }
      })}
    </Wrapper>
  );
};

export default TimelineDayItem;

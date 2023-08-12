import ArrowRightAlt from 'components/@common/Icons/ArrowRightAlt';
import Flowerpot from 'components/@common/Icons/Flowerpot';
import Stopwatch from 'components/@common/Icons/Stopwatch';
import Sun from 'components/@common/Icons/Sun';
import Water from 'components/@common/Icons/Water';
import Wind from 'components/@common/Icons/Wind';
import type { TimelineItem } from 'components/petPlant/Timeline/converter';
import { IconArea, Item, ItemContent, ItemHead, Wrapper } from './TimelineItemList.style';
import { getDaysBetween } from 'utils/date';
import theme from 'style/theme.style';

interface TimelineItemListProps {
  timelineItemList: TimelineItem[];
}

const TimelineItemList = ({ timelineItemList }: TimelineItemListProps) => {
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
                  {
                    {
                      waterCycle: <Stopwatch />,
                      flowerpot: <Flowerpot color={theme.color.primary} />,
                      light: <Sun color={theme.color.primary} />,
                      location: <Wind color={theme.color.primary} />,
                    }[type]
                  }
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

export default TimelineItemList;

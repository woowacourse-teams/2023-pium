import type { HistoryType } from 'types/history';
import ArrowRightAlt from 'components/@common/Icons/ArrowRightAlt';
import Flowerpot from 'components/@common/Icons/Flowerpot';
import House from 'components/@common/Icons/House';
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

const HISTORY_TYPE_ICON_MAP: Record<Exclude<HistoryType, 'lastWaterDate'>, React.ReactElement> = {
  waterCycle: <Stopwatch />,
  flowerpot: <Flowerpot color={theme.color.primary} />,
  light: <Sun color={theme.color.primary} />,
  location: <House color={theme.color.primary} />,
  wind: <Wind color={theme.color.primary} />,
};

const HISTORY_TYPE_KOREAN_MAP: Record<Exclude<HistoryType, 'lastWaterDate'>, string> = {
  waterCycle: '물 주기를 ',
  flowerpot: '화분을 ',
  light: '채광을 ',
  location: '위치를 ',
  wind: '바람 환경을 ',
};

const TimelineItemList = ({ timelineItemList }: TimelineItemListProps) => (
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
              <IconArea>{HISTORY_TYPE_ICON_MAP[type]}</IconArea>
              <div>
                <ItemHead>
                  {HISTORY_TYPE_KOREAN_MAP[type]}
                  {previous ? '변경' : '설정'}했어요
                </ItemHead>
                <ItemContent>
                  {previous && (
                    <>
                      {previous}
                      {type === 'waterCycle' ? '일' : ''}
                      <ArrowRightAlt />
                    </>
                  )}
                  {current}
                  {type === 'waterCycle' ? '일' : ''}
                </ItemContent>
              </div>
            </Item>
          );
      }
    })}
  </Wrapper>
);

export default TimelineItemList;

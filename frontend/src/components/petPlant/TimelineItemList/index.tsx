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

type SettingType = Exclude<HistoryType, 'lastWaterDate' | 'waterCycle'>;

const SETTING_ICON_MAP: Record<SettingType, React.ReactElement> = {
  flowerpot: <Flowerpot color={theme.color.primary} />,
  light: <Sun color={theme.color.primary} />,
  location: <House color={theme.color.primary} />,
  wind: <Wind color={theme.color.primary} />,
};

const SETTING_KOREAN_MAP: Record<SettingType, string> = {
  flowerpot: '화분을',
  light: '채광을',
  location: '위치를',
  wind: '바람 환경을',
};

const LIGHT_CUTBACK_MAP: Record<string, string> = {
  '창문 밖에서 해를 받아요': '창문 밖',
  '창문 안쪽에서 해를 받아요': '창문 안쪽',
  '일반 조명 빛을 받아요': '일반 조명',
  '식물용 조명 빛을 받아요': '식물용 조명',
  '해를 못 받아요': '채광 없음',
};

const WIND_CUTBACK_MAP: Record<string, string> = {
  '5m 내 창문이 있어요': '5m 내 창문',
  '5m 보다 멀리 창문이 있어요': '5m 멀리 창문',
  '창문이 없지만 바람이 통해요': '창문 없음',
  '바람이 안 통해요': '바람 없음',
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
        case 'waterCycle':
          return (
            <Item key={'waterCycle' + index}>
              <IconArea>
                <Stopwatch />
              </IconArea>
              <div>
                <ItemHead>물 주기를 {previous ? '변경' : '설정'}했어요</ItemHead>
                <ItemContent>
                  {previous && (
                    <>
                      {previous}일 <ArrowRightAlt />
                    </>
                  )}
                  {current}일
                </ItemContent>
              </div>
            </Item>
          );
        default:
          if (type === 'light') {
            previous = previous ? LIGHT_CUTBACK_MAP[previous] : previous;
            current = LIGHT_CUTBACK_MAP[current];
          } else if (type === 'wind') {
            previous = previous ? WIND_CUTBACK_MAP[previous] : previous;
            current = WIND_CUTBACK_MAP[current];
          }
          return (
            <Item key={type + index}>
              <IconArea>{SETTING_ICON_MAP[type]}</IconArea>
              <div>
                <ItemHead>
                  {SETTING_KOREAN_MAP[type]} {previous ? '변경' : '설정'}했어요
                </ItemHead>
                <ItemContent>
                  {previous && (
                    <>
                      {previous} <ArrowRightAlt />
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

export default TimelineItemList;

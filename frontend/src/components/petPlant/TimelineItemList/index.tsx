import type { HistoryType } from 'types/history';
import SvgIcons from 'components/@common/SvgIcons/SvgFill';
import type { TimelineItem } from 'components/petPlant/Timeline/converter';
import { IconArea, Item, ItemContent, ItemHead, Wrapper } from './TimelineItemList.style';
import { getDaysBetween } from 'utils/date';
import { NO_PREVIOUS_VALUE } from 'constants/index';
import theme from 'style/theme.style';

interface TimelineItemListProps {
  timelineItemList: TimelineItem[];
}

type SettingType = Exclude<HistoryType, 'lastWaterDate' | 'waterCycle'>;

const SETTING_ICON_MAP: Record<SettingType, React.ReactElement> = {
  flowerpot: <SvgIcons icon="flowerpot" color={theme.color.primary} />,
  light: <SvgIcons icon="sun" color={theme.color.primary} />,
  location: <SvgIcons icon="house" color={theme.color.primary} />,
  wind: <SvgIcons icon="wind" color={theme.color.primary} />,
};

const SETTING_KOREAN_MAP: Record<SettingType, string> = {
  flowerpot: '화분을',
  light: '채광을',
  location: '위치를',
  wind: '바람 환경을',
};

const TimelineItemList = ({ timelineItemList }: TimelineItemListProps) => (
  <Wrapper>
    {timelineItemList.map(({ type, previous, current }, index) => {
      const hasPrevious = previous !== NO_PREVIOUS_VALUE;

      switch (type) {
        case 'lastWaterDate':
          return (
            <Item key={'water' + index}>
              <IconArea>
                <SvgIcons icon="water" color="#75AEDC" />
              </IconArea>
              <ItemHead>
                {hasPrevious ? `${getDaysBetween(previous, current)}일 만에` : '처음'} 물을 줬어요
              </ItemHead>
            </Item>
          );
        case 'waterCycle':
          return (
            <Item key={'waterCycle' + index}>
              <IconArea>
                <SvgIcons icon="stopwatch" color={theme.color.sub} />
              </IconArea>
              <div>
                <ItemHead>물 주기를 {hasPrevious ? '변경' : '설정'}했어요</ItemHead>
                <ItemContent>
                  {hasPrevious && (
                    <>
                      {previous}일{' '}
                      <SvgIcons icon="arrow-right-alt" color={theme.color.sub} size={16} />
                    </>
                  )}
                  {current}일
                </ItemContent>
              </div>
            </Item>
          );
        default:
          return (
            <Item key={type + index}>
              <IconArea>{SETTING_ICON_MAP[type]}</IconArea>
              <div>
                <ItemHead>
                  {SETTING_KOREAN_MAP[type]} {hasPrevious ? '변경' : '설정'}했어요
                </ItemHead>
                {hasPrevious && <ItemContent>{`'${previous}'에서`}</ItemContent>}
                <ItemContent>{`'${current}'`}</ItemContent>
              </div>
            </Item>
          );
      }
    })}
  </Wrapper>
);

export default TimelineItemList;

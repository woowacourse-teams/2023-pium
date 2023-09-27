import type { HistoryType } from 'types/history';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckButton from 'components/@common/CheckButton';
import Navbar from 'components/@common/Navbar';
import SvgIcons from 'components/@common/SvgIcons/SvgFill';
import Timeline from 'components/petPlant/Timeline';
import { ButtonLabel, Header, Main } from './PetPlantTimeline.style';
import useToggle from 'hooks/@common/useToggle';
import theme from 'style/theme.style';

const PetPlantTimeline = () => {
  const { id: petPlantId } = useParams();
  if (!petPlantId) throw new Error('petPlantId가 없습니다.');

  const { isOn: isCheckedWater, toggle: toggleWater } = useToggle();
  const { isOn: isCheckedWaterCycle, toggle: toggleWaterCycle } = useToggle();
  const { isOn: isCheckedSetting, toggle: toggleSetting } = useToggle();

  const [filter, setFilter] = useState<HistoryType[]>([]);

  const onClickWater = () => {
    toggleWater();
    if (isCheckedWater) {
      setFilter(filter.filter((type) => type !== 'lastWaterDate'));
    } else {
      setFilter([...filter, 'lastWaterDate']);
    }
  };

  const onClickWaterCycle = () => {
    toggleWaterCycle();
    if (isCheckedWaterCycle) {
      setFilter(filter.filter((type) => type !== 'waterCycle'));
    } else {
      setFilter([...filter, 'waterCycle']);
    }
  };

  const onClickSetting = () => {
    toggleSetting();
    if (isCheckedSetting) {
      setFilter(
        filter.filter((type) => !['flowerpot', 'light', 'location', 'wind'].includes(type))
      );
    } else {
      setFilter(filter.concat(['flowerpot', 'light', 'location', 'wind']));
    }
  };

  const { water, background, primary, sub } = theme.color;

  return (
    <>
      <Header>
        <CheckButton checked={isCheckedWater} onClick={onClickWater}>
          <SvgIcons
            size={14}
            icon="water"
            color={isCheckedWater ? background : water}
            aria-hidden
          />
          <ButtonLabel>물 준 날</ButtonLabel>
        </CheckButton>
        <CheckButton checked={isCheckedWaterCycle} onClick={onClickWaterCycle}>
          <SvgIcons
            size={14}
            icon="stopwatch"
            color={isCheckedWaterCycle ? background : sub}
            aria-hidden
          />
          <ButtonLabel>물 주기 설정</ButtonLabel>
        </CheckButton>
        <CheckButton checked={isCheckedSetting} onClick={onClickSetting}>
          <SvgIcons
            size={14}
            icon="tree-plant-pot"
            color={isCheckedSetting ? background : primary}
            aria-hidden
          />
          <ButtonLabel>환경 변화</ButtonLabel>
        </CheckButton>
      </Header>
      <Main>
        <Timeline petPlantId={Number(petPlantId)} filter={filter} />
      </Main>
      <Navbar />
    </>
  );
};

export default PetPlantTimeline;

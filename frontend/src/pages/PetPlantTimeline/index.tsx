import type { HistoryType } from 'types/history';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckButton from 'components/@common/CheckButton';
import Stopwatch from 'components/@common/Icons/Stopwatch';
import TreePlantPot from 'components/@common/Icons/TreePlantPot';
import Water from 'components/@common/Icons/Water';
import Navbar from 'components/@common/Navbar';
import Timeline from 'components/petPlant/Timeline';
import { ButtonLabel, Header, Main } from './PetPlantTimeline.style';
import useToggle from 'hooks/useToggle';
import theme from 'style/theme.style';

const PetPlantTimeline = () => {
  const { id: petPlantId } = useParams();
  if (!petPlantId) throw new Error('petPlantId가 없습니다.');

  const { isOn: isCheckedWater, toggle: toggleWater } = useToggle();
  const { isOn: isCheckedWaterCycle, toggle: toggleWaterCycle } = useToggle();
  const { isOn: isCheckedSetting, toggle: toggleSetting } = useToggle();

  const [filter, setFilter] = useState<HistoryType[]>([]);

  useEffect(() => {
    const newFilter: HistoryType[] = [];
    if (isCheckedWater) newFilter.push('lastWaterDate');
    if (isCheckedWaterCycle) newFilter.push('waterCycle');
    if (isCheckedSetting) newFilter.push('flowerpot', 'light', 'location');

    setFilter(newFilter);
    window.scrollTo(0, 0);
  }, [isCheckedWater, isCheckedWaterCycle, isCheckedSetting]);

  return (
    <>
      <Header>
        <CheckButton checked={isCheckedWater} onClick={toggleWater}>
          <Water fill={isCheckedWater ? 'white' : theme.color.water} aria-hidden />
          <ButtonLabel>물 준 날</ButtonLabel>
        </CheckButton>
        <CheckButton checked={isCheckedWaterCycle} onClick={toggleWaterCycle}>
          <Stopwatch stroke={isCheckedWaterCycle ? 'white' : 'black'} aria-hidden />
          <ButtonLabel>물 주기 설정</ButtonLabel>
        </CheckButton>
        <CheckButton checked={isCheckedSetting} onClick={toggleSetting}>
          <TreePlantPot stroke={isCheckedSetting ? 'white' : theme.color.primary} aria-hidden />
          <ButtonLabel>환경 설정</ButtonLabel>
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

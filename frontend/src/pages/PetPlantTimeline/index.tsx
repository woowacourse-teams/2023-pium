import type { HistoryType } from 'types/history';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import CheckButton from 'components/@common/CheckButton';
import Stopwatch from 'components/@common/Icons/Stopwatch';
import TreePlantPot from 'components/@common/Icons/TreePlantPot';
import Water from 'components/@common/Icons/Water';
import Navbar from 'components/@common/Navbar';
import Timeline from 'components/petPlant/Timeline';
import { Header, Main } from './PetPlantTimeline.style';
import useToggle from 'hooks/useToggle';
import theme from 'style/theme.style';

const PetPlantTimeline = () => {
  const { id: petPlantId } = useParams();

  const { isOn: isCheckedWater, toggle: toggleWater } = useToggle();
  const { isOn: isCheckedWaterCycle, toggle: toggleWaterCycle } = useToggle();
  const { isOn: isCheckedSetting, toggle: toggleSetting } = useToggle();

  const [filter, setFilter] = useState<HistoryType[]>([]);

  const toggleCheckButton = (toggler: () => void) => () => {
    window.scrollTo(0, 0);
    toggler();
    setCheckedFilter();
  };

  const setCheckedFilter = () => {
    const newFilter: HistoryType[] = [];
    if (isCheckedWater) newFilter.push('lastWaterDate');
    if (isCheckedWaterCycle) newFilter.push('waterCycle');
    if (isCheckedSetting) newFilter.concat(['flowerpot', 'light', 'location']);

    setFilter(newFilter);
  };

  if (!petPlantId) return null;
  return (
    <>
      <Header>
        <CheckButton checked={isCheckedWater} onClick={toggleCheckButton(toggleWater)}>
          <Water fill={isCheckedWater ? 'white' : theme.color.water} />
          <ButtonLabel>물 준 날</ButtonLabel>
        </CheckButton>
        <CheckButton checked={isCheckedWaterCycle} onClick={toggleCheckButton(toggleWaterCycle)}>
          <Stopwatch stroke={isCheckedWaterCycle ? 'white' : 'black'} />
          <ButtonLabel>물 주기 설정</ButtonLabel>
        </CheckButton>
        <CheckButton checked={isCheckedSetting} onClick={toggleCheckButton(toggleSetting)}>
          <TreePlantPot stroke={isCheckedSetting ? 'white' : theme.color.primary} />
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

const ButtonLabel = styled.span`
  margin-left: 1rem;
`;

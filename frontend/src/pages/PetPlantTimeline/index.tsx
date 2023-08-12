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
import useSwitch from 'hooks/useSwitch';
import theme from 'style/theme.style';

const PetPlantTimeline = () => {
  const { id: petPlantId } = useParams();

  const { isOn: isCheckedWater, toggle: toggleWater } = useSwitch();
  const { isOn: isCheckedWaterCycle, toggle: toggleWaterCycle } = useSwitch();
  const { isOn: isCheckedSetting, toggle: toggleSetting } = useSwitch();

  const [filter, setFilter] = useState<HistoryType[]>([
    'flowerpot',
    'lastWaterDate',
    'light',
    'location',
    'waterCycle',
  ]);

  const onClickWater = () => {
    window.scrollTo(0, 0);
    toggleWater();
    if (isCheckedWater) {
      setFilter(filter.filter((type) => type !== 'lastWaterDate'));
    } else {
      setFilter([...filter, 'lastWaterDate']);
    }
  };

  const onClickWaterCycle = () => {
    window.scrollTo(0, 0);
    toggleWaterCycle();
    if (isCheckedWaterCycle) {
      setFilter(filter.filter((type) => type !== 'waterCycle'));
    } else {
      setFilter([...filter, 'waterCycle']);
    }
  };

  const onClickSetting = () => {
    window.scrollTo(0, 0);
    toggleSetting();
    if (isCheckedSetting) {
      setFilter(filter.filter((type) => !['flowerpot', 'light', 'location'].includes(type)));
    } else {
      setFilter([...filter, 'flowerpot', 'light', 'location']);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!petPlantId) return null;
  return (
    <>
      <Header>
        <CheckButton checked={isCheckedWater} onClick={onClickWater}>
          <Water fill={isCheckedWater ? 'white' : theme.color.water} />
          <ButtonLabel>물 준 날</ButtonLabel>
        </CheckButton>
        <CheckButton checked={isCheckedWaterCycle} onClick={onClickWaterCycle}>
          <Stopwatch stroke={isCheckedWaterCycle ? 'white' : 'black'} />
          <ButtonLabel>물 주기 설정</ButtonLabel>
        </CheckButton>
        <CheckButton checked={isCheckedSetting} onClick={onClickSetting}>
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

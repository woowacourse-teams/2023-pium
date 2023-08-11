import type { HistoryType } from 'types/history';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckButton from 'components/@common/CheckButton';
import Navbar from 'components/@common/Navbar';
import Timeline from 'components/petPlant/Timeline';
import { Header, Main } from './PetPlantTimeline.style';
import useSwitch from 'hooks/useSwitch';

const PetPlantTimeline = () => {
  const { id: petPlantId } = useParams();

  const { isOn: isCheckedWater, toggle: toggleWater } = useSwitch(true);
  const { isOn: isCheckedWaterCycle, toggle: toggleWaterCycle } = useSwitch(true);
  const { isOn: isCheckedSetting, toggle: toggleSetting } = useSwitch(true);

  const [filter, setFilter] = useState<HistoryType[]>([
    'flowerpot',
    'lastWaterDate',
    'light',
    'location',
    'waterCycle',
  ]);

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
          물 준 날
        </CheckButton>
        <CheckButton checked={isCheckedWaterCycle} onClick={onClickWaterCycle}>
          물 주기 변화
        </CheckButton>
        <CheckButton checked={isCheckedSetting} onClick={onClickSetting}>
          환경 변화
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

import { ReminderExtendType, WaterPlantProps } from 'types/api/reminder';
import { ReminderContext } from 'contexts/reminderContext';
import { useContext } from 'react';
import { CheckButton, DateLabel, InfoBox, ReminderCardBox } from './CardBox.style';
import { getToday } from 'utils/date';
import ReminderCard from '../Card';

interface CardBoxProps {
  data: ReminderExtendType;
  notDate: boolean;
}

const CardBox = ({ data, notDate }: CardBoxProps) => {
  const context = useContext(ReminderContext);

  const waterHandler = () => {
    const variables: WaterPlantProps = {
      id: data.petPlantId,
      body: {
        waterDate: getToday(),
      },
    };

    context?.waterCallback(variables);
  };

  return (
    <ReminderCardBox key={data.petPlantId}>
      <InfoBox>
        {!notDate && <DateLabel>{data.date}</DateLabel>}
        <CheckButton type="button" onClick={waterHandler} />
      </InfoBox>
      <ReminderCard data={data} />
    </ReminderCardBox>
  );
};

export default CardBox;

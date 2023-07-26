import { ReminderExtendType, WaterPlantProps } from 'types/api/reminder';
import { CheckButton, DateLabel, InfoBox, ReminderCardBox } from './CardBox.style';
import useReminderHooks from 'hooks/useReminderHooks';
import { getToday } from 'utils/date';
import ReminderCard from '../Card';

interface CardBoxProps {
  data: ReminderExtendType;
  hasDate: boolean;
}

const CardBox = ({ data, hasDate }: CardBoxProps) => {
  const { waterMutate } = useReminderHooks({ enabled: false });

  const waterCallback = () => {
    const variables: WaterPlantProps = {
      id: data.petPlantId,
      body: {
        waterDate: getToday(),
      },
    };

    waterMutate(variables);
  };

  return (
    <ReminderCardBox key={data.petPlantId}>
      <InfoBox>
        {!hasDate && <DateLabel>{data.date}</DateLabel>}
        <CheckButton type="button" onClick={waterCallback} />
      </InfoBox>
      <ReminderCard data={data} />
    </ReminderCardBox>
  );
};

export default CardBox;

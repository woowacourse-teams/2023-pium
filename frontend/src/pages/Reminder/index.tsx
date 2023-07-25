import { Reminder as ReminderType } from 'types/api/reminder';
import { useQuery } from '@tanstack/react-query';
import { ContentBox, HeaderBox, Title } from './Reminder.style';
import reminderAPI from 'apis/reminder';

interface ReminderResults {
  data: ReminderType[];
}

const Reminder = () => {
  const { data } = useQuery<ReminderResults>({
    queryKey: ['reminder'],

    queryFn: async () => {
      const response = await reminderAPI.getReminder();
      const results = await response.json();
      return results;
    },
  });

  console.log(data);

  return (
    <article>
      <HeaderBox>
        <Title>리마인더</Title>
      </HeaderBox>
      <ContentBox>여기에 섹션이 들어갑니다.</ContentBox>
    </article>
  );
};

export default Reminder;

import {
  ConvertReminderData,
  Month,
  MonthKeyReminderType,
  ReminderExtendType,
  Reminder as ReminderType,
  TodayStatus,
} from 'types/api/reminder';
import { useQuery } from '@tanstack/react-query';
import CheckBox from 'components/@common/CheckBox';
import ReminderCard from 'components/ReminderCard';
import {
  ContentBox,
  HeaderBox,
  MonthTitle,
  MonthReminderBox,
  Title,
  Wrapper,
  ReminderCardBox,
  InfoBox,
  DateLabel,
  FillStyle,
  EmptyStyle,
} from './Reminder.style';
import reminderAPI from 'apis/reminder';
import { getToday } from 'utils/date';

const initialData: MonthKeyReminderType = {};

const Reminder = () => {
  const { data: reminderData } = useQuery<{ data: ReminderType[] }, Error, ConvertReminderData>({
    queryKey: ['reminder'],

    queryFn: async () => {
      const response = await reminderAPI.getReminder();
      const results = await response.json();
      return results;
    },

    select: (result) => {
      const { data } = result;

      const convertedData: MonthKeyReminderType = data.reduce((acc, cur) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, month, date] = cur.nextWaterDate.split('-') as [string, Month, string];

        const status: TodayStatus = cur.dDay === 0 ? 'exist' : cur.dDay > 0 ? 'late' : 'none';

        const convertData: ReminderExtendType = {
          ...cur,
          status,
          date: date,
        };

        const currentMonth = acc[month];

        if (currentMonth !== undefined) {
          return { ...acc, [month]: [...currentMonth, convertData] };
        }

        return {
          ...acc,
          [month]: [convertData],
        };
      }, initialData);

      const status = data.every(({ dDay }) => dDay < 0)
        ? 'none'
        : data.find(({ dDay }) => dDay > 0)
        ? 'late'
        : 'exist';

      return {
        data: convertedData,
        status,
      };
    },
  });

  if (reminderData === undefined) return null;

  const scheduleReminder = Object.entries(reminderData.data);

  const actionCallback = (value: string) => console.log(value);
  const checkCallback = () => {
    const today = getToday();
    actionCallback(today);
  };

  const reminderBox = scheduleReminder.map(([month, value]) => {
    const dayMap = new Map();

    return (
      <MonthReminderBox key={month}>
        <MonthTitle>{Number(month)}월</MonthTitle>
        {value.map((data) => {
          const hasDate = dayMap.has(data.date);
          if (!hasDate) dayMap.set(data.date, true);
          const id = data.petPlantId.toString();

          return (
            <ReminderCardBox key={data.petPlantId}>
              <InfoBox>
                {!hasDate && <DateLabel htmlFor={id}>{data.date}</DateLabel>}
                <CheckBox
                  id={id}
                  fillStyle={FillStyle}
                  emptyStyle={EmptyStyle}
                  checkedCallback={checkCallback}
                />
              </InfoBox>
              <ReminderCard data={data} dateCallback={actionCallback} />
            </ReminderCardBox>
          );
        })}
      </MonthReminderBox>
    );
  });

  return (
    <Wrapper status={reminderData.status}>
      <HeaderBox>
        <Title>리마인더</Title>
      </HeaderBox>
      <ContentBox>{reminderBox}</ContentBox>
    </Wrapper>
  );
};

export default Reminder;

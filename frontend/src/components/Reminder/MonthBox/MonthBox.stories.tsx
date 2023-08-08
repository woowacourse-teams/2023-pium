import { ReminderExtendType } from 'types/api/reminder';
import type { Meta, StoryObj } from '@storybook/react';
import ToastList from 'components/@common/Toast/ToastList';
import ToastProvider from 'contexts/toastContext';
import MonthBox from '.';

const meta: Meta<typeof MonthBox> = {
  component: MonthBox,
  decorators: [
    (Story) => {
      return (
        <ToastProvider>
          <Story />
          <ToastList />
        </ToastProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof MonthBox>;

export const NotHasDate: Story = {
  render: () => {
    const mockData: ReminderExtendType[] = [
      {
        petPlantId: 1,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '참새나무',
        dictionaryPlantName: '알로카시아',
        dday: 0,
        nextWaterDate: '2023-07-07',
        date: '07',
        status: 'late',
        lastWaterDate: '2023-07-01',
      },
      {
        petPlantId: 6,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '쵸파 나무',
        dictionaryPlantName: '스투키',
        dday: 0,
        nextWaterDate: '2023-07-26',
        date: '26',
        status: 'today',
        lastWaterDate: '2023-07-01',
      },
      {
        petPlantId: 7,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '클린 나무',
        dictionaryPlantName: '스투키',
        dday: 0,
        nextWaterDate: '2023-07-26',
        date: '26',
        status: 'today',
        lastWaterDate: '2023-07-01',
      },
      {
        petPlantId: 8,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '피움 나무',
        dictionaryPlantName: '스투키',
        dday: 0,
        nextWaterDate: '2023-07-26',
        date: '26',
        status: 'today',
        lastWaterDate: '2023-07-01',
      },
      {
        petPlantId: 9,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '포비 나무',
        dictionaryPlantName: '스투키',
        dday: -3,
        nextWaterDate: '2023-07-29',
        date: '29',
        status: 'future',
        lastWaterDate: '2023-07-01',
      },
      {
        petPlantId: 10,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '크론 나무',
        dictionaryPlantName: '스투키',
        dday: -3,
        nextWaterDate: '2023-07-29',
        date: '29',
        status: 'future',
        lastWaterDate: '2023-07-01',
      },
    ];

    return <MonthBox reminderDates={mockData} month="7" />;
  },
};

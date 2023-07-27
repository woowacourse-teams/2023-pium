import { ReminderExtendType } from 'types/api/reminder';
import type { Meta, StoryObj } from '@storybook/react';
import MonthBox from '.';

const meta: Meta<typeof MonthBox> = {
  component: MonthBox,
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
        dDay: 0,
        nextWaterDate: '2023-07-07',
        date: '07',
        status: 'late',
      },
      {
        petPlantId: 6,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '쵸파 나무',
        dictionaryPlantName: '스투키',
        dDay: 0,
        nextWaterDate: '2023-07-26',
        date: '26',
        status: 'today',
      },
      {
        petPlantId: 7,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '클린 나무',
        dictionaryPlantName: '스투키',
        dDay: 0,
        nextWaterDate: '2023-07-26',
        date: '26',
        status: 'today',
      },
      {
        petPlantId: 8,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '피움 나무',
        dictionaryPlantName: '스투키',
        dDay: 0,
        nextWaterDate: '2023-07-26',
        date: '26',
        status: 'today',
      },
      {
        petPlantId: 9,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '포비 나무',
        dictionaryPlantName: '스투키',
        dDay: -3,
        nextWaterDate: '2023-07-29',
        date: '29',
        status: 'future',
      },
      {
        petPlantId: 10,
        image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
        nickName: '크론 나무',
        dictionaryPlantName: '스투키',
        dDay: -3,
        nextWaterDate: '2023-07-29',
        date: '29',
        status: 'future',
      },
    ];

    return <MonthBox reminderDates={mockData} month="7" />;
  },
};

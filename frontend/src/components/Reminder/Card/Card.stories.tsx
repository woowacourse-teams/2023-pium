import { ReminderExtendType } from 'types/api/reminder';
import type { Meta, StoryObj } from '@storybook/react';
import ReminderCard from '.';

const meta: Meta<typeof ReminderCard> = {
  component: ReminderCard,
};

export default meta;

type Story = StoryObj<typeof ReminderCard>;

export const Default: Story = {
  render: () => {
    const mockData: ReminderExtendType = {
      petPlantId: 1,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '참새나무',
      dictionaryPlantName: '알로카시아',
      dDay: 0,
      nextWaterDate: '2023-07-26',
      date: '26',
      status: 'today',
    };

    return <ReminderCard data={mockData} />;
  },
};

export const Late: Story = {
  render: () => {
    const mockData: ReminderExtendType = {
      petPlantId: 1,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '참새나무',
      dictionaryPlantName: '알로카시아',
      dDay: 19,
      nextWaterDate: '2023-07-07',
      date: '07',
      status: 'late',
    };

    return <ReminderCard data={mockData} />;
  },
};

export const None: Story = {
  render: () => {
    const mockData: ReminderExtendType = {
      petPlantId: 1,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '참새나무',
      dictionaryPlantName: '알로카시아',
      dDay: -3,
      nextWaterDate: '2023-07-29',
      date: '29',
      status: 'future',
    };

    return <ReminderCard data={mockData} />;
  },
};

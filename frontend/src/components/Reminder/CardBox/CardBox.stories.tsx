import { ReminderExtendType } from 'types/api/reminder';
import type { Meta, StoryObj } from '@storybook/react';
import CardBox from '.';

const meta: Meta<typeof CardBox> = {
  component: CardBox,
};

export default meta;

type Story = StoryObj<typeof CardBox>;

export const NotHasDate: Story = {
  render: () => {
    const mockData: ReminderExtendType = {
      petPlantId: 1,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '참새나무',
      dictionaryPlantName: '알로카시아',
      dDay: 0,
      nextWaterDate: '2023-07-26',
      date: '26',
      status: 'exist',
    };

    return <CardBox data={mockData} notDate={true} />;
  },
};

export const HasDate: Story = {
  render: () => {
    const mockData: ReminderExtendType = {
      petPlantId: 1,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '참새나무',
      dictionaryPlantName: '알로카시아',
      dDay: 0,
      nextWaterDate: '2023-07-26',
      date: '26',
      status: 'exist',
    };

    return <CardBox data={mockData} notDate={false} />;
  },
};

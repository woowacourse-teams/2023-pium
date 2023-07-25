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
      nextWaterDay: 3,
      nextWaterDate: '2023-07-07',
      date: '07',
      status: 'late',
    };
    const dateCallback = (value: string) => console.log(value);

    return <ReminderCard data={mockData} dateCallback={dateCallback} />;
  },
};

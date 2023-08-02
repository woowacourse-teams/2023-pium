import { ReminderExtendType } from 'types/api/reminder';
import type { Meta, StoryObj } from '@storybook/react';
import { getParticularDateFromSpecificDay } from 'utils/date';
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
      dday: 0,
      nextWaterDate: getParticularDateFromSpecificDay(0, new Date()),
      date: '26',
      status: 'today',
      lastWaterDate: getParticularDateFromSpecificDay(-7, new Date()),
    };

    return <CardBox data={mockData} showDate={true} />;
  },
};

export const HasDate: Story = {
  render: () => {
    const mockData: ReminderExtendType = {
      petPlantId: 2,
      image: 'https://images.unsplash.com/photo-1598983062491-5934ce558814',
      nickName: '참새나무',
      dictionaryPlantName: '알로카시아',
      dday: 0,
      nextWaterDate: getParticularDateFromSpecificDay(0, new Date()),
      date: '26',
      status: 'today',
      lastWaterDate: getParticularDateFromSpecificDay(-7, new Date()),
    };

    return <CardBox data={mockData} showDate={false} />;
  },
};

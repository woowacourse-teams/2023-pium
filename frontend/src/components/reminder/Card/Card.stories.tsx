import { ReminderExtendType } from 'types/reminder';
import type { Meta, StoryObj } from '@storybook/react';
import ToastList from 'components/@common/Toast/ToastList';
import ToastProvider from 'contexts/toastContext';
import { getParticularDateFromSpecificDay } from 'utils/date';
import ReminderCard from '.';

const meta: Meta<typeof ReminderCard> = {
  component: ReminderCard,
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

type Story = StoryObj<typeof ReminderCard>;

export const Default: Story = {
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
      dday: 19,
      nextWaterDate: getParticularDateFromSpecificDay(-19, new Date()),
      date: '07',
      status: 'late',
      lastWaterDate: getParticularDateFromSpecificDay(-26, new Date()),
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
      dday: -3,
      nextWaterDate: getParticularDateFromSpecificDay(3, new Date()),
      date: '29',
      status: 'future',
      lastWaterDate: getParticularDateFromSpecificDay(-4, new Date()),
    };

    return <ReminderCard data={mockData} />;
  },
};

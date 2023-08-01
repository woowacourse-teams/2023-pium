import type { Meta, StoryObj } from '@storybook/react';
import ToastProvider from 'contexts/toastContext';
import ToastList from 'components/@common/Toast/ToastList';
import { OPTIONS } from 'constants/index';
import PetPlantEditForm from '.';

const meta: Meta<typeof PetPlantEditForm> = {
  component: PetPlantEditForm,

  args: {
    id: 2,
    nickname: '조이',
    dictionaryPlant: {
      id: 2,
      name: '백엔드2',
    },
    imageUrl: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062',
    birthDate: '2023-04-04',
    daySince: 99,

    waterCycle: 5,
    lastWaterDate: '2023-07-07',
    dday: -1,
    nextWaterDate: '2023-07-17',

    location: OPTIONS.location[0],
    flowerpot: OPTIONS.flowerPot[1],
    light: OPTIONS.light[2],
    wind: OPTIONS.wind[3],
  },

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

type Story = StoryObj<typeof PetPlantEditForm>;

export const Default: Story = {};

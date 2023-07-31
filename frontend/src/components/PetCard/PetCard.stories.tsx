import type { Meta, StoryObj } from '@storybook/react';
import PetCard from '.';

const meta: Meta<typeof PetCard> = {
  component: PetCard,
};

export default meta;

type Story = StoryObj<typeof PetCard>;

export const Default: Story = {
  args: {
    id: 2,
    nickname: '기영이',
    imageUrl: 'https://images.unsplash.com/photo-1667342608690-828e1a839ead',
    dictionaryPlantName: '스투키',
    birthDate: '2023-07-08',
    daySince: 95,
  },
};

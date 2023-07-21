import type { Meta, StoryObj } from '@storybook/react';
import SearchResults from '.';

const meta: Meta<typeof SearchResults> = {
  component: SearchResults,
  args: {
    plantName: '아',
  },
  argTypes: {
    plantName: {
      type: 'string',
      description: '검색할 식물 이름',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchResults>;

export const Default: Story = {};

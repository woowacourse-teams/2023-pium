import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SearchResultItem from '.';

const meta: Meta<typeof SearchResultItem> = {
  component: SearchResultItem,
  args: {
    id: 1,
    name: '겨울',
    imageUrl: 'https://images.unsplash.com/photo-1520084848344-f4c32b3f7b51',
  },
};

export default meta;

type Story = StoryObj<typeof SearchResultItem>;

export const Default: Story = {};

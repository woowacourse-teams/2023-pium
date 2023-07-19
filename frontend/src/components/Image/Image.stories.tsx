import type { Meta, StoryObj } from '@storybook/react';
import Image from '.';

const meta: Meta<typeof Image> = {
  component: Image,

  args: {
    type: 'circle',
    size: '77px',
  },
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1555841769-75541ae4fc9f',
    alt: '참새',
    loading: 'lazy',
  },
};

export const Skeleton: Story = {
  args: {
    src: '',
    alt: '무조건 실패하는 이미지',
  },
};

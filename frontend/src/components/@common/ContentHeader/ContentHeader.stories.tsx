import type { Meta, StoryObj } from '@storybook/react';
import ContentHeader from '.';

const meta: Meta<typeof ContentHeader> = {
  component: ContentHeader,
  args: {},
};

export default meta;

type Story = StoryObj<typeof ContentHeader>;

export const Default: Story = {
  args: {
    title: '콘텐츠 헤더 입니다.',
  },
};

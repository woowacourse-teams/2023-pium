import type { Meta, StoryObj } from '@storybook/react';
import DaySmallBox from '.';

const meta: Meta<typeof DaySmallBox> = {
  component: DaySmallBox,
  args: {
    date: 10,
    isToday: false,
    currentDate: new Date('2023-07-10'),
    isInRange: true,
  },
};

export default meta;

type Story = StoryObj<typeof DaySmallBox>;

export const Default: Story = {};

export const Today: Story = {
  args: {
    date: new Date().getDate(),
    isToday: true,
    currentDate: new Date(),
  },
};

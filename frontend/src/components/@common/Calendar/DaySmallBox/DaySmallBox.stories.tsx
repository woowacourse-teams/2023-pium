import type { Meta, StoryObj } from '@storybook/react';
import DaySmallBox from '.';

const meta: Meta<typeof DaySmallBox> = {
  component: DaySmallBox,
  args: {},
};

export default meta;

type Story = StoryObj<typeof DaySmallBox>;

export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import Calendar from '.';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
};

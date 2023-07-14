import type { Meta, StoryObj } from '@storybook/react';
import { getToday } from 'utils/date';
import DateInput from '.';

const meta: Meta<typeof DateInput> = {
  component: DateInput,
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  args: {
    initialValue: getToday(),
  },
};

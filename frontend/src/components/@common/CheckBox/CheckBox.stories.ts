import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from '.';

const meta: Meta<typeof CheckBox> = {
  component: CheckBox,
  args: {},
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
  args: {},
};

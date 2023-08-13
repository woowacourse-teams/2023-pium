import type { Meta, StoryObj } from '@storybook/react';
import CheckButton from '.';

const meta: Meta<typeof CheckButton> = {
  component: CheckButton,
  args: {},
};

export default meta;

type Story = StoryObj<typeof CheckButton>;

export const Checked: Story = {
  args: {
    checked: true,
    children: '체크버튼',
  },
};

export const NotChecked: Story = {
  args: {
    checked: false,
    children: '체크버튼',
  },
};

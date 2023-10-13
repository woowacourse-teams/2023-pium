import type { Meta, StoryObj } from '@storybook/react';
import { number } from 'prop-types';
import Toggle from '.';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  argTypes: {
    width: {
      control: { type: number },
    },
    height: {
      control: { type: number },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    width: 130,
    height: 50,
  },
  render: (args) => {
    return <Toggle {...args} />;
  },
};

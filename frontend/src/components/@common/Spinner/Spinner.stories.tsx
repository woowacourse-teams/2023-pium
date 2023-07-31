import { Meta, StoryObj } from '@storybook/react';
import LoadingSpinner from '.';

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,

  args: {
    diameter: '77px',
    spinnerWidth: '7px',
  },

  argTypes: {
    diameter: { control: 'text' },
    spinnerWidth: { control: 'text' },
    color: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {};

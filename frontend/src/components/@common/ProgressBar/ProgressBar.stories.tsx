import type { Meta, StoryObj } from '@storybook/react';
import theme from 'style/theme.style';
import ProgressBar from '.';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,

  args: {
    color: theme.color.primary,
    height: '10px',
    width: '100%',
    percentage: 50,
  },

  argTypes: {
    color: {
      control: { type: 'color' },
    },
    percentage: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

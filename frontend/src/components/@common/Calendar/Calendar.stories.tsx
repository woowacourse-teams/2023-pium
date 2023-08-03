import type { Meta, StoryObj } from '@storybook/react';
import ToastProvider from 'contexts/toastContext';
import Calendar from '.';
import ToastList from '../Toast/ToastList';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  decorators: [
    (Story) => {
      return (
        <ToastProvider>
          <Story />
          <ToastList />
        </ToastProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
};

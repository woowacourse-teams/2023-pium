import type { Meta, StoryObj } from '@storybook/react';
import Calendar from '.';
import ToastList from '../Toast/ToastList';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  decorators: [
    (Story) => {
      return (
        <>
          <Story />
          <ToastList />
        </>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    return <Calendar selectedDate={null} dateCallback={null} />;
  },
};

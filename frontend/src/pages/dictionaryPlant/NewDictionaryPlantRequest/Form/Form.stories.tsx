import type { Meta, StoryObj } from '@storybook/react';
import ToastList from 'components/@common/Toast/ToastList';
import Form from '.';

const meta: Meta<typeof Form> = {
  component: Form,
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

type Story = StoryObj<typeof Form>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import ToastList from 'components/@common/Toast/ToastList';
import RequestDictionaryPlantForm from '.';

const meta: Meta<typeof RequestDictionaryPlantForm> = {
  component: RequestDictionaryPlantForm,
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

type Story = StoryObj<typeof RequestDictionaryPlantForm>;

export const Default: Story = {};

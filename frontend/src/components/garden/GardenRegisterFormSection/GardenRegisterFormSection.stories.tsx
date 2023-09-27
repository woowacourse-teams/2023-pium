import type { Meta, StoryObj } from '@storybook/react';
import Form from '.';

const meta: Meta<typeof Form> = {
  component: Form,
  parameters: {
    reactRouter: {
      routePath: '/garden/register/:id',
      routeParams: { id: '1' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};

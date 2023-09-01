import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import LoadingSpinner from 'components/@common/Spinner';
import DictionaryDetail from '.';

const meta: Meta<typeof DictionaryDetail> = {
  component: DictionaryDetail,
  parameters: {
    reactRouter: {
      routePath: '/dict/:id',
      routeParams: { id: '1' },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <Story />
        </Suspense>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof DictionaryDetail>;

export const Default: Story = {};

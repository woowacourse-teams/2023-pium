import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
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
        <Suspense fallback={<p>로딩중...</p>}>
          <Story />
        </Suspense>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof DictionaryDetail>;

export const Default: Story = {};

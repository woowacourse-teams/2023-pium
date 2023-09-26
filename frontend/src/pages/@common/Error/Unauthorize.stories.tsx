import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import Loading from 'pages/@common/Loading';
import Unauthorize from './Unauthorize';

const meta: Meta<typeof Unauthorize> = {
  component: Unauthorize,
  parameters: {
    reactRouter: {
      routePath: '/dict/:id',
      routeParams: { id: '1' },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Suspense fallback={<Loading />}>
          <Story />
        </Suspense>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Unauthorize>;

export const Default: Story = {};

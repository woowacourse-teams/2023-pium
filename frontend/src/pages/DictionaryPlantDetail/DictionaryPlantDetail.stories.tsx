import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import Loading from 'pages/Loading';
import DictionaryPlantDetail from '.';

const meta: Meta<typeof DictionaryPlantDetail> = {
  component: DictionaryPlantDetail,
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

type Story = StoryObj<typeof DictionaryPlantDetail>;

export const Default: Story = {};

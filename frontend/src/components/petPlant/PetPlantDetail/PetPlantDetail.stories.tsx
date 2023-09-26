import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import Loading from 'pages/@common/Loading';
import PetDetails from '.';

const meta: Meta<typeof PetDetails> = {
  component: PetDetails,

  args: {
    petPlantId: 1,
  },

  decorators: [
    (Story) => (
      <Suspense fallback={<Loading />}>
        <Story />
      </Suspense>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PetDetails>;

export const Default: Story = {};

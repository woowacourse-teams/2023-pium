import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import LoadingSpinner from 'components/@common/Spinner';
import PetDetails from '.';

const meta: Meta<typeof PetDetails> = {
  component: PetDetails,

  args: {
    petPlantId: 1,
  },

  decorators: [
    (Story) => (
      <Suspense fallback={<LoadingSpinner />}>
        <Story />
      </Suspense>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PetDetails>;

export const Default: Story = {};

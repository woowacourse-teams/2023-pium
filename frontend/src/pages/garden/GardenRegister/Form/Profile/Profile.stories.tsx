import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import Loading from 'pages/@common/Loading';
import Profile from '.';

const meta: Meta<typeof Profile> = {
  component: Profile,

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

type Story = StoryObj<typeof Profile>;

/**
 * 모두의 정원 기록하기 페이지에서 보여지는 이용자의 간략한 식물 환경 정보
 */
export const Default: Story = {};

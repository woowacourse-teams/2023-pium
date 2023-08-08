import type { Meta, StoryObj } from '@storybook/react';
import SearchBox from '.';

const meta: Meta<typeof SearchBox> = {
  component: SearchBox,

  argTypes: {
    onEnter: { action: '엔터 키를 눌렀습니다.' },
    onNextClick: { action: '화살표 버튼을 눌렀습니다.' },
    onResultClick: { action: '검색된 식물 중 하나를 눌렀습니다.' },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {};

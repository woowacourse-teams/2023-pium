import type { Meta, StoryObj } from '@storybook/react';
import DictInfoSwitch from '.';

const meta: Meta<typeof DictInfoSwitch> = {
  component: DictInfoSwitch,

  argTypes: {
    title: { description: '정보 제목' },
    optionMap: {
      description: 'key: 정보 옵션 이름\n\nvalue: 해당 옵션에서 보여줄 정보 또는 정보들의 배열',
    },
    defaultSelected: { description: '기본적으로 설정할 정보 옵션 이름' },
  },
};

export default meta;

type Story = StoryObj<typeof DictInfoSwitch>;

export const Default: Story = {
  args: {
    title: '물 주기',
    optionMap: {
      봄: '봄이 혈관 속에 시내처럼 흘러',
      여름: '쏟아지는 별빛을 물결에 싣고',
      가을: '가을바람에 흔들리는 깊은 산속 논두렁에 새하얀 억새꽃이라든가',
      겨울: '그래 지금은 모두들 눈꽃의 화음에 귀를 적신다',
    },
    defaultSelected: '봄',
  },
};

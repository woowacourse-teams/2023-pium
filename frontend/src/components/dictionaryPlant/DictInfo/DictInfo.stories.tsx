import type { Meta, StoryObj } from '@storybook/react';
import DictInfo from '.';

const meta: Meta<typeof DictInfo> = {
  component: DictInfo,

  args: {
    alignment: 'column',
    contentDirection: 'row',
  },

  argTypes: {
    alignment: {
      description: '제목과 내용들을 어느 방향으로 배치할까요?',
    },
    contentDirection: {
      description: '각 내용을 어느 방향으로 배치할까요?',
    },
    width: {
      description: '컴포넌트 전체 가로 길이',
    },
    height: {
      description: '컴포넌트 전체 세로 길이',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DictInfo>;

export const Default: Story = {
  argTypes: {
    alignment: { control: 'radio' },
    contentDirection: { control: 'radio' },
  },

  render: (args) => (
    <DictInfo {...args}>
      <DictInfo.Title>피움</DictInfo.Title>
      <DictInfo.Content>조이</DictInfo.Content>
      <DictInfo.Content>그레이</DictInfo.Content>
      <DictInfo.Content>주노</DictInfo.Content>
      <DictInfo.Content>하마드</DictInfo.Content>
      <DictInfo.Content>클린</DictInfo.Content>
      <DictInfo.Content>참새</DictInfo.Content>
      <DictInfo.Content>쵸파</DictInfo.Content>
    </DictInfo>
  ),
};

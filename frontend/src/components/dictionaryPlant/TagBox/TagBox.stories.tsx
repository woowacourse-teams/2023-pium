import type { Meta, StoryObj } from '@storybook/react';
import TagBox from '.';

const meta: Meta<typeof TagBox> = {
  component: TagBox,

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

type Story = StoryObj<typeof TagBox>;

export const Default: Story = {
  argTypes: {
    alignment: { control: 'radio' },
    contentDirection: { control: 'radio' },
  },

  render: (args) => (
    <TagBox {...args}>
      <TagBox.Title>피움</TagBox.Title>
      <TagBox.Content>조이</TagBox.Content>
      <TagBox.Content>그레이</TagBox.Content>
      <TagBox.Content>주노</TagBox.Content>
      <TagBox.Content>하마드</TagBox.Content>
      <TagBox.Content>클린</TagBox.Content>
      <TagBox.Content>참새</TagBox.Content>
      <TagBox.Content>쵸파</TagBox.Content>
    </TagBox>
  ),
};

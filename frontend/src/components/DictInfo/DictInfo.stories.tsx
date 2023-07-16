import type { Meta, StoryObj } from '@storybook/react';
import DictInfo from '.';

const meta: Meta<typeof DictInfo> = {
  component: DictInfo,
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

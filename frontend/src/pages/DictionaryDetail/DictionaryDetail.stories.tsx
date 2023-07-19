import type { Meta, StoryObj } from '@storybook/react';
import DictionaryDetail from '.';

const meta: Meta<typeof DictionaryDetail> = {
  component: DictionaryDetail,
};

export default meta;

type Story = StoryObj<typeof DictionaryDetail>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import SearchBox from '.';

const meta: Meta<typeof SearchBox> = {
  component: SearchBox,
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {};

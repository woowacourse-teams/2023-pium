import App from './App';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof App> = {
  component: App,
};

export default meta;

type Story = StoryObj<typeof App>;

export const FirstStory: Story = {
  args: {},
};
